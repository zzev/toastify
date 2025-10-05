import type { ToastifyThemeProp, ToastifyThemeMapProps } from "../types";

export default class Theme {
  private theme: ToastifyThemeProp = null; // Defaults to user's prefers-color-scheme
  private mobileSize: number;

  private readonly themes = {
    LIGHT: "light" as const,
    DARK: "dark" as const,
  };

  private readonly themeStyles: ToastifyThemeMapProps = {
    light: {
      toast: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        color: "rgb(17, 17, 17)",
        boxShadow: `rgba(0, 0, 0, 0.08) 0px 4px 20px 0px,
                    rgba(0, 0, 0, 0.04) 0px 1px 3px 0px`,
      },
      time: {
        color: "rgb(142, 142, 147)",
      },
    },
    dark: {
      toast: {
        backgroundColor: "rgba(28, 28, 30, 0.8)",
        color: "rgb(255, 255, 255)",
        boxShadow: `rgba(0, 0, 0, 0.15) 0px 4px 20px 0px,
                    rgba(0, 0, 0, 0.08) 0px 1px 3px 0px`,
      },
      time: {
        color: "rgb(142, 142, 147)",
      },
    },
  };

  constructor(theme?: ToastifyThemeProp, mobileSize: number = 768) {
    this.setTheme(theme);
    this.mobileSize = mobileSize;
  }

  get rawStyles(): string {
    let themeStyles = "";

    if (this.theme) {
      const styles = this.themeStyles[this.theme];

      themeStyles = `
        .toastify-toast {
          background-color: ${styles.toast.backgroundColor};
          color: ${styles.toast.color};
          box-shadow: ${styles.toast.boxShadow};
        }

        .toastify-time {
          color: ${styles.time.color};
        }`;
    } else {
      const stylesLight = this.themeStyles[this.themes.LIGHT];
      const stylesDark = this.themeStyles[this.themes.DARK];

      themeStyles = `
        .toastify-toast {
          background-color: ${stylesLight.toast.backgroundColor};
          color: ${stylesLight.toast.color};
          box-shadow: ${stylesLight.toast.boxShadow};
        }

        .toastify-time {
          color: ${stylesLight.time.color};
        }

        @media (prefers-color-scheme: light) {
          .toastify-toast {
            background-color: ${stylesLight.toast.backgroundColor};
            color: ${stylesLight.toast.color};
            box-shadow: ${stylesLight.toast.boxShadow};
          }

          .toastify-time {
            color: ${stylesLight.time.color};
          }
        }

        @media (prefers-color-scheme: dark) {
          .toastify-toast {
            background-color: ${stylesDark.toast.backgroundColor};
            color: ${stylesDark.toast.color};
            box-shadow: ${stylesDark.toast.boxShadow};
          }

          .toastify-time {
            color: ${stylesDark.time.color};
          }
        }`;
    }

    const styles = `
      .toastify-toast {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: normal;
        font-variation-settings: normal;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 13px;
        line-height: 16px;
        box-sizing: border-box;
        display: block;
        position: fixed;
        right: 16px;
        top: 16px;
        display: flex;
        width: 345px;
        user-select: none;
        gap: 12px;
        border-radius: 16px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 9999;
        border: 0.5px solid rgba(255, 255, 255, 0.15);
      }

      @media (max-width: ${this.mobileSize}px) {
        .toastify-toast:not(:last-child) {
          display: none;
        }
      }

      .toastify-image {
        display: flex;
        align-items: center;
        align-self: center;
        height: 38px;
        width: 38px;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px 0px;
        flex-shrink: 0;
      }

      .toastify-image img {
        display: block;
        vertical-align: middle;
        margin: 0 auto;
        height: auto;
        max-height: 38px;
        max-width: 38px;
        border-radius: 8px;
        object-fit: contain;
      }

      .toastify-content {
        flex: 1 1 0%;
      }

      .toastify-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .toastify-subject {
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        flex: 1 1 0%;
        font-weight: 600;
        font-size: 13px;
      }

      .toastify-time {
        display: inline-block;
        font-size: 11px;
        font-weight: 400;
        flex-shrink: 0;
      }

      .toastify-message {
        margin: 0;
        margin-top: 2px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 32px;
        font-weight: 400;
        font-size: 13px;
        color: inherit;
      }

      ${themeStyles}
    `;

    return styles;
  }

  get styles(): string {
    return this.rawStyles;
  }

  setTheme = (theme: ToastifyThemeProp = null): void => {
    if (theme === null || Object.values(this.themes).includes(theme)) {
      this.theme = theme;
    }
  };
}
