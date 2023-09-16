'use client'
import clsx from 'clsx'
import './globals.css'
import MediaControls from '@/components/MediaControls'
import AppState from '@/objects/AppState'
import NowPlaying from '@/objects/NowPlaying'
import { useState } from 'react'

import { AppContext } from '@/app/context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  let [appReady, setAppReady] = useState<boolean>(false)
  let [nowPlaying, setNowPlaying] = useState<NowPlaying | undefined>()
  let appState = new AppState(nowPlaying, setNowPlaying)
  return (
    <html lang="en">

      <AppContext.Provider value={{appReady, setAppReady, appState}}>
        <head>
          <meta charSet="utf-8" />
          <title>Lyric Collection</title>
          <meta name="description" content="Lyric Collection aaaaaaaa" />
        </head>
        <body >
            {children}
          <div id="playerContainer" className={clsx("sticky bg-gray-800 h-10 bottom-0 w-full border-t-gray-500 border-t-2")}>
            <MediaControls nowPlaying={appState.nowPlaying} />
          </div>
        </body>

      </AppContext.Provider>
    </html>
  )
}
