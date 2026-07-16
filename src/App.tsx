import { CartProvider } from './cart';
import { useRoute } from './router';
import { Header, AnnouncementBar } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductPage } from './pages/ProductPage';
import { CustomiserPage } from './pages/CustomiserPage';
import { FaqPage } from './pages/FaqPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { LogoUploadPage } from './pages/LogoUploadPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WhatsAppButton } from './components/WhatsAppButton';

function Pages() {
  const route = useRoute();

  switch (route.name) {
    case 'home': return <HomePage />;
    case 'collections': return <CollectionsPage />;
    case 'collection': return <CollectionPage slug={route.slug} />;
    case 'product': return <ProductPage slug={route.slug} />;
    case 'customiser': return <CustomiserPage />;
    case 'faq': return <FaqPage />;
    case 'reviews': return <ReviewsPage />;
    case 'logo-upload': return <LogoUploadPage />;
    case 'checkout': return <CheckoutPage />;
    default: return <HomePage />;
  }
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <Pages />
        </main>
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
