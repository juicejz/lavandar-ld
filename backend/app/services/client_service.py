from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientUpdate

async def get_all(db: AsyncSession):
    result = await db.execute(select(Client))
    return result.scalars().all()

async def get_by_id(db: AsyncSession, client_id: int):
    result = await db.execute(select(Client).where(Client.id == client_id))
    return result.scalar_one_or_none()

async def create(db: AsyncSession, data: ClientCreate):
    client = Client(**data.model_dump())
    db.add(client)
    await db.commit()
    await db.refresh(client)
    return client

async def update(db: AsyncSession, client_id: int, data: ClientUpdate):
    client = await get_by_id(db, client_id)
    if not client:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(client, field, value)
    await db.commit()
    await db.refresh(client)
    return client

async def delete(db: AsyncSession, client_id: int):
    client = await get_by_id(db, client_id)
    if client:
        await db.delete(client)
        await db.commit()
    return client