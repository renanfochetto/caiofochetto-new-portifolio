import localFont from 'next/font/local';

export const fraunces = localFont({
  src: [
    {
      path: '../public/fonts/fraunces/fraunces-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/fraunces/fraunces-700.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-fraunces',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/space-grotesk/space-grotesk-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/space-grotesk/space-grotesk-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/space-grotesk/space-grotesk-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const manrope = localFont({
  src: [
    {
      path: '../public/fonts/manrope/manrope-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/manrope/manrope-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/manrope/manrope-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/manrope/manrope-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-manrope',
  display: 'swap',
});
