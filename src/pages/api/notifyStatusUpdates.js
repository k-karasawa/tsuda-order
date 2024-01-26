import { supabase } from '../../../utils/supabase';
import { sendChatworkMessage } from '../../../utils/chatwork';

export default async function notifyStatusUpdates(req, res) {
  try {
    // 1ヶ月前の日付を取得
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // progressテーブルからステータス名とsort順を取得
    const { data: progressData, error: progressError } = await supabase
      .from('progress')
      .select('id, progress, sort');
    if (progressError) throw progressError;

    // ステータス名とsort順をマッピングするためのオブジェクトを作成
    const progressMap = progressData.reduce((acc, { id, progress, sort }) => {
      acc[id] = { name: progress, sort };
      return acc;
    }, {});

    // ステータス変更日が1ヶ月以上前で、progressが7と6でなく、status_updated_atがnullでない受注を検索
    const { data: orderData, error: orderError } = await supabase
      .from('order_list')
      .select('prefix, order_code, progress')
      .not('status_updated_at', 'is', null)
      .lte('status_updated_at', oneMonthAgo.toISOString())
      .not('progress', 'in', '(6,7)'); // 修正箇所: 配列ではなく文字列で範囲を指定
      if (orderError) throw orderError;

    // progressごとにグループ化し、sort順に並び替えてステータス名で表示
    const groupedByProgress = orderData.reduce((acc, { progress, prefix, order_code }) => {
      const statusInfo = progressMap[progress] || { name: `Unknown Status (${progress})`, sort: Number.MAX_VALUE };
      const statusName = statusInfo.name;
      if (!acc[statusName]) {
        acc[statusName] = { orders: [], sort: statusInfo.sort };
      }
      acc[statusName].orders.push(`${prefix}${order_code}`);
      return acc;
    }, {});

    // sort順に並び替え
    const sortedGroupedProgress = Object.keys(groupedByProgress)
      .sort((a, b) => groupedByProgress[a].sort - groupedByProgress[b].sort)
      .reduce((acc, key) => {
        acc[key] = groupedByProgress[key].orders;
        return acc;
      }, {});

    // 通知メッセージを作成
    let message = '';
    Object.keys(sortedGroupedProgress).forEach(statusName => {
      message += `----【 ${statusName} 】----\n${sortedGroupedProgress[statusName].join('\n')}\n\n`;
    });

    // Chatworkにメッセージを送信
    if (message) {
      await sendChatworkMessage(message);
    } else {
      await sendChatworkMessage('進捗が止まっている案件はありません。');
    }

    return res.status(200).json({ message: 'Status updates notification sent successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
