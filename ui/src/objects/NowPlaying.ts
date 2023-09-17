import { getSubsonicCoverArtById } from "@/util/requests"
import SongItem from "./SongItem"

export default class NowPlaying {
  src?: string
  song?: SongItem
  coverArt?: string
  backgroundChange?: Promise<string>

  constructor(song: SongItem | undefined) {
    this.song = song
    if (song?.getSubsonicId()) {
      this.backgroundChange = new Promise((resolve, reject) => {
        getSubsonicCoverArtById(song?.getSubsonicId()).then((res) => {
          this.coverArt = URL.createObjectURL(res)
          console.log(this.coverArt)
          resolve(this.coverArt)
        }).catch((err) => {
          console.error(err)
          reject(err)
        })
      })
    }
    console.log("now playing.." + song?.title)
  }
}
