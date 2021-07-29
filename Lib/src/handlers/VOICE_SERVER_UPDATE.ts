import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import type Cache from "../cache/util.ts";
export default function (client: Client, payload: Payload, cache: Cache) {
  cache.setVoiceServerUpdateCache(payload.d);
  client.emit("VoiceServerUpdate");
}
