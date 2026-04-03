from typing import Optional

from pydantic import BaseModel, EmailStr


class ClientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: Optional[str] = None

    address_1: str
    address_2: Optional[str] = None
    city: str
    province: str
    country: str

    phone: Optional[str] = None
    email: EmailStr

    account_no: str
    expiry: int
    cvv: int
    IP: str
    mmn: str

    phone_verified: bool = False
    address_verified: bool = False
    dob_verified: bool = False
    ip_geolocation_performed: bool = False
    ip_geolocation_results: Optional[str] = None

    notes: Optional[str] = None


class ClientCreate(ClientBase):
    # no id — DB generates it
    pass


class ClientUpdate(BaseModel):
    # all fields optional so you can PATCH-like updates
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[str] = None

    address_1: Optional[str] = None
    address_2: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    country: Optional[str] = None

    phone: Optional[str] = None
    email: Optional[EmailStr] = None

    account_no: Optional[int] = None
    expiry: Optional[int] = None
    cvv: Optional[int] = None
    IP: Optional[str] = None
    mmn: Optional[str] = None

    phone_verified: Optional[bool] = None
    address_verified: Optional[bool] = None
    dob_verified: Optional[bool] = None
    ip_geolocation_performed: Optional[bool] = None
    ip_geolocation_results: Optional[str] = None

    notes: Optional[str] = None


class ClientOut(ClientBase):
    id: int

    model_config = {"from_attributes": True}