export const Hello = {
  op: 10,
  d: null,
};

export const HeartBeat = {
  op: 1,
  d: null,
};

export const Identify = {
  op: 2,
  d: {
    token: "",
    intents: 641,
    properties: {
      $os: "linux",
      $browser: "deno-discord-lib",
      $device: "deno-discord-lib",
    },
  },
};

export const HeartBeatVoice = {
  "op": 3,
  "d": 1501184119561,
};

export const VoiceIdentify = {
  "op": 4,
  "d": {
    "guild_id": "",
    "channel_id": "",
    "self_mute": false,
    "self_deaf": false,
  },
};

export const VoiceIdentify2 = {
  "op": 0,
  "d": {
    "server_id": "",
    "user_id": "",
    "session_id": "my_session_id",
    "token": "my_token",
  },
};

export const UDPProtocol = {
  "op": 1,
  "d": {
    "protocol": "udp",
    "data": {
      "address": "127.0.0.1",
      "port": 1337,
      "mode": "xsalsa20_poly1305_lite",
    },
  },
};
