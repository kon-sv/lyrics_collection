import clsx from "clsx"
import SongLyrics from "./SongLyrics"
import Tabs from "./Tabs"
import Tab from "./Tab"
import { useCallback, useContext, useEffect, useState } from "react"
import SongItemSubsonic from "@/objects/SongItemSubsonic"
import TabContent from "./TabContent"
import SongEdit from "./SongEdit"
import SongItemInternal, { SongItemInternalExtended } from "@/objects/SongItemInternal"
import SongItem from "@/objects/SongItem"
import SongPlayback from "./SongPlayback"
import LcButton from "./layout/LcButton"
import IAppContext from "@/app/interfaces/AppContextInterface"
import { AppContext } from "@/app/context"
import NowPlaying from "@/objects/NowPlaying"
import { createSong } from "@/util/requests"

export default function SongDetails({ className, song, onSave, onDelete}: { className: any, song?: SongItem, onSave: any, onDelete: any }) {

  let [selectedTab, setSelectedTab] = useState("Lyrics")
  const appContext: IAppContext = useContext(AppContext)

  let [missingSong, setMissingSong] = useState<boolean>(false)

  const tabSelect = useCallback((tabName: string, _: any) => {
    setSelectedTab(tabName)
  }, [])

  useEffect(() => {
    setSelectedTab(selectedTab)
    setMissingSong(song?.missingAppSong ?? false)
    if (song instanceof SongItem) { 
      console.log(song.missingAppSong)
      console.log(song)
    }
  }, [song, selectedTab])


  // useEffect(() => {
  //
  // }, [song?.missingAppSong])

  const songDetails = useCallback((song?: SongItem) => {


    if (!song) {
      return null
    }

    if (song instanceof SongItemInternal) {
      
      return <div>
        <div>ID: {song.id}</div>
        <div>Subsonic ID: {song.subsonic_id}</div>
        <div>Album: { song instanceof SongItemInternalExtended ? song?.album : "-"}</div>
        <div>Title: {song.title}</div>
        <div>Album Artist: { song instanceof SongItemInternalExtended ? song?.artist : "-"}</div>
        <div>Album: { song instanceof SongItemInternalExtended ? song?.album : "-"}</div>
      </div>
    } else if (song instanceof SongItemSubsonic) {

      return <div>
        <div>ID: {song.id}</div>
        <div>Artist: {song.artist}</div>
        <div>Title: {song.title}</div>
        <div>Album Artist: {song.artist}</div>
        <div>Album: {song.album}</div>
      </div>
    }

  }, [selectedTab])


  return <>
    <div className={className}>
      <div className={clsx("bg-gray-700 border-gray-100 p-4 rounded")}>
        <div className={clsx("flex justify-between")}>
          <div className={clsx("mb-4")}>
            <h1 className={clsx("font-bold")}>Song Details</h1>
            {songDetails(song)}
          </div>


          <div className={clsx("flex flex-col justify-between")}>
            <div>

              { song instanceof SongItemInternal ?
              <svg xmlns="http://www.w3.org/2000/svg" className={clsx("h-6 w-6 text-gray-400 hover:text-gray-200 cursor-pointer")} fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => { onDelete(e) }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              : null
              }


              { song instanceof SongItemInternal && !song.inSubsonic ?
              <svg className={clsx("mt-2")} fill="#ff094a" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 489.418 489.418" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M244.709,389.496c18.736,0,34.332-14.355,35.91-33.026l24.359-290.927c1.418-16.873-4.303-33.553-15.756-46.011 C277.783,7.09,261.629,0,244.709,0s-33.074,7.09-44.514,19.532C188.74,31.99,183.022,48.67,184.44,65.543l24.359,290.927 C210.377,375.141,225.973,389.496,244.709,389.496z"></path> <path d="M244.709,410.908c-21.684,0-39.256,17.571-39.256,39.256c0,21.683,17.572,39.254,39.256,39.254 s39.256-17.571,39.256-39.254C283.965,428.479,266.393,410.908,244.709,410.908z"></path> </g> </g></svg>

              : null}



            </div>

          </div>

        </div>

        <div>
          <LcButton onClick={() => {appContext.appState?.setNowPlaying(new NowPlaying(song))}}>Play</LcButton>
          { song instanceof SongItemSubsonic && missingSong ? <LcButton className={clsx("ml-2")}
            onClick={() => {createSong(song.title, song.path, song.getSubsonicId())}}>Save</LcButton>
            : null
          }
        </div>

        <div className={clsx("border-t-2 border-gray-500 my-4")}></div>
        <Tabs>
          <Tab selectedTab={selectedTab} selection={tabSelect} tabName="Lyrics">
          </Tab>

          <Tab selectedTab={selectedTab} selection={tabSelect} tabName="Edit">
          </Tab>

          <Tab selectedTab={selectedTab} selection={tabSelect} tabName="Notes" />
        </Tabs>

        <div className={clsx("border-t-2 border-gray-500 my-4")}></div>

        <TabContent show={selectedTab == "Lyrics"}>
          <SongLyrics song={song as SongItemInternal}/>
        </TabContent>


        <TabContent show={selectedTab == "Edit"}>
          <div className={clsx("mt-4")}>
          <SongEdit song={song} onSave={onSave}/>
          </div>
        </TabContent>

        <TabContent show={selectedTab == "Notes"}>
          <div className={clsx("mt-4")}>
            <h1 className={clsx("mb-2")}>Notes</h1>

            <LcButton onClick={() => {}} className={clsx("mb-2")} >Save</LcButton>
            <div className={clsx("bg-gray-800 rounded p-2")}>
              <div>
                <textarea className={clsx("w-full h-64 bg-gray-800 rounded p-2")}></textarea>
              </div>
            </div>
          </div>

        </TabContent>

      </div>

    </div>
  </>
}
