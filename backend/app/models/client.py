from sqlalchemy import Integer, String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    last_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    date_of_birth: Mapped[str | None] = mapped_column(String(20), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    address_1: Mapped[str | None] = mapped_column(String(255), nullable=True)
    address_2: Mapped[str | None] = mapped_column(String(255), nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    province: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)

    account_no: Mapped[str] = mapped_column(String)
    expiry: Mapped[int] = mapped_column(Integer)
    cvv: Mapped[int] = mapped_column(Integer)
    IP: Mapped[str | None] = mapped_column(String(64), nullable=True)
    mmn: Mapped[str | None] = mapped_column(String(255), nullable=True)

    phone_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    address_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    dob_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    ip_geolocation_performed: Mapped[bool] = mapped_column(Boolean, default=False)
    ip_geolocation_results: Mapped[str | None] = mapped_column(Text, nullable=True)