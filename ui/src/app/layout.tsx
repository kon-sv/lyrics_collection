'use client'
import clsx from 'clsx'
import './globals.css'
import MediaControls from '@/components/MediaControls'
import AppState from '@/objects/AppState'
import NowPlaying from '@/objects/NowPlaying'
import { useEffect, useState } from 'react'

import { AppContext } from '@/app/context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  let [appReady, setAppReady] = useState<boolean>(false)
  let [nowPlaying, setNowPlaying] = useState<NowPlaying | undefined>()
  let [bodyBackground, setBodyBackground] = useState<any>("")
  
  let [options, setOptions] = useState<any>({autosave: false})

  let appState = new AppState(nowPlaying, setNowPlaying, options, setOptions)

  useEffect(() => {
    nowPlaying?.backgroundChange?.then((bg) => {
      setBodyBackground(bg.toString())
      // setBodyBackground("red")

    })
  }, [nowPlaying, bodyBackground, setBodyBackground])

  return (
    <html lang="en">

      <AppContext.Provider value={{appReady, setAppReady, appState}}>
        <head>
          <meta charSet="utf-8" />
          <title>Lyrics Collection</title>
          <meta name="description" content="Lyrics Collection" />
        </head>
        <body >
          <div style={{"backgroundImage": `url(${bodyBackground})`, "backgroundRepeat": "repeat", "backgroundSize": "contain", "filter": "blur(30px) brightness(0.5)", "transition": "all 0.5s ease", "backgroundPosition": "center center"}} className={clsx("absolute -z-10 w-full h-full")}></div>
            {children}
          <div id="playerContainer" className={clsx("sticky bg-gray-800 h-10 bottom-0 w-full border-t-gray-500 border-t-2")}>
            <MediaControls nowPlaying={appState.nowPlaying} />
          </div>


        </body>

        

      </AppContext.Provider>
    </html>
  )
}
