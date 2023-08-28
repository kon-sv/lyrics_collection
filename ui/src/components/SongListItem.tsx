import SongItem from "@/objects/SongItem";
import clsx from "clsx";

export default function SongListItem( {song, selectSong} : {song: SongItem, selectSong: (evt: any, song: any) => {}}) {
  return <>
    <div className={clsx("my-2 p-1 hover:bg-gray-600 hover:rounded hover:cursor-pointer")} onClick={(evt) => {selectSong(evt, song)}}>
      <p>{song.title}</p>
    </div>

  </>

}
