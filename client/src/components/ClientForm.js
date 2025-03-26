import React, { useState } from "react";
import PropTypes from 'prop-types';

const ClientForm = ({ onSubmit, isVehicleForm, vehicles = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    fuelEfficiency: "",
    clientName: "",
    goods: "",
    cost: "",
    orderDate: "",
    paymentDate: "",
    deliveryDate: "",
    paymentMethod: "cash",
    vehicleUsed: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isVehicleForm) {
      onSubmit({ 
        name: formData.name,
        regNumber: formData.regNumber,
        fuelEfficiency: formData.fuelEfficiency
      });
    } else {
      const costValue = parseFloat(formData.cost) || 0;
      const goodsValue = parseInt(formData.goods) || 0;
      
      onSubmit({
        clientName: formData.clientName,
        goods: goodsValue,
        cost: costValue,
        orderDate: formData.orderDate,
        paymentDate: formData.paymentDate,
        deliveryDate: formData.deliveryDate,
        paymentMethod: formData.paymentMethod,
        vehicleUsed: formData.vehicleUsed,
        amountPaid: formData.paymentDate ? costValue : 0,
        amountOwed: formData.paymentDate ? 0 : costValue
      });
    }

    // Reset form fields
    setFormData({
      name: "",
      regNumber: "",
      fuelEfficiency: "",
      clientName: "",
      goods: "",
      cost: "",
      orderDate: "",
      paymentDate: "",
      deliveryDate: "",
      paymentMethod: "cash",
      vehicleUsed: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isVehicleForm ? (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Vehicle Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="regNumber"
              placeholder="Registration Number"
              value={formData.regNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="fuelEfficiency"
              placeholder="Fuel Efficiency (km/l)"
              value={formData.fuelEfficiency}
              onChange={handleChange}
              required
              min="0"
              step="0.1"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="clientName"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="goods"
              placeholder="Number of Goods"
              value={formData.goods}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="cost"
              placeholder="Cost of Goods (Ksh)"
              value={formData.cost}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <label>Order Date</label>
            <input
              type="date"
              className="form-control"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Payment Date</label>
            <input
              type="date"
              className="form-control"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Delivery Date</label>
            <input
              type="date"
              className="form-control"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Payment Method</label>
            <select
              className="form-control"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="cash">Cash</option>
              <option value="mpesa">M-Pesa</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Vehicle Used</label>
            <select
              className="form-control"
              name="vehicleUsed"
              value={formData.vehicleUsed}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle, index) => (
                <option key={index} value={vehicle.name}>
                  {vehicle.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <button type="submit" className="btn btn-primary">
        {isVehicleForm ? "Add Vehicle" : "Add Client"}
      </button>
    </form>
  );
};

ClientForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isVehicleForm: PropTypes.bool,
  vehicles: PropTypes.array,
};

ClientForm.defaultProps = {
  isVehicleForm: false,
  vehicles: [],
};

export default ClientForm;