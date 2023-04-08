import * as React from "react";
import "./styles.css";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import createEmotionCache from "../src/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Layout from "../components/Layout";
import { RecoilRoot, useRecoilValue } from "recoil";
import { recoilUserId } from "../states";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const lightTheme = createTheme(lightThemeOptions);

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const route = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default MyApp;
