import { deleteAppSongById } from "@/util/requests";
import SongItem from "./SongItem";

export default class SongItemInternal extends SongItem {
  subsonic_id?: string
  lyrics?: { lyrics: string, language: string, id: number, song_id: number }[]
  inSubsonic?: boolean = false

  constructor(song: Partial<SongItem>) {
    super()
    Object.assign(this, song)
  }

  public lyricsByLanguage(): any {
    let lyrics_grouped: any = {}

    let l: any
    for (l in this.lyrics) {
      if (this.lyrics?.hasOwnProperty(l)) {
        const element: any = this.lyrics[l];
        if (lyrics_grouped[element["language"]] == undefined) {
          lyrics_grouped[element["language"]] = element["lyrics"]
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
