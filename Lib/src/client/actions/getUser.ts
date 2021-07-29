import { Constants } from "../../constants/Constants.ts";

export default async function (
  user_id: string,
  guild_id: string,
  token: string,
) {
  const data = {};

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bot ${token}`,
  };

  const ListOfChannels = await fetch(
    `${Constants.API}/guilds/${guild_id}/channels`,
    {
      method: "GET",
      headers,
    },
  );
  const channels = await ListOfChannels.json();
  for (const channel of channels) {
    if (channel.type === 2) {
      console.log(`Possible Candidate ${channel.name}`);
      const GuildMember = await fetch(
        `${Constants.API}/guilds/${guild_id}/members/${user_id}`,
        {
          method: "GET",
          headers,
        },
      );
      const member = await GuildMember.json();
      console.log("just work");
      console.log(member);
    }
  }
}
