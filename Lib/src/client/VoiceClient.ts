import EventEmitter from "https://deno.land/x/events/mod.ts";
import VoiceWebSocketManager from "../ws/VoiceWebSocketManager.ts";
import Client from "../client/Client.ts";
import sendMessage from "./actions/sendMessage.ts";
import joinVoice from "./actions/joinVoice.ts";
import WebSocketManager from "../ws/WebSocketManager.ts";

export default class VoiceClient {
  private VoiceSocket: VoiceWebSocketManager = new VoiceWebSocketManager(this);

  //   join_voice(channelId: string, GuildId: string) {
  //     joinVoice(channelId, GuildId, this.socket);
  //   }

  connect(client: Client) {
    joinVoice("", "", client, this.VoiceSocket);
  }

  play(path: string) {
  }
}
