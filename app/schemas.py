from pydantic import BaseModel
from typing import Optional


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
    subsonic_id: str


class SongCreate(SongBase):
    pass


class Song(SongBase):
    id: int
    lyrics: list[SongLyrics] = []
    notes: Optional[str] = None

    class Config:
        orm_mode = True
