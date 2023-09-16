import SongItemInternal from "@/objects/SongItemInternal";
import clsx from "clsx";
import SongPlayback from "./SongPlayback";
import NowPlaying from "@/objects/NowPlaying";

export default function MediaControls({nowPlaying}: {nowPlaying: NowPlaying | undefined}) {
  return <>
        <div className={clsx("py-2 px-16 mt-0")}>
          { nowPlaying != undefined ?
            <SongPlayback containerClassName={clsx("m-0 p-0")} audioClassName={clsx("w-full h-6")} song={nowPlaying.song}/>
            : <></>
          }
        </div>
  </>
}
