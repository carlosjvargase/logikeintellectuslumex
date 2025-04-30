import { useState } from 'react';
import Sidebar from './Sidebar';
import Button from './Button';
import AreaStep from './AreaStep';
import LightingRequirementsStep from './LightingRequirementsStep';
import LocationStep from './LocationStep';

const steps = [
  { id: 1, name: 'Área del proyecto' },
  { id: 2, name: 'Requisitos de iluminación' },
  { id: 3, name: 'Ubicación' },
  { id: 4, name: 'Configuración de paneles' },
  { id: 5, name: 'Especificación de baterías' },
  { id: 6, name: 'Revisión y confirmación' },
];

const DesignForm = ({ onNavigate, setProjectData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    projectName: '',
    location: {},
    area: {},
    lighting: {},
    panels: [],
    batteries: [],
    solarData: {}
  });

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setProjectData(formData);
      onNavigate('results');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('home');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AreaStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={handleNext} 
          onBack={handleBack} 
        />;
      case 1:
        return <LightingRequirementsStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={handleNext} 
          onBack={handleBack} 
        />;
      case 2:
        return <LocationStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={handleNext} 
          onBack={handleBack} 
        />;
      default:
        return (
          <div>
            <h3 className="text-xl font-medium text-gray-900">{steps[currentStep].name}</h3>
            <p className="mt-4 text-gray-600">Contenido pendiente...</p>
            <div className="mt-6 flex justify-between">
              <Button onClick={handleBack} variant="secondary">
                Anterior
              </Button>
              <Button onClick={handleNext} variant="primary">
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Sidebar steps={steps} currentStep={currentStep} />
      <div className="flex-grow bg-white p-6 rounded-lg shadow-sm">
        {renderStep()}
      </div>
    </div>
  );
};

export default DesignForm;