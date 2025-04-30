const Sidebar = ({ steps, currentStep }) => {
  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Progreso del diseño</h3>
      <nav>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step.id}>
              <div className="flex items-center">
                <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index + 1}
                </span>
                <span className={`ml-3 text-sm font-medium ${currentStep >= index ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Sidebar;