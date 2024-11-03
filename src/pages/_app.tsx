import { PHProvider } from '@/components/providers/posthog-provider';
import { queryClient } from '@/components/providers/query-provider';
import '@/styles/globals.css';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { IBM_Plex_Sans } from 'next/font/google';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import posthog from 'posthog-js';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  posthog.capture('$pageview');
});
Router.events.on('routeChangeError', () => NProgress.done());

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm',
  weight: ['400', '700'],
});

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>
        {`
          html {
            scroll-behavior: smooth;
          }

          :root {
            --font-ibm: ${ibmPlex.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Diwali QR Code Scanner</title>
      </Head>
      <PHProvider>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <ThemeProvider attribute='class'>
              <div className={`${ibmPlex.variable} font-ibm`}>
                {getLayout(<Component {...pageProps} />)}
              </div>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </HydrationBoundary>
        </QueryClientProvider>
      </PHProvider>
    </>
  );
}

export default App;
