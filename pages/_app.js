import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Source Sans Pro', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button, a {
    cursor: pointer;
  }
`

const theme = {
  colors: {
    primary: '#1ed761',
    text: '#fff',
    black: '#222'
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Spotify Searcher</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
