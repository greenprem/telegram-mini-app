// src/app/page.tsx (or equivalent entry point)
import MainContainer from '@/components/MainContainer'; // Adjust the import path as necessary
import Header from '@/components/Header'

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
  <MainContainer />;
  </div>
  )
};

export default HomePage;
