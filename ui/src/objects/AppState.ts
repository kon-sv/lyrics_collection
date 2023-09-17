import NowPlaying from "./NowPlaying";

export default class AppState {
  nowPlaying: NowPlaying | undefined
  setNowPlaying: (nowPlaying: NowPlaying) => void
  options: any
  setOptions: (options: any) => void

  constructor(nowPlaying: NowPlaying | undefined, setNowPlaying: (nowPlaying: NowPlaying) => void, options: any, setOptions: (options: any) => void) {
    this.options = options
    this.setOptions = setOptions
    this.nowPlaying = nowPlaying
    this.setNowPlaying = setNowPlaying
  }
}
