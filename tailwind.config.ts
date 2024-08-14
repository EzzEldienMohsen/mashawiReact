import { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

const config: Config = {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      abdo: ['abodmaster'],
    },
    extend: {
      gradientColorStops: (theme) => ({
        'white-transparent': 'rgba(255, 255, 255, 0.7)',
        'white-fade': 'rgba(255, 255, 255, 0.0160418)',
        transparent: 'rgba(255, 255, 255, 0)',
      }),
      colors: {
        newRed: '#CD0B09',
        bgColor: '#F8F8F8',
      },
      backgroundImage: {
        'svg-background': "url('../src/assets/svg/maskedGroupContactUs.svg')",
      },
    },
  },
  plugins: [daisyui, typography],
};

export default config;
