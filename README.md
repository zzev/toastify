# @zzev/toastify

A **super lightweight** (~5KB minified), elegant toast notification system for the browser. **Zero dependencies**, pure vanilla JavaScript with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/@zzev/toastify.svg)](https://www.npmjs.com/package/@zzev/toastify)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@zzev/toastify)](https://bundlephobia.com/package/@zzev/toastify)
[![No Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/@zzev/toastify)

## ✨ Features

- ⚡ **Super Lightweight** - Only ~5KB minified, minimal footprint on your bundle
- 📦 **Zero Dependencies** - No external libraries, pure vanilla JavaScript
- 🚀 **Highly Efficient** - Optimized performance with minimal DOM operations
- 🎨 **Theme Support** - Light, dark, and auto (follows system preferences)
- 📱 **Responsive** - Different animations for mobile and desktop
- 🎭 **Smooth Animations** - Beautiful fade-in, slide, and fade-out effects
- 🔷 **TypeScript Native** - Full type safety and IntelliSense support
- ⚡ **Easy to Use** - Simple API with powerful customization options

## 🎬 Demo

![Toastify Demo](https://github.com/zzev/toastify/raw/main/assets/demo.gif)

## 📦 Installation

```bash
npm install @zzev/toastify
```

## 🚀 Quick Start

```typescript
// Option 1: Default export
import Toastify from '@zzev/toastify';

const theme = new Toastify.Theme('dark'); // 'light', 'dark', or null for auto
const toast = new Toastify.Core();

// Option 2: Named exports (recommended)
import { Theme, Core } from '@zzev/toastify';

const theme = new Theme('dark');
const toast = new Core();

// Initialize with your messages
await toast.init({
  styles: theme.styles,
  messages: [
    {
      img: 'https://placehold.co/64x64',
      title: 'Welcome!',
      time: 'now',
      text: 'Your notification message here'
    }
  ],
  delays: {
    startAfterMs: 1000,
    displayIntervalMs: 2000,
    fadeOutMs: 5000
  }
});

// Run the toast notifications
toast.run();
```

## 📚 API Reference

### Core Methods

#### `init(options: ToastifyOptionsProps): Promise<void>`
Initializes the toast system with configuration.

**Options:**
```typescript
{
  styles: string;           // CSS styles from Theme.styles
  messages: Array<{
    img: string;           // Image URL
    title: string;         // Toast title
    time: string;          // Time string (e.g., "now", "2m ago")
    text: string;          // Message content
  }>;
  delays: {
    startAfterMs: number;      // Delay before first toast (default: 1000)
    displayIntervalMs: number; // Interval between toasts (default: 2000)
    fadeOutMs: number;         // Fade out delay (default: 5000, 0 = no fade)
  };
}
```

#### `run(): void`
Starts displaying the toast notifications.

#### `stop(): void`
Stops the current toast sequence and removes all toasts.

#### `destroy(): void`
Completely removes all toasts, styles, and cleans up resources.

### Theme

#### `new Theme(theme?, mobileSize?)`
Creates a new theme instance.

**Parameters:**
- `theme`: `'light' | 'dark' | null` - Theme mode (null = auto, follows system)
- `mobileSize`: `number` - Mobile breakpoint in pixels (default: 768)

**Properties:**
- `styles`: Returns the complete CSS styles string
- `rawStyles`: Returns the raw CSS styles

**Methods:**
- `setTheme(theme)`: Updates the theme

## 🎯 Advanced Examples

### Custom Delays Configuration

```typescript
await toast.init({
  styles: theme.styles,
  messages: [...],
  delays: {
    startAfterMs: 500,      // Start after 500ms
    displayIntervalMs: 3000, // 3s between each toast
    fadeOutMs: 0            // No auto fade-out
  }
});
```

### Multiple Toast Messages

```typescript
const messages = [
  {
    img: 'https://placehold.co/64x64/00ff00/white',
    title: 'Success',
    time: 'now',
    text: 'Operation completed successfully'
  },
  {
    img: 'https://placehold.co/64x64/0099ff/white',
    title: 'Update Available',
    time: '1m ago',
    text: 'A new version is ready to install'
  },
  {
    img: 'https://placehold.co/64x64/ffaa00/white',
    title: 'Warning',
    time: '5m ago',
    text: 'Please review your settings'
  }
];

await toast.init({
  styles: theme.styles,
  messages,
  delays: {
    startAfterMs: 1000,
    displayIntervalMs: 2500,
    fadeOutMs: 4000
  }
});

toast.run();
```

### Cleanup

```typescript
// Stop and remove all toasts
toast.stop();

// Or completely destroy (removes styles too)
toast.destroy();
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Reporting Issues

- Check existing issues before creating a new one
- Provide a clear description and steps to reproduce
- Include browser/environment information

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the code style
4. Ensure TypeScript compilation passes (`npm run build`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/zzev/toastify.git

# Install dependencies
npm install

# Build the project
npm run build
```

## 📄 License

GPL-3.0 License - see the [LICENSE](LICENSE) file for details

## 👤 Author

**zzev**

- GitHub: [@zzev](https://github.com/zzev)
- Repository: [toastify](https://github.com/zzev/toastify)

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/zzev/toastify/issues).
