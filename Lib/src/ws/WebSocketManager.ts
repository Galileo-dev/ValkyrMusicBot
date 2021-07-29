import { Constants, OPCODE } from "../constants/Constants.ts";
import { Payload } from "../interfaces/Payload.ts";
import { HeartBeat, Hello, Identify } from "../constants/Payloads.ts";
import Client from "../client/Client.ts";
import Cache from "../cache/util.ts";

export default class WebSocketManger {
  private socket!: WebSocket;
  private interval = 0;
  public cache: Cache = new Cache();

  constructor(private client: Client) {
  }
  connect(token: string) {
    try {
      this.socket = new WebSocket(Constants.GATEWAY);
      this.socket.onmessage = async (message: any) => {
        const payload: Payload = JSON.parse(message.data);
        const { t: event, op } = payload;
        console.log(event);
        switch (op) {
          case OPCODE.ZERO:
            console.log("An event was triggered...");
            break;
          case OPCODE.TEN: {
            const { heartbeat_interval } = payload.d;
            this.interval = this.heartbeat(heartbeat_interval);
            await this.identify(token);
            break;
          }
          case OPCODE.ELEVEN:
            break;
        }
        if (event) {
          try {
            const { default: module } = await import(`../handlers/${event}.ts`);
            module(this.client, payload, this.cache);
            console.log(event);
          } catch (err) {
            console.log(err);
            console.log("Action Not Yet implemented!");
          }
        }
      };
    } catch (err) {
      console.error(`Error Connecting: ${err}`);
      return err;
    }
  }

  sendToGateway(data: string) {
    try {
      this.socket.send(data);
    } catch (err) {
      console.log("Failed to send to gateway");
      console.log("err");
    }
  }

  heartbeat(ms: number) {
    return setInterval(() => {
      try {
        console.log(`Sending heartbeat every ${ms}ms...`);
        this.socket.send(JSON.stringify(HeartBeat));
      } catch (err) {
        console.error(`Error HeartBeating: ${err}`);
        return err;
      }
    }, ms);
  }

  async identify(token: string) {
    Identify.d.token = token;
    return await this.socket.send(JSON.stringify(Identify));
  }
}
