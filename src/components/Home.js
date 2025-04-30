import Button from './Button';

const Home = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Diseña tu sistema de iluminación solar</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Logike Intellectus Lumex te ayuda a crear proyectos de iluminación exterior eficientes y sostenibles.
      </p>
      <Button 
        onClick={() => onNavigate('design')}
        variant="primary"
        className="text-lg px-8 py-3"
      >
        Comenzar diseño
      </Button>
    </div>
  );
};

export default Home;