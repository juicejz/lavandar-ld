from fastapi import FastAPI

from app.routers import clients
from app.db.base import Base
from app.db.session import engine

app = FastAPI(title="Client DB API")


@app.on_event("startup")
async def startup() -> None:
    # Create tables on startup (dev only; use Alembic later in prod)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app.include_router(clients.router)


@app.get("/api/v1/health")
async def health():
    return {"status": "ok"}