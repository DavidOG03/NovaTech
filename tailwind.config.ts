// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'light-black': 'var(--light-black)',
      },
    },
  },
  plugins: [],
}

export default config
