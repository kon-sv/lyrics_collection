import SongItem from "./SongItem";

export default class SongItemInternal extends SongItem {
  lyrics?: { lyrics: string, language: string, id: number, song_id: number }[]

  constructor(song: Partial<SongItem>) {
    super()
    Object.assign(this, song)
  }
}
