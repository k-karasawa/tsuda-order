import fetch from 'node-fetch';

const chatworkToken = process.env.CHATWORK_API_TOKEN;
const chatworkRoomId = process.env.CHATWORK_ROOM_ID;

async function sendChatworkMessage(message: string) {
  const endpoint = `https://api.chatwork.com/v2/rooms/${chatworkRoomId}/messages`;

  const headers: HeadersInit = {
    'X-ChatWorkToken': chatworkToken!,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: `body=${encodeURIComponent(message)}`,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Chatwork API error response: ${errorBody}`);
    throw new Error(`Chatwork message send failed: ${response.status}`);
  }

  return response.json();
}

export { sendChatworkMessage };
