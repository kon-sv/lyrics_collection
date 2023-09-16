import NowPlaying from "./NowPlaying";

export default class AppState {
  nowPlaying: NowPlaying | undefined
  setNowPlaying: (nowPlaying: NowPlaying) => void

  constructor(nowPlaying: NowPlaying | undefined, setNowPlaying: (nowPlaying: NowPlaying) => void) {
    this.nowPlaying = nowPlaying
    this.setNowPlaying = setNowPlaying
  }
}
