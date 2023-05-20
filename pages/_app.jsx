import { AppProps } from 'next/app'
import '../style.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}