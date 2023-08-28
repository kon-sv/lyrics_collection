import clsx from "clsx";
import { useEffect, useState } from "react";

type SearchTarget = "navidrome" | "application"

export default function SongListSearch({ className, onSearch }: { className: any, onSearch: (q: string, tgt: SearchTarget) => void }) {

  let [search, setSearch] = useState("")
  let [searchTarget, setSearchTarget] = useState<SearchTarget>("navidrome")

  useEffect(() => {
    onSearch(search, searchTarget)
  }, [search, searchTarget])


  return <>
    <div className={clsx("block")}>
      <select className={clsx("bg-gray-500 rounded mr-2 p-1 max-w-[120px]")} value={searchTarget} onChange={e => setSearchTarget(e.target.value as SearchTarget)}>
        <option value="navidrome">Navidrome</option>
        <option value="application">Application</option>
      </select>
      <div className={clsx("mt-2")}>
        <input id="search" onChange={(evt) => { setSearch(evt.target.value);}} className={className} type="text" />
        <button className={clsx("rounded ml-1 w-6 p-1 bg-gray-800")}>S</button>
      </div>
    </div>
  </>

}
