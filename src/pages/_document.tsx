import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='white'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='black'
        />
        <meta name='description' content='Diwali QR Code Scanner' />
        <meta property='og:title' content='Diwali QR Code Scanner' />
        <meta property='og:description' content='Diwali QR Code Scanner' />
        <meta property='og:image' content='/favicon-32x32.png' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#efdbbe' />
        <meta name='msapplication-TileColor' content='#efdbbe' />
        <meta name='theme-color' content='#efdbbe' />

        <link
          href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&display=swap" rel="stylesheet'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
