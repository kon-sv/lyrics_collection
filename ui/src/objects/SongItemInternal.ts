import { deleteAppSongById } from "@/util/requests";
import SongItem from "./SongItem";

export default class SongItemInternal extends SongItem {
  subsonic_id?: string
  lyrics?: { lyrics: string, language: string, id: number, song_id: number }[]
  inSubsonic?: boolean = false
  syncedLyrics?: boolean = false

  constructor(song: Partial<SongItem>) {
    super()
    Object.assign(this, song)
  }

  public lyricsByLanguage(): any {
    let lyrics_grouped: any = {
      "synced": {},
      "unsynced": {}
    }

    let l: any
    for (l in this.lyrics) {
      if (this.lyrics?.hasOwnProperty(l)) {
        const element: any = this.lyrics[l];
        console.log(element)
        if (lyrics_grouped[element["language"]] == undefined) {
          if (element["is_synced"]) {
            lyrics_grouped["synced"][element["language"]] = element["lyrics"]
          } else {
            lyrics_grouped["unsynced"][element["language"]] = element["lyrics"]
          }
        }
      }
    }

    return lyrics_grouped
  }

  public delete(): any {
    console.log("delete")
    deleteAppSongById(this.id).then(() => {
      console.log("deleted")
    })
  }

  public getSubsonicId(): string {
    return this.subsonic_id || ""
  }

}


export class SongItemInternalExtended extends SongItemInternal {
  artist?: string
  album?: string
  
  constructor(song: Partial<SongItemInternal>) {
    super(song)
    Object.assign(this, song)
  }
}
