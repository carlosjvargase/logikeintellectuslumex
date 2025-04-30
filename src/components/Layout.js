import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;