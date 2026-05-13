/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const SOUND_URLS = {
  click: 'https://www.soundjay.com/buttons/button-16.mp3', // Reliable static source
  gavel: 'https://www.soundjay.com/human/fist-on-table-1.mp3', // Close enough to a gavel
  paper: 'https://www.soundjay.com/misc/paper-flip-1.mp3',
  success: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
};

class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    // Preload sounds
    if (typeof window !== 'undefined') {
      Object.entries(SOUND_URLS).forEach(([key, url]) => {
        const audio = new Audio(url);
        audio.preload = 'auto';
        // Silence loading errors
        audio.onerror = () => {
          console.debug(`Audio source failed to load for: ${key}. Background logic will attempt fallback if applicable.`);
        };
        this.sounds.set(key, audio);
      });
    }
  }

  private initAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.debug('Web Audio API not supported');
      }
    }
  }

  private playProgrammaticClick() {
    try {
      this.initAudioContext();
      if (!this.audioContext) return;
      
      // Resume context if it was suspended (common browser behavior)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + 0.1);
    } catch (e) {
      console.debug('Programmatic click failed', e);
    }
  }

  private playProgrammaticGavel() {
    try {
      this.initAudioContext();
      if (!this.audioContext) return;
      if (this.audioContext.state === 'suspended') this.audioContext.resume();

      const currentTime = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, currentTime + 0.2);

      gain.gain.setValueAtTime(0.3, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(currentTime + 0.2);

      // Add a small noise burst for the "impact"
      const bufferSize = this.audioContext.sampleRate * 0.05;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.1, currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.05);
      
      noise.connect(noiseGain);
      noiseGain.connect(this.audioContext.destination);
      noise.start();
    } catch (e) {
      console.debug('Programmatic gavel failed', e);
    }
  }

  private playProgrammaticPaper() {
    try {
      this.initAudioContext();
      if (!this.audioContext) return;
      if (this.audioContext.state === 'suspended') this.audioContext.resume();

      const currentTime = this.audioContext.currentTime;
      const bufferSize = this.audioContext.sampleRate * 0.3;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.audioContext.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2000, currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, currentTime + 0.3);

      const gain = this.audioContext.createGain();
      gain.gain.setValueAtTime(0.05, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioContext.destination);

      noise.start();
    } catch (e) {
      console.debug('Programmatic paper failed', e);
    }
  }

  private playProgrammaticSuccess() {
    try {
      this.initAudioContext();
      if (!this.audioContext) return;
      if (this.audioContext.state === 'suspended') this.audioContext.resume();

      const currentTime = this.audioContext.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major triad)

      notes.forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, currentTime + i * 0.1);
        
        gain.gain.setValueAtTime(0, currentTime + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.1, currentTime + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + i * 0.1 + 1.5);

        osc.connect(gain);
        gain.connect(this.audioContext!.destination);

        osc.start(currentTime + i * 0.1);
        osc.stop(currentTime + i * 0.1 + 1.5);
      });
    } catch (e) {
      console.debug('Programmatic success failed', e);
    }
  }

  play(key: keyof typeof SOUND_URLS) {
    if (!this.enabled) return;

    // Trigger programmatic sounds as fallbacks/layers
    if (key === 'click') this.playProgrammaticClick();
    if (key === 'gavel') this.playProgrammaticGavel();
    if (key === 'paper') this.playProgrammaticPaper();
    if (key === 'success') this.playProgrammaticSuccess();

    const audio = this.sounds.get(key);
    if (audio) {
      try {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Programmatic version already played, so we silent the error
          });
        }
      } catch (e) {
        // Fallback already handled
      }
    }
  }

  toggle(state: boolean) {
    this.enabled = state;
  }
}

export const audioManager = new AudioManager();
