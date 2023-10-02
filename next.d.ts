import 'next';
import type { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'
import type { AppProps as AppProps_ } from 'next/app'
import type { ReactNode } from 'react';

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    pagetitle?: string;
    getLayout?: (page: ReactNode) => ReactNode;
    authGuard?: boolean;
  }
}

declare module 'next/app' {
  export declare type AppProps = AppProps_ & {
    Component: NextPage
  }
}
