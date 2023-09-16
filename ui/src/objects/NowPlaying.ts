import SongItem from "./SongItem"

export default class NowPlaying {
  src?: string
  song?: SongItem

  constructor(song: SongItem | undefined) {
    this.song = song

    console.log("now playing.." + song?.title)
  }
}
