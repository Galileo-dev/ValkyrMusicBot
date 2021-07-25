import EventEmitter from "https://deno.land/x/events/mod.ts";
import WebSocketManger from "../ws/WebSocketManager.ts";
import ClientUser from "../client/ClientUser.ts";

export default class Client extends EventEmitter {
  private socket: WebSocketManger = new WebSocketManger(this);

  private _user!: ClientUser;

  login(token: string) {
    this.socket.connect(token);
  }

  set user(user: ClientUser) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
