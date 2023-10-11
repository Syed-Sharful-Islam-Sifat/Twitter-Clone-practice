import '@/styles/globals.css'
import '@/components/layout.css'
import '@/components/layout/sidebar.css'
import '@/components/layout/rightbar.css'
import '@/components/header.css'
import '@/components/Form.css'
import '@/components/Avatar.css'
import '@/components/button.css'
import '@/components/posts/postitem.css'

import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
import {Roboto} from '@next/font/google'
const roboto = Roboto({
  subsets:['latin'],
  weight:['400','700']
})
import Home from '@/pages/index'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
 
  const router = useRouter();
 
  return (

    <SessionProvider session={pageProps.session}>
      <main className={roboto.className} key = {router.asPath}>
        <Home/>
        <Layout>
         <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
     
  
  )
}
