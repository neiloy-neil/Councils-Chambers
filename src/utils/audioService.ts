import { Howl } from 'howler';

const SOUND_URLS = {
  click: 'https://www.soundjay.com/buttons/button-16.mp3',
  gavel: 'https://www.soundjay.com/human/fist-on-table-1.mp3',
  paper: 'https://www.soundjay.com/misc/paper-flip-1.mp3',
  success: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
};

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      Object.entries(SOUND_URLS).forEach(([key, url]) => {
        const sound = new Howl({
          src: [url],
          preload: true,
        });
        this.sounds.set(key, sound);
      });
    }
  }

  play(key: keyof typeof SOUND_URLS) {
    if (!this.enabled) return;

    const sound = this.sounds.get(key);
    if (sound) {
      sound.play();
    }
  }

  toggle(state: boolean) {
    this.enabled = state;
  }
}

export const audioManager = new AudioManager();
