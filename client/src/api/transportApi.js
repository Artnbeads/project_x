const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Vehicle endpoints
  getVehicles: () => fetch(`${API_BASE}/vehicles`).then(res => res.json()),
  addVehicle: (data) => fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),

  // Client endpoints
  getClients: () => fetch(`${API_BASE}/clients`).then(res => res.json()),
  addClient: (data) => fetch(`${API_BASE}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
};