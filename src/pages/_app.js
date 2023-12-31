import '@/styles/globals.css'
import '@/components/layout.css'
import '@/components/layout/sidebar.css'
import '@/components/layout/rightbar.css'
import '@/components/header.css'
import '@/components/Form.css'
import '@/components/Avatar.css'

import '@/components/posts/postitem.css'
import '@/components/users/userprofile.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
import { Roboto } from '@next/font/google'
import { useSession } from 'next-auth/react'
import Home from '@/pages/index.js'
import { SocketProvider } from '@/providers/socketProvider'
import { MessageProvider } from '@/providers/messageProvider'
import { ModalProvider } from '@/providers/modalProvider'
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

import { useRouter } from 'next/router'
import Verification from './verification'
import { NotificationProvider } from '@/providers/notificationProvider'



export default function App({ Component, pageProps }) {


  const router = useRouter();

  return (


    <SessionProvider session={pageProps.session}>
      <ModalProvider>
      <SocketProvider>
        <MessageProvider>
          <NotificationProvider>
          <main className={roboto.className} key={router.asPath}>
            <Component {...pageProps} />
          </main>
          </NotificationProvider>
        </MessageProvider>

      </SocketProvider>
      </ModalProvider>
    </SessionProvider>


  )
}


