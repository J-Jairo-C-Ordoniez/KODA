import Header from '../../../../components/structure/header/Header';
import Footer from '../../../../components/structure/footer/Footer';
import ProductDetail from '../../../../components/structure/product/ProductDetail';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  return (
    <>
      <Header />
      <ProductDetail variantId={id} />
      <Footer />
    </>
  );
}
