import { FullScreenIcon } from "@/app/svg/svg";
import SongItemInternal from "@/objects/SongItemInternal";
import clsx from "clsx";
import { useEffect, useState } from "react";


import Switch from "./layout/Switch";

export default function SongLyrics({song} : {song: SongItemInternal}) {

  let [lyrics_grouped, set_lyrics_groups] = useState<any>({})
  let [language, setLanguage] = useState<string>("ja")
  let [fontSize, setFontSize] = useState<number>(14)
  let [syncedLyrics, setSyncedLyrics] = useState<boolean>(false)
  let [lyrics, setLyrics] = useState<any>({})


  useEffect(() => {
    if (song != undefined && song instanceof SongItemInternal) {
      const lrc = song.lyricsByLanguage()
      setLyrics(lrc)
    }

  }, [song, syncedLyrics])


  useEffect(() => {
    if (lyrics && lyrics != undefined && Object.keys(lyrics).length > 0) {
      set_lyrics_groups(lyrics[syncedLyrics ? "synced" : "unsynced"])
    }
  }, [syncedLyrics, lyrics])



  return <>
    <div className={clsx("flex justify-between")}>

    <h1 className={clsx("mb-2")}>Lyrics</h1>

    <div className={clsx("h-4 w-4")}>
      <FullScreenIcon className={clsx("text-gray-400 hover:cursor-pointer hover:text-gray-200")} />
    </div>

    </div>

    <div className={clsx("relative")}>

      <div className={clsx("relative h-10")}>
        <select className={clsx("right-0 top-0 bg-gray-800 text-white p-1 rounded")} onChange={(evt) => {setLanguage(evt.target.value)}}>
          <option value="ja">Japanese</option>
          <option value="en">English</option>
        </select>
      </div>

      <div>
        <label>Font Size: {fontSize}</label>
        <input type="range" min="10" max="28" className={clsx("w-full")} value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))}/>
      </div>

      <div

        >
          <Switch onChange={(val) => {setSyncedLyrics(val)}} label="Show Synced Lyrics"></Switch>
        </div>

      <div className={clsx("relative")}>
      {Object.keys(lyrics_grouped).map((key) => {
        if (key == language) {
        return <div  key={key}>
          <h1 className={clsx("font-bold mb-4 bg-gray-800 rounded text-center")}>{key.toUpperCase()}</h1>
          <div style={{fontSize}}>
            <pre className={clsx("break-words overflow-x-auto")}>{lyrics_grouped[key]}</pre>
          </div>
        </div>
        } else {
          return null
        }
      }
      )}
      </div>
    </div>
  </>
}
