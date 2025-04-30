import { useState, useEffect } from 'react';
import Button from './Button';

const LocationStep = ({ formData, updateFormData, onNext, onBack }) => {
  const [address, setAddress] = useState(formData.location?.address || '');
  const [coordinates, setCoordinates] = useState(formData.location?.coordinates || { lat: null, lng: null });
  const [error, setError] = useState('');

  // Mock de geocodificación
  const mockGeocode = (addr) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (addr.toLowerCase().includes('bogotá')) {
          resolve({ lat: 4.6097, lng: -74.0817 });
        } else if (addr.toLowerCase().includes('medellín')) {
          resolve({ lat: 6.2442, lng: -75.5812 });
        } else {
          resolve({ lat: Math.random() * 2 + 4, lng: Math.random() * 2 - 74 });
        }
      }, 500);
    });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSearch = async () => {
    if (!address.trim()) {
      setError('Por favor ingresa una dirección');
      return;
    }

    try {
      const coords = await mockGeocode(address);
      setCoordinates(coords);
      setError('');
    } catch (err) {
      setError('No se pudo encontrar la ubicación. Intenta con una dirección más específica.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coordinates.lat || !coordinates.lng) {
      setError('Por favor busca y selecciona una ubicación válida');
      return;
    }

    updateFormData({
      ...formData,
      location: {
        address,
        coordinates
      }
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900">Ubicación del proyecto</h3>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Carrera 10 #12-34, Bogotá"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
        {coordinates.lat && coordinates.lng ? (
          <div className="text-center">
            <p className="text-gray-700">Mapa interactivo (simulado)</p>
            <p className="text-sm text-gray-500 mt-2">
              Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
            </p>
            <div className="mt-4 w-full h-32 bg-blue-100 border-2 border-blue-300 rounded-md flex items-center justify-center">
              <span className="text-blue-500">Área del proyecto</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Ingresa una dirección para ver el mapa</p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary">
          Anterior
        </Button>
        <Button type="submit" variant="primary">
          Siguiente
        </Button>
      </div>
    </form>
  );
};

export default LocationStep;