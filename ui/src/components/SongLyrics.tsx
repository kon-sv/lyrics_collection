import SongItemInternal from "@/objects/SongItemInternal";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SongLyrics({song} : {song: SongItemInternal}) {

  let [lyrics_grouped, set_lyrics_groups] = useState<any>({})
  let [language, setLanguage] = useState<string>("ja")
  let [fontSize, setFontSize] = useState<number>(14)


  useEffect(() => {
    if (song != undefined && song instanceof SongItemInternal) {
      set_lyrics_groups(song.lyricsByLanguage())
    }

  }, [song])




  return <>
    <h1 className={clsx("mb-2")}>Lyrics</h1>

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
