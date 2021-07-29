import WebSocketManager from "./WebSocketManager.ts";
import VoiceClient from "../client/VoiceClient.ts";
import Cache from "../cache/util.ts";
import { OPCODE } from "../constants/Constants.ts";
import { Payload } from "../interfaces/Payload.ts";
import ytdl from "https://deno.land/x/ytdl_core/mod.ts";
import {
  HeartBeatVoice,
  UDPProtocol,
  VoiceIdentify2,
} from "../constants/Payloads.ts";
import { Opus, OpusApplication } from "https://deno.land/x/opus@0.1.1/mod.ts";

export default class VoiceWebSocketManger {
  private socket!: WebSocket;
  private UDPSocket!: any;
  private port!: number;
  private hostname!: string;
  private prevNounce = 0;
  constructor(private client: VoiceClient) {
  }
  async connect(cache: Cache) {
    try {
      let server_update: any = await cache.getVoiceServerUpdateCache();
      let state_update: any = await cache.getVoiceStateUpdateCache();
      const { user_id, session_id } = state_update;
      const { token, guild_id, endpoint } = server_update;
      this.socket = new WebSocket("wss://" + endpoint);
      this.socket.onmessage = async (message: any) => {
        const payload: Payload = JSON.parse(message.data);
        const { t: event, op } = payload;
        console.log(payload);

        switch (op) {
          case OPCODE.EIGHT:
            await this.identify(token, guild_id, session_id, user_id);
            console.log("Identify");
            break;
          case OPCODE.TWO: {
            this.heartbeat(payload.d.heartbeat_interval);
            const { port, ip } = payload.d;
            this.port = port;
            this.hostname = ip;
            await this.setProtocol(this.port, this.hostname);
            break;
          }
          case OPCODE.FOUR: {
            await this.ConnectUDP(this.port, this.hostname);
            break;
          }
        }
      };
      // Time to identify

      console.log("Voice Connecting");
      console.log(server_update);
      console.log(state_update);
    } catch (err) {
      console.log(err);
    }
  }
  async identify(
    token: string,
    server_id: string,
    session_id: string,
    user_id: string,
  ) {
    VoiceIdentify2.d.server_id = server_id;
    VoiceIdentify2.d.session_id = session_id;
    VoiceIdentify2.d.token = token;
    VoiceIdentify2.d.user_id = user_id;
    console.log(VoiceIdentify2);
    await this.socket.send(JSON.stringify(VoiceIdentify2));
  }

  heartbeat(ms: number) {
    return setInterval(() => {
      try {
        console.log(`Sending Voice heartbeat every ${ms}ms...`);
        this.socket.send(JSON.stringify(HeartBeatVoice));
      } catch (err) {
        console.error(`Error HeartBeating: ${err}`);
        return err;
      }
    }, ms);
  }

  async setProtocol(port: number, hostname: string) {
    UDPProtocol.d.data.address = hostname;
    UDPProtocol.d.data.port = port;
    await this.socket.send(JSON.stringify(UDPProtocol));
  }

  async ConnectUDP(port: number, hostname: string) {
    const addr: Deno.NetAddr = {
      transport: "udp",
      port: port,
      hostname: hostname,
    };

    this.UDPSocket = await Deno.listenDatagram({
      port: port,
      transport: "udp",
      hostname: "0.0.0.0",
    });

    const SAMPLE_RATE = 48000;
    const FRAME = 20;
    const CHANNELS = 2;

    await Opus.load();
    let encoder = new Opus(SAMPLE_RATE, CHANNELS, OpusApplication.AUDIO);
    let frameSize = SAMPLE_RATE * FRAME / 1000;

    const stream = await ytdl("vRXZj0DzXIA");
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const blob = new Blob(chunks);

    let pcmData = new Uint8Array(await blob.arrayBuffer());
    let encodedPacket = encoder.encode(pcmData, frameSize);
    console.log(encodedPacket);

    // console.log(stream);
    // for await (const chunk of stream) {
    //   console.log(chunk);
    //   //this.UDPSocket.send(new Uint8Array(await chunk), addr);
    // }
  }
}
