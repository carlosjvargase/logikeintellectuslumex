const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Logike Intellectus Lumex. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;