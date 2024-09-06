declare module 'typewriter-effect/dist/core' {
  class Typewriter {
    constructor(element: HTMLElement, options?: any);
    typeString(str: string): Typewriter;
    start(): Typewriter;
  }

  export = Typewriter;
}

interface Window {
  Typewriter: any;
}
