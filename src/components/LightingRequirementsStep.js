import { useState } from 'react';
import Button from './Button';

const LightingRequirementsStep = ({ formData, updateFormData, onNext, onBack }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      lighting: {
        ...formData.lighting,
        [name]: name === 'pattern' ? value : Number(value)
      }
    });
  };

  const validate = () => {
    if (!formData.lighting?.level) {
      setError('Por favor selecciona un nivel de iluminación');
      return false;
    }

    if (!formData.lighting?.hours || formData.lighting.hours < 1 || formData.lighting.hours > 24) {
      setError('Las horas deben estar entre 1 y 24');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900">Requisitos de iluminación</h3>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nivel de iluminación (lux)</label>
        <select
          id="level"
          name="level"
          value={formData.lighting?.level || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecciona un nivel</option>
          <option value="10">Bajo (10 lux)</option>
          <option value="50">Medio (50 lux)</option>
          <option value="100">Alto (100 lux)</option>
        </select>
      </div>

      <div>
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Horas diarias de funcionamiento</label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={formData.lighting?.hours || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          min="1"
          max="24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Patrón de iluminación</label>
        <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { value: 'uniform', label: 'Uniforme' },
            { value: 'spot', label: 'Puntual' },
            { value: 'security', label: 'Seguridad' }
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="pattern"
                value={value}
                checked={formData.lighting?.pattern === value}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
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

export default LightingRequirementsStep;