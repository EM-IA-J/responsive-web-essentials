import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CV from '@/components/CV';

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <CV />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
