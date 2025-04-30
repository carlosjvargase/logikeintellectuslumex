import Button from './Button';

const Results = ({ projectData, onNavigate }) => {
  const suggestedComponents = {
    luminaires: [
      { name: 'Luminaria Solar LED 20W', quantity: 4, price: 120000 },
      { name: 'Poste Solar 3m', quantity: 4, price: 180000 }
    ],
    panels: [
      { name: 'Panel Solar 100W', quantity: 2, price: 300000 }
    ],
    batteries: [
      { name: 'Batería Gel 12V 100Ah', quantity: 1, price: 450000 }
    ]
  };

  const totalCost = suggestedComponents.luminaires.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                   suggestedComponents.panels.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                   suggestedComponents.batteries.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const systemSummary = {
    autonomy: '3 días sin sol',
    lifespan: '5-7 años',
    savings: '$1.2M anuales vs red eléctrica'
  };

  const handleSave = () => {
    console.log('Guardando en Supabase:', projectData);
    alert('Proyecto guardado exitosamente');
  };

  const handleGeneratePDF = () => {
    console.log('Generando PDF...');
    alert('PDF generado (simulado)');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Resultados del diseño</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Resumen del proyecto</h3>
          <p className="text-gray-600"><span className="font-medium">Nombre:</span> {projectData.projectName || 'Sin nombre'}</p>
          <p className="text-gray-600"><span className="font-medium">Ubicación:</span> {projectData.location?.address || 'No especificada'}</p>
          <p className="text-gray-600"><span className="font-medium">Área:</span> {projectData.area?.length ? `${projectData.area.length}m x ${projectData.area.width}m` : 'No especificada'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Requisitos</h3>
          <p className="text-gray-600"><span className="font-medium">Iluminación:</span> {projectData.lighting?.level || 'No'} lux</p>
          <p className="text-gray-600"><span className="font-medium">Horas/día:</span> {projectData.lighting?.hours || 'No especificadas'}</p>
          <p className="text-gray-600"><span className="font-medium">Patrón:</span> {projectData.lighting?.pattern || 'No especificado'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Resumen del sistema</h3>
          <p className="text-gray-600"><span className="font-medium">Autonomía:</span> {systemSummary.autonomy}</p>
          <p className="text-gray-600"><span className="font-medium">Vida útil:</span> {systemSummary.lifespan}</p>
          <p className="text-gray-600"><span className="font-medium">Ahorro estimado:</span> {systemSummary.savings}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-900 mb-4">Componentes sugeridos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(suggestedComponents).map(([type, items]) => (
            <div key={type} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 capitalize mb-2">{type}</h4>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {item.quantity}x {item.name} - ${item.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Diagrama de distribución</h3>
        <div className="h-64 bg-white border border-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Diagrama interactivo (simulado)</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Costo total estimado</h3>
        <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSave} variant="primary">
          Guardar proyecto
        </Button>
        <Button onClick={handleGeneratePDF} variant="secondary">
          Generar PDF
        </Button>
        <Button onClick={() => onNavigate('home')} variant="secondary">
          Nuevo proyecto
        </Button>
      </div>
    </div>
  );
};

export default Results;

// DONE