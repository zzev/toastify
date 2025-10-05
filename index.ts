import Theme from "./src/toastify.theme.js";
import Core from "./src/toastify.core.js";

const Toastify = {
  Theme,
  Core,
};

export default Toastify;

// Also export as named exports for convenience
export { Theme, Core };

export type {
  ToastifyMessageProps,
  ToastifyMessagesProps,
  ToastifyDelaysProps,
  ToastifyOptionsProps,
  ToastifyStylesProps,
  ToastifyThemeMapProps,
  ToastifyThemeProp,
} from "./types";
