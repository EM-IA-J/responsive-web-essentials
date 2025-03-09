
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Portfolio from '@/components/Portfolio';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
