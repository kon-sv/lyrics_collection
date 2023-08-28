import SongItemInternal from "@/objects/SongItemInternal";
import clsx from "clsx";
import { useEffect } from "react";

export default function SongLyrics({song} : {song: SongItemInternal}) {

  let lyrics_grouped: any = {}
  const lyrics = song?.lyrics

  console.log(lyrics)

  let l: any
  for (l in lyrics) {
    if (lyrics?.hasOwnProperty(l)) {
      const element: any = lyrics[l];
      console.log(element)
      lyrics_grouped[element["language"]] = element["lyrics"]
    }
  }

  useEffect(() => {
    console.log(song)
  }, [song])
  return <>
    <h1 className={clsx("mb-2")}>Lyrics</h1>
    <div className={clsx("relative")}>
      {Object.keys(lyrics_grouped).map((key) => {
        return <div key={key}>
          <h1 className={clsx("font-bold mb-4 bg-gray-800 rounded text-center")}>{key.toUpperCase()}</h1>
          <pre className={clsx("break-words overflow-x-auto text-lg")}>{lyrics_grouped[key]}</pre>
        </div>
      }
      )}
    </div>
  </>
}
