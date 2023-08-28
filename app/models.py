from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    path = Column(String, index=True)

    lyrics = relationship("SongLyrics", back_populates="song")


class SongLyrics(Base):
    __tablename__ = "songlyrics"

    id = Column(Integer, primary_key=True, index=True)
    lyrics = Column(String)
    song_id = Column(Integer, ForeignKey("songs.id"))
    language = Column(String, index=True)

    song = relationship("Song", back_populates="lyrics")
