import React from 'react'
import { Toaster } from 'react-hot-toast'

import '../styles/globals.css'
import Layout from '../components/Layout'
import { StateContext } from '../context/StateContext'
function MyApp({ Component, pageProps }) {
  return <StateContext>
    <Toaster />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </StateContext>
}

export default MyApp
