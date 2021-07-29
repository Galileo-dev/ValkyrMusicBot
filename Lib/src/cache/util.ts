export default class Cache {
  private cacheHeap = {
    VoiceState: {},
    VoiceServer: {},
  };

  setVoiceStateUpdateCache(update: any) {
    this.cacheHeap.VoiceState = update;
  }
  getVoiceStateUpdateCache() {
    return this.cacheHeap.VoiceState;
  }

  setVoiceServerUpdateCache(update: any) {
    this.cacheHeap.VoiceServer = update;
  }
  getVoiceServerUpdateCache() {
    return this.cacheHeap.VoiceServer;
  }
}
