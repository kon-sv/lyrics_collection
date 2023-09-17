import { SearchTarget } from "@/util/types";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SongListSearch({ className, onSearch }: { className: any, onSearch: (q: string, tgt: SearchTarget, hasLyrics: boolean) => void }) {

  let [search, setSearch] = useState("")
  let [hasLyrics, setHasLyrics] = useState(true)
  let [searchTarget, setSearchTarget] = useState<SearchTarget>("application")

  useEffect(() => {
    onSearch(search, searchTarget, hasLyrics)
  }, [search, searchTarget, hasLyrics])


  return <>
    <div className={clsx("block")}>
      <select className={clsx("right-0 top-0 bg-gray-800 text-white p-1 rounded", "bg-gray-500 rounded mr-2 p-1 max-w-[120px]")} value={searchTarget} onChange={e => setSearchTarget(e.target.value as SearchTarget)}>
        <option value="navidrome">Navidrome</option>
        <option value="application">Application</option>
      </select>

      <div className={clsx("mt-2")}>
        <input id="haslyrics" name="haslyrics" type="checkbox" className={clsx("mr-2")} checked={hasLyrics} onChange={() => setHasLyrics(!hasLyrics)}/>
        <label htmlFor="haslyrics" className={clsx("mr-2")}>Has Lyrics</label>
      </div>
      <div className={clsx("mt-2")}>
        <input id="search" onChange={(evt) => { setSearch(evt.target.value);}} className={className} type="text" />
      </div>
    </div>
  </>

}
