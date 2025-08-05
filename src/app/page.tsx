import dynamic from 'next/dynamic';

const CatalogPage = dynamic(() => import('@/components/CatalogPage'), {
  ssr: false,
});

export default function HomePage() {
  return <CatalogPage />;
}
