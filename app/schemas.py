from pydantic import BaseModel


class SongLyricsBase(BaseModel):
    lyrics: str
    language: str


class SongLyricsCreate(SongLyricsBase):
    pass


class SongLyrics(SongLyricsBase):
    id: int
    song_id: int

    class Config:
        orm_mode = True


class SongBase(BaseModel):
    title: str
    path: str


class SongCreate(SongBase):
    pass


class Song(SongBase):
    id: int
    lyrics: list[SongLyrics] = []

    class Config:
        orm_mode = True
