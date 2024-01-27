import { supabase } from '../../../utils/supabase';
import { sendChatworkMessage } from '../../../utils/chatwork';

export default async function notifyStatusUpdates(req, res) {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const { data: progressData, error: progressError } = await supabase
      .from('progress')
      .select('id, progress, sort');
    if (progressError) throw progressError;

    const progressMap = progressData.reduce((acc, { id, progress, sort }) => {
      acc[id] = { name: progress, sort };
      return acc;
    }, {});

    const { data: orderData, error: orderError } = await supabase
      .from('order_list')
      .select('prefix, order_code, progress')
      .not('status_updated_at', 'is', null)
      .lte('status_updated_at', oneMonthAgo.toISOString())
      .not('progress', 'in', '(6,7)');
      if (orderError) throw orderError;

    const groupedByProgress = orderData.reduce((acc, { progress, prefix, order_code }) => {
      const statusInfo = progressMap[progress] || { name: `Unknown Status (${progress})`, sort: Number.MAX_VALUE };
      const statusName = statusInfo.name;
      if (!acc[statusName]) {
        acc[statusName] = { orders: [], sort: statusInfo.sort };
      }
      acc[statusName].orders.push(`${prefix}${order_code}`);
      return acc;
    }, {});

    const sortedGroupedProgress = Object.keys(groupedByProgress)
      .sort((a, b) => groupedByProgress[a].sort - groupedByProgress[b].sort)
      .reduce((acc, key) => {
        acc[key] = groupedByProgress[key].orders;
        return acc;
      }, {});

    let message = '';
    Object.keys(sortedGroupedProgress).forEach(statusName => {
      message += `----【 ${statusName} 】----\n${sortedGroupedProgress[statusName].join('\n')}\n\n`;
    });

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
