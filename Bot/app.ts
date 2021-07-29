//?=======================================================================================
// !------ TO USE MAKE YOUR OWN BOT @ https://discord.com/developers/applications -------
// !--- THEN GET THE BOT TOKEN AND SAVE IT AS BOT_TOKEN IN .env in the root directory ----
// !------------ CONTENTS OF .env in root directory should look like this ----------------
//!------------------------------- BOT_TOKEN=TOKEN ---------------------------------------
//?=======================================================================================

//?======================================= Imports =======================================
import { config } from "https://deno.land/x/dotenv/mod.ts";
import EventEmitter from "https://deno.land/x/events/mod.ts";
import { Client, VoiceClient } from "../Lib/mod.ts";
//?=======================================================================================

const env = config();
const suffix = "?";

const client = new Client();

await client.login(env.BOT_TOKEN);

client.on("ready", () => {
  console.log("Bot has logged in.");
});

client.on("message", async (message: any) => {
  if (message.author.username === "Simple-Bot") {
    return;
  }
  console.log(message);

  if (message.content === "hello") {
    await client.send("Your Mom", message.channel_id);
  } else if (message.content === `${suffix}play`) {
    // const VoiceChannel = await client.getVoiceChannel(message);
    const voice = await new VoiceClient();
    await voice.connect(client);
    // await voice.play("../test_music.mp3");
    // await client.send("Playing Song ${}", message.channel_id);
  }
});
