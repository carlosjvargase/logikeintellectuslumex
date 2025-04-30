const Header = ({ onNavigate }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Logike Intellectus Lumex</h1>
        <nav className="flex space-x-4">
          <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-blue-500">Inicio</button>
          <button onClick={() => onNavigate('design')} className="text-gray-600 hover:text-blue-500">Diseñar</button>
          <button onClick={() => onNavigate('auth')} className="text-gray-600 hover:text-blue-500">Acceder</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;