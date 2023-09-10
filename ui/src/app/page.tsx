'use client'

import SongDetails from '@/components/SongDetails'
import SongList from '@/components/SongList'
import SongItem from '@/objects/SongItem'
import SongItemInternal, { SongItemInternalExtended } from '@/objects/SongItemInternal'
import SongItemSubsonic from '@/objects/SongItemSubsonic'
import { getRandomSongs, searchSubsonic, searchApplication, getAppSongByName, createSong, getAppVars, envVars, getSubsonicSongById} from '@/util/requests'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'


import { AppContext } from '@/app/context'



export default function Home() {

  let [appReady, setAppReady] = useState<boolean>(false)

  let [songs, setSongs] = useState<SongItem[]>([])
  let [selectedSong, setSelectedSong] = useState<SongItem | undefined>()
  let [timeoutState, setTimeoutState] = useState<any>(null)


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
      setAppReady(true)
    }).catch(console.error)
  }, []);

  const selectSong = useCallback((_e: any, song: SongItem) => {
    setSelectedSong(song)
    getAppSongByName(song.title).then((s) => {
      if (s.length == 0) {
        // create song entry
        createSong(song.title, song.path, song.id)
        
      }
      if (song instanceof SongItemInternal && song.subsonic_id != undefined) {
        getSubsonicSongById(song.subsonic_id).then((s) => {
          console.log(s)
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
  }, [])

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
          console.log(songs)
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

  return (
    <main className="flex min-h-screen flex-row p-24 container">
        <AppContext.Provider value={{appReady, setAppReady}}>
          <div className={clsx("flex w-full gap-2 flex-grow md:flex-row flex-col")}>
            <SongList onSearch={onSearch} className="max-w-[448px] min-w-min flex-grow-0 flex-shrink-0" songs={songs} selectSong={selectSong} />
            <SongDetails onSave={onSave} onDelete={onDelete} song={selectedSong} className="min-w-[600px] basis-2/3 flex-grow flex-auto" />
          </div>
        </AppContext.Provider>
    </main>
  )
}
