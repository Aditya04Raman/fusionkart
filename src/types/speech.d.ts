// Minimal SpeechRecognition typings for Web Speech API
// Not all browsers support this; guarded at runtime.

declare interface SpeechRecognition extends EventTarget {
  start(): void;
  stop(): void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: any) => any) | null;
}

declare interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

declare var webkitSpeechRecognition: {
  new (): SpeechRecognition;
};

declare var SpeechRecognition: {
  new (): SpeechRecognition;
};
