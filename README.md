# @zzev/toastify

A lightweight, elegant toast notification system for the browser with TypeScript support, theme customization, and smooth animations.

[![npm version](https://img.shields.io/npm/v/@zzev/toastify.svg)](https://www.npmjs.com/package/@zzev/toastify)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Theme Support** - Light, dark, and auto (follows system preferences)
- 📱 **Responsive** - Different animations for mobile and desktop
- 🎭 **Smooth Animations** - Beautiful fade-in, slide, and fade-out effects
- 📦 **Zero Dependencies** - Lightweight and self-contained
- 🔷 **TypeScript Native** - Full type safety and IntelliSense support
- ⚡ **Easy to Use** - Simple API with powerful customization options

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
      img: 'https://example.com/logo.png',
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

### TypeScript Types

```typescript
import type {
  ToastifyMessageProps,
  ToastifyMessagesProps,
  ToastifyDelaysProps,
  ToastifyOptionsProps,
  ToastifyStylesProps,
  ToastifyThemeMapProps,
  ToastifyThemeProp,
} from '@zzev/toastify';
```

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
    img: '/icons/success.png',
    title: 'Success',
    time: 'now',
    text: 'Operation completed successfully'
  },
  {
    img: '/icons/info.png',
    title: 'Update Available',
    time: '1m ago',
    text: 'A new version is ready to install'
  },
  {
    img: '/icons/warning.png',
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

### Build Commands

```bash
# Compile TypeScript to JavaScript
npm run build

# Create minified versions (for releases)
npm run minify
```

### Project Structure

```
toastify/
├── src/
│   ├── toastify.core.ts    # Core toast functionality
│   └── toastify.theme.ts   # Theme management
├── index.ts                # Main entry point
├── types.ts                # TypeScript type definitions
├── tsconfig.json           # TypeScript configuration
└── package.json            # Package configuration
```

### Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Maintain type safety
- Keep code clean and well-documented

## 📄 License

GPL-3.0 License - see the [LICENSE](LICENSE) file for details

## 👤 Author

**zzev**

- GitHub: [@zzev](https://github.com/zzev)
- Repository: [toastify](https://github.com/zzev/toastify)

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/zzev/toastify/issues).
