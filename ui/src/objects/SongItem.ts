import Item from "./Item";

export default class SongItem extends Item {
  id!: string
  title!: string
  path!: string
  missingAppSong: boolean = false

  public getSubsonicId(): string {
    return this.id
  }


}
