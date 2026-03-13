
class AudioService {
  private sfxVolume: number = 0.65;
  private bgmVolume: number = 0.80;
  private bgm: HTMLAudioElement | null = null;

  setSfxVolume(volume: number) {
    this.sfxVolume = volume / 100;
  }

  setBgmVolume(volume: number) {
    this.bgmVolume = volume / 100;
    if (this.bgm) {
      this.bgm.volume = this.bgmVolume;
    }
  }

  playSfx(url: string) {
    const audio = new Audio(url);
    audio.volume = this.sfxVolume;
    audio.play().catch(e => console.error("SFX Playback failed:", e));
  }

  playBgm(url: string) {
    if (this.bgm && this.bgm.src === url && !this.bgm.paused) {
      return;
    }
    if (this.bgm) {
      this.bgm.pause();
    }
    this.bgm = new Audio(url);
    this.bgm.loop = true;
    this.bgm.volume = this.bgmVolume;
    this.bgm.play().catch(e => {
      if (e.name === 'NotAllowedError') {
        console.warn("BGM Playback deferred: User interaction required.");
      } else {
        console.error("BGM Playback failed:", e);
      }
    });
  }

  stopBgm() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm = null;
    }
  }

  // Common SFX
  playTaxPayment() {
    this.playSfx('https://cdn.pixabay.com/audio/2022/03/10/audio_c352730652.mp3'); // Cash register
  }

  playSuccess() {
    this.playSfx('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3'); // Success chime
  }

  playMatch() {
    this.playSfx('https://cdn.pixabay.com/audio/2021/08/04/audio_bb630cc098.mp3'); // Correct match ding
  }

  playTryAgain() {
    this.playSfx('https://cdn.pixabay.com/audio/2021/08/04/audio_c6ccf3232f.mp3'); // Reset/swoosh sound
  }
}

export const audioService = new AudioService();
