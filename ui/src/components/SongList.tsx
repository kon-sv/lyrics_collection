import clsx from "clsx";
import SongListItem from "./SongListItem";
import SongListSearch from "./SongListSearch";
import SongItem from "@/objects/SongItem";

function items(songs: SongItem[], selectSong: any) {
  return songs.map((s: SongItem) => <SongListItem selectSong={selectSong} key={s.id} song={s} />)
}

export default function SongList({ className, songs, selectSong, onSearch }: { className: any, songs: SongItem[], selectSong: any, onSearch: any }) {

  return <>
    <div className={className}>
      <div className={clsx("bg-gray-700 border-gray-100 p-4 rounded")}>
        <SongListSearch onSearch={onSearch} className={clsx("text-gray-400 p-1 bg-gray-800 rounded mb-2")} />
        {items(songs, selectSong)}
      </div>
    </div>
  </>

}
