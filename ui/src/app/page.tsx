'use client'

import '@fontsource/inter';


import SongDetails from '@/components/SongDetails'
import SongList from '@/components/SongList'
import SongItem from '@/objects/SongItem'
import SongItemInternal, { SongItemInternalExtended } from '@/objects/SongItemInternal'
import SongItemSubsonic from '@/objects/SongItemSubsonic'
import { getRandomSongs, searchSubsonic, searchApplication, getAppSongByName, createSong, getAppVars, envVars, getSubsonicSongById} from '@/util/requests'
import clsx from 'clsx'
import { useCallback, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import akari from '@/public/akari.png'
import kyoko from '@/public/Daco_2493658.png'


import { AppContext } from '@/app/context'
import AppState from '@/objects/AppState'
import NowPlaying from '@/objects/NowPlaying'



export default function Home() {


  let [songs, setSongs] = useState<SongItem[]>([])
  let [selectedSong, setSelectedSong] = useState<SongItem | undefined>()
  let [timeoutState, setTimeoutState] = useState<any>(null)
  let [autosave, setAutosave] = useState<boolean>(false)

  let appContext = useContext(AppContext)

  useEffect(() => {
    getAppVars().then((vars) => {
      if (vars["SUBSONIC_API_URL"] == undefined) {
        console.error("SUBSONIC_API_URL not set")
      }
      if (vars["SUBSONIC_PARAMS"] == undefined) {
        console.error("SUBSONIC_PARAMS not set")
      }

      envVars.SUBSONIC_API_URL = vars["SUBSONIC_API_URL"]
      envVars.SUBSONIC_PARAMS = vars["SUBSONIC_PARAMS"]
      if (appContext.setAppReady != undefined) {
        appContext?.setAppReady(true)
      }
    }).catch(console.error)
  }, []);

  const selectSong = useCallback((_e: any, song: SongItem) => {
    setSelectedSong(song)
    getAppSongByName(song.title).then((s) => {
      if (s.length == 0) {
        // create song entry
        //
        if (autosave) {
          createSong(song.title, song.path, song.id)
          song.missingAppSong = false
        } else {
          song.missingAppSong = true
          setSelectedSong(song)
        }
        
      }
      if (song instanceof SongItemInternal && song.subsonic_id != undefined) {
        getSubsonicSongById(song.subsonic_id).then((s) => {
          if (s == undefined) {
            return
          }
          let songExtended = new SongItemInternalExtended(song)
          songExtended.inSubsonic = true
          songExtended.artist = s?.artist
          songExtended.album = s?.album
          setSelectedSong(songExtended)
        })

      }
    }).catch(console.error)
  }, [autosave])

  const onSearch = useCallback((search: string, type: "application" | "navidrome", hasLyrics: boolean) => {
    clearTimeout(timeoutState)

    if (search == "") {
      setSongs([])
    }

    setTimeoutState(setTimeout(() => {

      if (type == "navidrome") {
        searchSubsonic(search).then(async (s) => {
          if (s == undefined || s["song"] == undefined) {
            // setSongs([])
            if (search == "") {

              let s: any[] = await getRandomSongs()
              setSongs(s.map((s) => new SongItemSubsonic(s)))
            } else {
              setSongs([])
            }
            return
          }

          setSongs(s["song"]
            .map((s: any) => new SongItemSubsonic(s))
          )
        }).catch(console.error)
      } else if (type == "application") {
        searchApplication(search, hasLyrics).then((s) => {
          setSongs(s
            .map((s: any) => new SongItemInternal(s))
          )
        }).catch(console.error)
      }
      
    }, 600))

  }, [timeoutState, setTimeoutState])

  const onSave = (_: any) => {}
  const onDelete = useCallback((e: any) => {
    if (selectedSong == undefined) {
      return
    }
    if (selectedSong instanceof SongItemInternal) {
      selectedSong.delete().then(() => {
        setSelectedSong(undefined)
      })
    }
  }, [selectedSong])


  useEffect(() => {
    if (appContext.appState != undefined) {
      setAutosave(appContext.appState.options.autosave)
    }
  }, [appContext])

  return (
    <main className="flex min-h-screen flex-row p-24 container">
        <div className={clsx("flex w-full gap-2 flex-grow md:flex-row flex-col")}>
          <div className={clsx("max-w-[448px] min-w-min flex-grow-0 flex-shrink-0 flex-col")}>
            <SongList onSearch={onSearch} className="max-w-[448px] min-w-min flex-grow-0 flex-shrink-0" songs={songs} selectSong={selectSong} />
            <div className={clsx("bg-gray-700 border-gray-100 p-4 rounded mt-4 max-w-[448px]")}>
              <h1 className={clsx("mb-2 font-extrabold")}>Links</h1>
              <div className={clsx("flex flex-grow-0 flex-shrink-0 flex-wrap px-1 gap-0.5")}>
                <a href='https://lrc-maker.github.io/#/' target='_blank'><Image alt="akari" width={100} height={100} src={akari} className={clsx("w-20 h-20")} /></a>
                <a href='https://www.lyrical-nonsense.com/global' target='_blank'><Image alt="akari" width={100} height={100} src={kyoko} className={clsx("w-20 h-20")} /></a>
              </div>
            </div>

            <div className={clsx("bg-gray-700 border-gray-100 p-4 rounded mt-4 max-w-[448px]")}>
              <h1 className={clsx("mb-2 font-extrabold")}>Settings</h1>
              <div>
                <div className={clsx("mt-2")}>
                  <input id="autosave" name="autosave" type="checkbox" className={clsx("mr-2")} checked={appContext.appState?.options.autosave} onChange={() => { 
                    appContext.appState?.setOptions({autosave: !appContext.appState?.options.autosave})
                    
                  }}/>
                  <label htmlFor="autosave" className={clsx("mr-2")}>Autosave Missing Songs</label>
                </div>
              </div>
            </div>

          </div>
          <SongDetails onSave={onSave} onDelete={onDelete} song={selectedSong} className="min-w-[600px] basis-2/3 flex-grow flex-auto" />
        </div>

    </main>
  )
}
