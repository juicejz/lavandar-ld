from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.client import ClientCreate, ClientUpdate, ClientOut
from app.services import client_service

router = APIRouter(prefix="/api/v1/clients", tags=["clients"])

@router.get("/", response_model=list[ClientOut])
async def list_clients(db: AsyncSession = Depends(get_db)):
    return await client_service.get_all(db)

@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: int, db: AsyncSession = Depends(get_db)):
    client = await client_service.get_by_id(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.post("/", response_model=ClientOut, status_code=201)
async def create_client(data: ClientCreate, db: AsyncSession = Depends(get_db)):
    return await client_service.create(db, data)

@router.put("/{client_id}", response_model=ClientOut)
async def update_client(client_id: int, data: ClientUpdate, db: AsyncSession = Depends(get_db)):
    client = await client_service.update(db, client_id, data)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.delete("/{client_id}")
async def delete_client(client_id: int, db: AsyncSession = Depends(get_db)):
    client = await client_service.delete(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"detail": "Deleted"}