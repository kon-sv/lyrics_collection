## Lyrics Collection

A web application with the intention to sit alongside a navidrome/subsonic library and to keep a collection of lyrics for each song in a database

## Development

### Run API
> uvicorn  app.main:app --host 0.0.0.0 --port 8080

### Run UI App
> cd ui
> yarn run dev

### Migration

> alembic upgrade head
