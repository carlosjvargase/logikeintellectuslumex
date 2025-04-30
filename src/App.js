import { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import DesignForm from './components/DesignForm';
import Results from './components/Results';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [projectData, setProjectData] = useState(null);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'auth':
        return <Auth onNavigate={setCurrentView} />;
      case 'design':
        return <DesignForm onNavigate={setCurrentView} setProjectData={setProjectData} />;
      case 'results':
        return <Results 
          projectData={projectData || {
            projectName: 'Proyecto de ejemplo',
            location: 'Ciudad Ejemplo',
            areaSize: '100',
            luminaires: [{}, {}, {}],
            panels: [{}],
            batteries: [{}]
          }} 
          onNavigate={setCurrentView}
        />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;