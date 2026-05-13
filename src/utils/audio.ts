/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const SOUND_URLS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Soft UI click
  gavel: 'https://assets.mixkit.co/active_storage/sfx/2047/2047-preview.mp3', // Hammer/Gavel strike
  paper: 'https://assets.mixkit.co/active_storage/sfx/2056/2056-preview.mp3', // Paper shuffle
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Orchestral finish
};

class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  constructor() {
    // Preload sounds
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      this.sounds.set(key, audio);
    });
  }

  play(key: keyof typeof SOUND_URLS) {
    if (!this.enabled) return;
    const audio = this.sounds.get(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.debug('Audio playback blocked until interaction', err));
    }
  }

  toggle(state: boolean) {
    this.enabled = state;
  }
}

export const audioManager = new AudioManager();
