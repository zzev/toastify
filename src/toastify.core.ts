import type {
  ToastifyDelaysProps,
  ToastifyMessageProps,
  ToastifyMessagesProps,
  ToastifyOptionsProps,
} from "../types";

export default class Toastify {
  private index: number = 0;
  private styleElements: HTMLStyleElement[] = [];
  private timeoutIds: number[] = [];
  private startAfterMs: number = 1000;
  private displayIntervalMs: number = 2000;
  private fadeOutMs: number = 5000;
  private fadeOutMobileMs: number = 1800;

  private readonly mobileSize: number = 640;
  private readonly marginTop: number = 8;
  private readonly height: number = 75;
  private readonly animations = {
    fadeInRight: (): string =>
      "toastify-fade-in-right 500ms cubic-bezier(0.390, 0.575, 0.565, 1.000) forwards",
    slideBottom: (index: number): string =>
      `toastify-slide-bottom-${index} 500ms cubic-bezier(0.455, 0.030, 0.515, 0.955) forwards`,
    fadeOut: (delay: number): string =>
      `toastify-fade-out 0.8s ease-out ${delay}ms both`,
  };

  public running: boolean = false;
  public messages: ToastifyMessagesProps = [];
  public messagesCount: number = 0;
  public readonly containerId: string = "toastify";
  public container: HTMLElement | null = null;
  public elements: HTMLElement[] = [];

  constructor() {}

  public init = async (options: ToastifyOptionsProps): Promise<void> => {
    this.setMessages(options.messages);
    this.setDelays(options.delays);

    if (options.styles) {
      this.appendStyles(options.styles);
    }

    this.generateAndAppendKeyframes();
    this.generateAndAppendContainer();

    await this.generateHTMLElements();
  };

  public run = (): void => {
    if (this.running) return;
    if (!this.messagesCount) return;

    this.running = true;

    const loop = (): void => {
      this.showToast(this.index);
      this.index++;

      if (this.index < this.messagesCount) {
        const timeoutId = window.setTimeout(loop, this.displayIntervalMs);
        this.timeoutIds.push(timeoutId);
      }
    };

    const timeoutId = window.setTimeout(loop, this.startAfterMs);
    this.timeoutIds.push(timeoutId);
  };

  public stop = (): void => {
    if (!this.running) return;

    this.clearTimeouts();
    this.removeHTMLElements();
    this.reset();
  };

  public destroy = (): void => {
    this.stop();
    this.removeContainer();
    this.removeStyles();
    this.clearMessages();
    this.clearHTMLElements();
  };

  public update = async (options: ToastifyOptionsProps): Promise<void> => {
    this.destroy();
    await this.init(options);
    this.run();
  };

  private setMessages = (messages: ToastifyMessagesProps): void => {
    this.messages = messages;
    this.messagesCount = messages.length;
  };

  private clearMessages = (): void => {
    this.messages = [];
    this.messagesCount = 0;
  };

  private setDelays = (delays: ToastifyDelaysProps): void => {
    this.startAfterMs = delays.startAfterMs ?? this.startAfterMs;
    this.displayIntervalMs = delays.displayIntervalMs ?? this.displayIntervalMs;
    this.fadeOutMs = delays.fadeOutMs ?? this.fadeOutMs;
    this.fadeOutMobileMs = this.displayIntervalMs * 0.9;
  };

  private generateKeyframes = (): string[] => {
    const keyframes: string[] = [
      `@keyframes toastify-fade-in-right {
        0% { transform: translateX(50px); opacity: 0 }
        100% { transform: translateX(0); opacity: 1 }
      }`,
      `@keyframes toastify-fade-out {
        0% { opacity: 1 }
        100% { opacity: 0 }
      }`,
    ];

    for (let i = 1; i <= this.messagesCount; i++) {
      keyframes.push(`
        @keyframes toastify-slide-bottom-${i} {
          0% { transform: translateY(${
            (this.height + this.marginTop) * (i - 1)
          }px) }
          100% { transform: translateY(${
            (this.height + this.marginTop) * i
          }px) }
        }`);
    }

    return keyframes;
  };

  private appendKeyframes = (keyframes: string[]): void => {
    const style = document.createElement("style");
    document.head.appendChild(style);
    this.styleElements.push(style);

    const sheet = style.sheet;

    if (!sheet) return;

    keyframes.forEach((keyframe) => {
      sheet.insertRule(keyframe, sheet.cssRules.length);
    });
  };

  private generateAndAppendKeyframes = (): void => {
    const keyframes = this.generateKeyframes();
    this.appendKeyframes(keyframes);
  };

