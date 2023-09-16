from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    subsonic_id = Column(String)
    title = Column(String, index=True)
    path = Column(String, index=True)

    notes = Column(String)

    lyrics = relationship(
        "SongLyrics", back_populates="song", order_by="SongLyrics.id.desc()")


class SongLyrics(Base):
    __tablename__ = "songlyrics"

    id = Column(Integer, primary_key=True, index=True)
    lyrics = Column(String)
    song_id = Column(Integer, ForeignKey("songs.id"))
    is_synced = Column(Boolean, default=False)
    language = Column(String, index=True)

    song = relationship("Song", back_populates="lyrics")
