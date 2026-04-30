import Header from '../../../../../components/store/Header/Headerder';
import Footer from '../../../../../components/store/Footer/Footerter';
import ProductDetail from '../../../../components/store/product/ProductDetail';

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