  private appendStyles = (styles: string): void => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
    this.styleElements.push(style);
  };

  private removeStyles = (): void => {
    this.styleElements.forEach((style) => style.remove());
    this.styleElements = [];
  };

  private generateHTMLContainer = (): HTMLElement => {
    const html = `<div id="${this.containerId}" role="alert" aria-live="polite" aria-atomic="true" />`;

    const template = document.createElement("template");
    template.innerHTML = html;
    const content = template.content.children;

    const element =
      content.length === 1
        ? (content[0] as HTMLElement)
        : (content as unknown as HTMLElement);

    this.container = element;

    return element;
  };

  private appendHTMLContainer = (container: HTMLElement): void => {
    document.body.appendChild(container);
  };

  private generateAndAppendContainer = (): void => {
    if (this.container && this.container.parentElement) {
      return;
    }

    const container = this.generateHTMLContainer();
    this.appendHTMLContainer(container);
  };

  private removeContainer = (): void => {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  };

  private generateHTMLElements = async (): Promise<void> => {
    const elements: HTMLElement[] = [];

    for (let i = 0; i < this.messagesCount; i++) {
      const element = await this.generateHTMLElement(this.messages[i], i);
      elements.push(element);
    }

    this.elements = elements;
  };

  private generateHTMLElement = (
    message: ToastifyMessageProps,
    index: number
  ): Promise<HTMLElement> => {
    return new Promise((resolve) => {
      const id = `toastify-toast-${index}`;

      const img = new Image();
      img.src = message.img;

      img.addEventListener("load", () => {
        const html = `
          <div id="${id}" class="toastify-toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toastify-image">
              <img src="${img.src}" alt="Toast ${id} logo">
            </div>

            <div class="toastify-content">
              <div class="toastify-title">
                <p class="toastify-subject">${message.title}</p>
                <span class="toastify-time">${message.time}</span>
              </div>

              <p class="toastify-message">${message.text}</p>
            </div>
          </div>`;

        const template = document.createElement("template");
        template.innerHTML = html;
        const content = template.content.children;

        const element =
          content.length === 1
            ? (content[0] as HTMLElement)
            : (content as unknown as HTMLElement);

        resolve(element);
      });
    });
  };

  private appendHTMLElement = (element: HTMLElement): HTMLElement => {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.appendChild(element);
    }
    return element;
  };

  private removeHTMLElements = (): void => {
    const elements = document.querySelectorAll(".toastify-toast");
    elements.forEach((element) => element.remove());
  };

  private clearHTMLElements = (): void => {
    this.elements = [];
  };

  private showToast = (index: number): void => {
    if (index >= this.messagesCount) return;

    const element = this.elements[index];

    if (window.innerWidth <= this.mobileSize) {
      this.showToastMobile(element, index);
    } else {
      this.showToastDesktop(element, index);
    }
  };

  private showToastDesktop = (element: HTMLElement, index: number): void => {
    if (index === 0) {
      element.style.animation = this.animations.fadeInRight();
      this.appendHTMLElement(element);

      if (this.messagesCount === 1) {
        this.fadeOutAndRemoveElements();
      }
    } else {
      for (let i = index; i > 0; i--) {
        const prevElement = document.getElementById(`toastify-toast-${i - 1}`);
        if (prevElement) {
          const animation = this.animations.slideBottom(index - (i - 1));
          prevElement.style.animation = animation;
        }
      }

      setTimeout(() => {
        element.style.animation = this.animations.fadeInRight();
        this.appendHTMLElement(element);

        if (index + 1 === this.messagesCount) {
          this.fadeOutAndRemoveElements();
        }
      }, 300);
    }
  };

  private showToastMobile = (element: HTMLElement, index: number): void => {
    const animations = [this.animations.fadeInRight()];
    const isLast = index + 1 === this.messagesCount;
    const shouldFadeOut =
      this.fadeOutMs > 0 || (this.fadeOutMs === 0 && !isLast);

    if (shouldFadeOut) {
      const fadeOutTime = isLast ? this.fadeOutMs : this.fadeOutMobileMs;
      animations.push(this.animations.fadeOut(fadeOutTime));
    }

    if (this.fadeOutMs > 0 && isLast) {
      element.addEventListener("animationend", (event: AnimationEvent) => {
        if (event.animationName === "toastify-fade-out") {
          const elements = document.querySelectorAll(".toastify-toast");
          elements.forEach((el) => el.remove());
          this.reset();
        }
      });
    }

    element.style.animation = animations.join(", ");
    this.appendHTMLElement(element);
  };

  private fadeOutAndRemoveElements = (): void => {
    if (this.fadeOutMs === 0) return;

    let delay = this.fadeOutMs;
    const elements = document.querySelectorAll(".toastify-toast");

    elements.forEach((element, index) => {
      const reset = index + 1 === this.messagesCount;
      this.fadeOutAndRemoveElement(element as HTMLElement, delay, reset);
      delay += this.fadeOutMs;
    });
  };

  private fadeOutAndRemoveElement = (
    element: HTMLElement,
    delay: number,
    reset: boolean
  ): void => {
    const animations = [
      element.style.animation,
      this.animations.fadeOut(delay),
    ];

    element.style.animation = animations.join(",");

    element.addEventListener("animationend", (event: AnimationEvent) => {
      if (event.animationName === "toastify-fade-out") {
        element.remove();
        if (reset) {
          this.reset();
        }
      }
    });
  };

  private clearTimeouts = (): void => {
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
  };

  private reset = (): void => {
    if (!this.running) return;
    this.index = 0;
    this.running = false;
  };
}
