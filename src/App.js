import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientForm from "./ClientForm";
import ClientTable from "./ClientTable";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [clients, setClients] = useState([]);

  const addVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  const addClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  return (
    <div className="container mt-5">
      <h1>Transport Company Management</h1>

      {/* Vehicle Management Section */}
      <h2>Add Vehicle</h2>
      <ClientForm onSubmit={addVehicle} isVehicleForm={true} vehicles={vehicles} />

      <h2 className="mt-4">Vehicles</h2>
      <ul className="list-group">
        {vehicles.map((vehicle, index) => (
          <li key={index} className="list-group-item">
            {vehicle.name} - {vehicle.regNumber} - {vehicle.fuelEfficiency} km/l
          </li>
        ))}
      </ul>

      {/* Client Management Section */}
      <h2 className="mt-4">Add Client</h2>
      <ClientForm onSubmit={addClient} isVehicleForm={false} vehicles={vehicles} />

      <h2 className="mt-4">Clients</h2>
      <ClientTable clients={clients} vehicles={vehicles} />
    </div>
  );
}

export default App;