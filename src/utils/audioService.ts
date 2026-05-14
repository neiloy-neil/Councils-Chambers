type SoundKey = 'click' | 'gavel' | 'paper' | 'success' | 'reveal' | 'suspense';

class AudioManager {
  private enabled = true;
  private ctx: AudioContext | null = null;

  private getContext() {
    if (typeof window === 'undefined') {
      return null;
    }

    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) {
      return null;
    }

    if (!this.ctx) {
      this.ctx = new AudioCtor();
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  private tone(
    ctx: AudioContext,
    {
      frequency,
      duration,
      type = 'sine',
      volume = 0.08,
      start = ctx.currentTime,
      attack = 0.01,
      decay = 0.16,
      endFrequency,
    }: {
      frequency: number;
      duration: number;
      type?: OscillatorType;
      volume?: number;
      start?: number;
      attack?: number;
      decay?: number;
      endFrequency?: number;
    },
  ) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    if (endFrequency) {
      osc.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    }

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + Math.max(attack + 0.02, decay));

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration);
  }

  private noiseBurst(ctx: AudioContext, start: number, duration: number, volume: number) {
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * (1 - index / channel.length);
    }

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(820, start);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(start);
  }

  play(key: SoundKey) {
    if (!this.enabled) {
      return;
    }

    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    switch (key) {
      case 'click':
        this.tone(ctx, { frequency: 660, endFrequency: 520, duration: 0.08, type: 'square', volume: 0.03, decay: 0.07 });
        break;
      case 'gavel':
        this.noiseBurst(ctx, now, 0.1, 0.18);
        this.tone(ctx, { frequency: 140, endFrequency: 90, duration: 0.12, type: 'triangle', volume: 0.06, decay: 0.11 });
        break;
      case 'paper':
        this.noiseBurst(ctx, now, 0.08, 0.08);
        this.tone(ctx, { frequency: 440, endFrequency: 370, duration: 0.09, type: 'sine', volume: 0.02, decay: 0.08 });
        break;
      case 'success':
        this.tone(ctx, { frequency: 523.25, duration: 0.18, type: 'triangle', volume: 0.045, decay: 0.16 });
        this.tone(ctx, { frequency: 659.25, duration: 0.2, type: 'triangle', volume: 0.05, start: now + 0.08, decay: 0.18 });
        this.tone(ctx, { frequency: 783.99, duration: 0.28, type: 'triangle', volume: 0.05, start: now + 0.16, decay: 0.24 });
        break;
      case 'reveal':
        this.tone(ctx, { frequency: 392, duration: 0.12, type: 'sine', volume: 0.035, decay: 0.1 });
        this.tone(ctx, { frequency: 523.25, duration: 0.18, type: 'sine', volume: 0.04, start: now + 0.08, decay: 0.16 });
        this.tone(ctx, { frequency: 659.25, duration: 0.22, type: 'sine', volume: 0.05, start: now + 0.16, decay: 0.2 });
        break;
      case 'suspense':
        this.tone(ctx, { frequency: 260, endFrequency: 210, duration: 0.22, type: 'sawtooth', volume: 0.03, decay: 0.2 });
        this.tone(ctx, { frequency: 155, endFrequency: 130, duration: 0.24, type: 'triangle', volume: 0.028, start: now + 0.04, decay: 0.22 });
        break;
      default:
        break;
    }
  }

  toggle(state: boolean) {
    this.enabled = state;
  }
}

export const audioManager = new AudioManager();
