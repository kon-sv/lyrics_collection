from functools import lru_cache
from fastapi import Depends, HTTPException, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from typing_extensions import Annotated

from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

import logging
import os

from . import crud, models, schemas
from .database import SessionLocal
from . import config


@lru_cache()
def get_settings():
    return config.Settings()


app = FastAPI()

logging.basicConfig(filename="/tmp/app.log", level=logging.DEBUG)
logger = logging.getLogger(__name__)

# models.Base.metadata.create_all(bind=engine)


APP_VARS = {
    "SUBSONIC_API_URL": os.environ.get("SUBSONIC_API_URL"),
    "SUBSONIC_PARAMS": os.environ.get("SUBSONIC_PARAMS")
}

# Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
async def root():
    return {"message": "test"}


@app.get("/api/home")
async def home():
    return {"message": "groove street"}


@app.get("/api/songs", response_model=list[schemas.Song])
def songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), name: str | None = None):
    filter = {}
    if name is not None:
        filter.update({"title": name})
        #     filter["name"] = name

    songs = crud.get_songs(db, skip=skip, limit=limit, filter=filter)

    return songs


@app.get("/api/songs/search", response_model=list[schemas.Song])
def song_search(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), q: str = None, hasLyrics: bool = False):
    return crud.search_song(db, q, hasLyrics)


@ app.post("/api/songs", response_model=schemas.Song)
def create_song(song: schemas.SongCreate, db: Session = Depends(get_db)):
    db_user = crud.get_song_by_title(db, title=song.title)
    if db_user:
        raise HTTPException(status_code=400, detail="Song already registered")
    return crud.create_song(db=db, song=song)


@ app.delete("/api/songs/{song_id}", response_model=schemas.Song)
def delete_song(song_id: str, db: Session = Depends(get_db)):
    song = crud.get_song(db, song_id=song_id)
    if not song:
        raise HTTPException(status_code=422, detail="Song not found")
    return crud.delete_song(db=db, song=song)


@ app.post("/api/songs/{song_id}/lyrics/", response_model=schemas.SongLyrics)
def create_lyrics_for_song(
    song_id: int, lyrics: schemas.SongLyricsCreate, db: Session = Depends(get_db)
):
    return crud.create_song_lyrics(db=db, lyrics=lyrics, song_id=song_id)


@ app.post("/api/songs/{song_id}/notes/", response_model=schemas.Song)
def save_song_notes(
    song_id: int, notes: str, db: Session = Depends(get_db)
):
    song = crud.get_song(db, song_id=song_id)
    if not song:
        raise HTTPException(status_code=422, detail="Song not found")
    return crud.save_song_notes(db=db, song=song, notes=notes)


@ app.get("/api/envars")
def env_vars(settings: Annotated[config.Settings, Depends(get_settings)]):
    APP_VARS["SUBSONIC_API_URL"] = settings.subsonic_api_url
    APP_VARS["SUBSONIC_PARAMS"] = settings.params
    return APP_VARS

# @app.post("/api/save-lyrics")
# async def save_lyrics(songLyrics: SongLyrics):
#     logger.info(songLyrics)
#     return songLyrics


app.mount("/", StaticFiles(directory="static", html=True), name="static")
