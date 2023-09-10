import SongItem from "./SongItem";

export default class SongItemSubsonic extends SongItem {
  album!: string
  albumId!: string
  artist!: string
  artistId!: string
  bitRate!: number
  contentType!: string
  coverArt!: string
  created!: string
  discNumber!: number
  duration!: number
  id!: string
  isDir!: boolean
  isVideo!: boolean
  parent!: string
  path!: string
  size!: number
  suffix!: string
  title!: string
  track!: string
  type!: string
  year!: number


  constructor(song: Partial<SongItemSubsonic>) {
    super()
    Object.assign(this, song)
  }

  public getSubsonicId(): string {
    return this.id
  }


}
