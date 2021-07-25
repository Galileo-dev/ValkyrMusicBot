import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import ClientUser from "../client/ClientUser.ts";
export default function (client: Client, payload: Payload) {
  console.log("Logged  in");
  //console.log(payload);
  const { d } = payload;
  const { username, discriminator, verified, id, flags, email, bot, avatar } =
    d.user;
  client.user = new ClientUser(
    username,
    discriminator,
    verified,
    id,
    flags,
    email,
    bot,
    avatar,
  );
  client.emit("ready");
}
