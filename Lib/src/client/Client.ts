import EventEmitter from "https://deno.land/x/events/mod.ts";
import WebSocketManger from "../ws/WebSocketManager.ts";
import ClientUser from "../client/ClientUser.ts";
import sendMessage from "./actions/SendMessage.ts";

export default class Client extends EventEmitter {
  public token!: string;
  private socket: WebSocketManger = new WebSocketManger(this);
  private _user!: ClientUser;

  login(token: string) {
    this.socket.connect(token);
    this.token = token;
  }

  send(message: string, channelId: string) {
    sendMessage(message, channelId, this.token);
  }

  set user(user: ClientUser) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
