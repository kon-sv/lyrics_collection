from sqlalchemy.orm import Session

from . import models, schemas


def get_song(db: Session, song_id: int):
    return db.query(models.Song).filter(models.Song.id == song_id).first()


def get_songs(db: Session, skip: int = 0, limit: int = 100, filter={}):

    if filter and filter is not None:
        return db.query(models.Song).filter_by(**filter).offset(skip).limit(limit).all()

    return db.query(models.Song).offset(skip).limit(limit).all()


def create_song(db: Session, song: schemas.SongCreate):
    db_song = models.Song(**song.dict())
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return db_song


def create_song_lyrics(db: Session, lyrics: schemas.SongLyricsCreate, song_id: int):
    db_lyrics = models.SongLyrics(**lyrics.dict(), song_id=song_id)
    db.add(db_lyrics)
    db.commit()
    db.refresh(db_lyrics)
    return db_lyrics
    # return crud.create_song_lyrics(db=db, lyrics=lyrics, song_id=song_id)


def search_song(db: Session, q: str):
    # return db.query(models.Song).filter(models.Song.title.ilike(f"%{q}%")).all()

    search = "%{}%".format(q)
    return db.query(models.Song).filter(models.Song.title.like(search)).all()
