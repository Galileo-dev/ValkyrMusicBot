import EventEmitter from "https://deno.land/x/events/mod.ts";
import WebSocketManger from "../ws/WebSocketManager.ts";
import ClientUser from "../client/ClientUser.ts";
import sendMessage from "./actions/sendMessage.ts";
import joinVoice from "./actions/joinVoice.ts";
import getUser from "./actions/getUser.ts";

export default class Client extends EventEmitter {
  public token!: string;
  public socket: WebSocketManger = new WebSocketManger(this);
  private _user!: ClientUser;

  login(token: string) {
    this.socket.connect(token);
    this.token = token;
  }

  send(message: string, channelId: string) {
    sendMessage(message, channelId, this.token);
  }

  async getVoiceChannel(message: any) {
    console.log("GET_VOICE_CHANNEL");
    console.log(message);
    console.log(message.guild_id);
    console.log(message.author.id);
    const user = await getUser(message.author.id, message.guild_id, this.token);
    console.log("USER");
    console.log(user);
    return "Hello";
  }

  set user(user: ClientUser) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
