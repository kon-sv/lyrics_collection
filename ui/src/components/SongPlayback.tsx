import SongItem from "@/objects/SongItem";
import { getStreamSubsonicSongURL } from "@/util/requests";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function SongPlayback({song}: {song?: SongItem}) {
 
  let [stream, setStream] = useState<any>(null)

  const streamUrl = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioSourceRef = useRef<HTMLSourceElement>(null)

  useEffect(() => {
    if (song == undefined) {
      return
    }

    let s = <audio controls className={clsx("w-full")}>
        <source src={getStreamSubsonicSongURL(song.subsonic_id)} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>


    // setStream(s)

    streamUrl.current = getStreamSubsonicSongURL(song.subsonic_id)
    audioSourceRef.current?.setAttribute("src", streamUrl.current)
    audioRef.current?.load()
  }, [song])

  return <>
    <div className={clsx("bg-gray-700 border-gray-100 p-0 rounded")}>

      <audio ref={audioRef} controls className={clsx("w-full")} onChange={(e) => {console.log(e)}}>
        <source ref={audioSourceRef} src={streamUrl.current} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </>

}
