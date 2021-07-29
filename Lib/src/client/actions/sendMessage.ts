import { Constants } from "../../constants/Constants.ts";

export default async function (
  content: string,
  channelId: string,
  token: string,
) {
  const data = {
    "content": content,
    "tts": false,
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bot ${token}`,
  };

  const response = await fetch(
    `${Constants.API}/channels/${channelId}/messages`,
    {
      method: "Post",
      headers,
      body: JSON.stringify(data),
    },
  );

  const json = await response.json();
}
