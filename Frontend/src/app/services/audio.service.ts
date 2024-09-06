import { Injectable } from '@angular/core';
import { Howl} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private sounds: { [key: string]: Howl } = {};

  constructor() {
    this.sounds['correct'] = new Howl({ src: ['assets/sounds/correct.mp3'] });
    this.sounds['wrong'] = new Howl({ src: ['assets/sounds/wrong.mp3'] });
  }

  play(sound: string) {
    if (this.sounds[sound]) {
      this.sounds[sound].play();
    }
  }
}
