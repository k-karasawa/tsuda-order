import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { MainMenu } from '@/components/menus/MainMenu'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => <MainMenu pagetitle={Component.pagetitle}>{page}</MainMenu>)
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
