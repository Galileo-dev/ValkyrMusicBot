import { Constants, VoiceChannelTemp } from "../../constants/Constants.ts";
import { VoiceIdentify } from "../../constants/Payloads.ts";
import VoiceWebSocketManager from "../../ws/VoiceWebSocketManager.ts";
import Client from "../Client.ts";
import type WebSocketManger from "../../ws/WebSocketManager.ts";
export default async function (
  channelId: string,
  GuildId: string,
  client: Client,
  voiceSocket: VoiceWebSocketManager,
) {
  //When things start working use this
  // VoiceIdentify.d.channel_id = channelId
  // VoiceIdentify.d.guild_id = GuildId
  VoiceIdentify.d.channel_id = VoiceChannelTemp.channel_id;
  VoiceIdentify.d.guild_id = VoiceChannelTemp.guild_id;

  await client.socket.sendToGateway(JSON.stringify(VoiceIdentify));
  client.on("VoiceServerUpdate", async () => {
    await voiceSocket.connect(client.socket.cache);
  });
}
