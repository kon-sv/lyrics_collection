'use client'

import SongDetails from '@/components/SongDetails'
import SongList from '@/components/SongList'
import SongItemSubsonic from '@/objects/SongItemSubsonic'
import { getRandomSongs, searchSubsonic, searchApplication, getAppSongByName, createSong } from '@/util/requests'
import clsx from 'clsx'
import { useCallback, useState } from 'react'



export default function Home() {
  let [songs, setSongs] = useState<SongItemSubsonic[]>([])
  let [selectedSong, setSelectedSong] = useState<SongItemSubsonic | undefined>()
  let [timeoutState, setTimeoutState] = useState<any>(null)

  const selectSong = useCallback((e: any, song: SongItemSubsonic) => {
    setSelectedSong(song)
    getAppSongByName(song.title).then((s) => {
      if (s.length == 0) {
        console.log(s)
        // create song entry
        createSong(song.title, song.path)
        
      }
    }).catch(console.error)
    console.log(e, song)
  }, [])

  const onSearch = useCallback((search: string, type: "application" | "navidrome") => {
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
        searchApplication(search).then((s) => {
          setSongs(s
            .map((s: any) => new SongItemSubsonic(s))
          )
        }).catch(console.error)
      }
      
    }, 600))

  }, [timeoutState, setTimeoutState])

  const onSave = (_: any) => {}

  return (
    <main className="flex min-h-screen flex-row p-24 container">
      <div className={clsx("flex flex-row w-full gap-2 flex-grow")}>
        <SongList onSearch={onSearch} className="min-w-fit w-1/3" songs={songs} selectSong={selectSong} />
        <SongDetails onSave={onSave} song={selectedSong} className="min-w-[600px] w-2/3 flex-grow flex-auto" />
      </div>
    </main>
  )
}
