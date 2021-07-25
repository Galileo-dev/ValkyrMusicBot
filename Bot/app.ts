//?=======================================================================================
// !------ TO USE MAKE YOUR OWN BOT @ https://discord.com/developers/applications -------
// !--- THEN GET THE BOT TOKEN AND SAVE IT AS BOT_TOKEN IN .env in the root directory ----
// !------------ CONTENTS OF .env in root directory should look like this ----------------
//!------------------------------- BOT_TOKEN=TOKEN ---------------------------------------
//?=======================================================================================
import { config } from "https://deno.land/x/dotenv/mod.ts";
import EventEmitter from "https://deno.land/x/events/mod.ts";

import { Client } from "../Lib/mod.ts";
const env = config();

const client = new Client();

await client.login(env.BOT_TOKEN);

client.on("ready", () => {
  console.log("Bot has logged in.");
});

client.on("message", async (message: any) => {
  if (message.content === "hello") {
    await client.send("Hello there", message.channel_id);
  }
  console.log(message.content);
});
