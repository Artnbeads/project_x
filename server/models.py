from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    reg_number = Column(String(50), unique=True, nullable=False)
    fuel_efficiency = Column(Float, nullable=False)

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(100), nullable=False)
    goods = Column(Integer, nullable=False)
    cost = Column(Float, nullable=False)
    order_date = Column(Date, nullable=False)
    payment_date = Column(Date, nullable=True)
    delivery_date = Column(Date, nullable=False)
    payment_method = Column(String(50), nullable=False)
    vehicle_used = Column(String(100), ForeignKey("vehicles.name"), nullable=False)

    vehicle = relationship("Vehicle")
