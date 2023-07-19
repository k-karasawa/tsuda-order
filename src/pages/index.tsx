import { Inter } from 'next/font/google'
import { HeaderPage } from '../../components/base/header'
import { AggregationPage } from './aggregation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <HeaderPage />
      <AggregationPage />
    </>
  )
}
