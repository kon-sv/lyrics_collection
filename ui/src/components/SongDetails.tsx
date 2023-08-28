import clsx from "clsx"
import SongLyrics from "./SongLyrics"
import Tabs from "./Tabs"
import Tab from "./Tab"
import { useCallback, useEffect, useState } from "react"
import SongItemSubsonic from "@/objects/SongItemSubsonic"
import TabContent from "./TabContent"
import SongEdit from "./SongEdit"
import SongItemInternal from "@/objects/SongItemInternal"
import SongItem from "@/objects/SongItem"

export default function SongDetails({ className, song, onSave }: { className: any, song?: SongItemSubsonic, onSave: any }) {

  let [selectedTab, setSelectedTab] = useState("Info")
  const tabSelect = useCallback((tabName: string, _: any) => {
    setSelectedTab(tabName)
  }, [])

  useEffect(() => {
    setSelectedTab(selectedTab)
  }, [song, selectedTab])


  const songDetails = useCallback((song?: SongItem) => {


    if (!song) {
      return null
    }

    if (song instanceof SongItemInternal) {
      
      return <div>
        <div>ID: {song.id}</div>
        <div>Artist: -</div>
        <div>Title: {song.title}</div>
        <div>Artist: -</div>
        <div>Album: -</div>
      </div>
    } else if (song instanceof SongItemSubsonic) {

      return <div>
        <div>ID: {song.id}</div>
        <div>Artist: {song.artist}</div>
        <div>Title: {song.title}</div>
        <div>Artist: {song.artist}</div>
        <div>Album: {song.album}</div>
      </div>
    }

  }, [selectedTab])


  return <>
    <div className={className}>
      <div className={clsx("bg-gray-700 border-gray-100 p-4 rounded")}>
          <div className={clsx("mb-4")}>
            <h1 className={clsx("font-bold")}>Song Details</h1>
            {songDetails(song)}
          </div>

        <div className={clsx("border-t-2 border-gray-500 my-4")}></div>
        <Tabs>
          <Tab selectedTab={selectedTab} selection={tabSelect} tabName="Info">
          </Tab>

          <Tab selectedTab={selectedTab} selection={tabSelect} tabName="Edit">
          </Tab>
        </Tabs>

        <div className={clsx("border-t-2 border-gray-500 my-4")}></div>

        <TabContent show={selectedTab == "Info"}>
          <SongLyrics song={song as SongItemInternal}/>
        </TabContent>


        <TabContent show={selectedTab == "Edit"}>
          <div className={clsx("mt-4")}>
          <SongEdit song={song} onSave={onSave}/>
          </div>
        </TabContent>
      </div>

    </div>
  </>
}
