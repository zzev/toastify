// Core
export type ToastifyMessageProps = {
  img: string;
  title: string;
  time: string;
  text: string;
};

export type ToastifyMessagesProps = ToastifyMessageProps[];

export type ToastifyDelaysProps = {
  startAfterMs: number;
  displayIntervalMs: number;
  fadeOutMs: number;
};

export type ToastifyOptionsProps = {
  styles: string;
  messages: ToastifyMessagesProps;
  delays: ToastifyDelaysProps;
};

// Theme
export type ToastifyStylesProps = {
  toast: {
    backgroundColor: string;
    color: string;
    boxShadow: string;
  };
  time: {
    color: string;
  };
};

export type ToastifyThemeMapProps = {
  light: ToastifyStylesProps;
  dark: ToastifyStylesProps;
};

export type ToastifyThemeProp = "light" | "dark" | null;
