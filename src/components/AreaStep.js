import { useState } from 'react';

const AreaStep = ({ formData, updateFormData, onNext, onBack }) => {
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      area: {
        ...formData.area,
        [name]: name === 'type' ? value : Number(value)
      }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    if (!formData.area?.type) {
      setError('Por favor selecciona un tipo de área');
      return false;
    }

    if (formData.area.type !== 'custom' && (!formData.area?.length || !formData.area?.width)) {
      setError('Por favor ingresa largo y ancho');
      return false;
    }

    if (formData.area?.length <= 0 || formData.area?.width <= 0) {
      setError('Las dimensiones deben ser mayores a 0');
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
      <h3 className="text-xl font-medium text-gray-900">Área del proyecto</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de área</label>
        <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {['Jardín', 'Camino', 'Patio', 'Personalizado'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value={type.toLowerCase()}
                checked={formData.area?.type === type.toLowerCase()}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {formData.area?.type && formData.area.type !== 'custom' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Largo (m)</label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.area?.length || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0.1"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">Ancho (m)</label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.area?.width || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      )}

      {formData.area?.type === 'custom' && (
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción del área</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.area?.description || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Plano o croquis (opcional)</label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="py-2 px-3 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default AreaStep;