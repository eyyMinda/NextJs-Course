import MainNav from '@/components/mainNav'
import '@/styles/globals.css'
import { Fragment } from 'react'

export default function App({ Component, pageProps }) {
  return (<Fragment>
    <MainNav />

    <Component {...pageProps} />
  </Fragment>
  )
}
