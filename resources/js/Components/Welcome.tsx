import React from 'react';
import DashboardSquare from '@/Components/DashboardSquare';
import useRoute from '@/Hooks/useRoute';

const Welcome: React.FC = () => {
  const route = useRoute();

  return (
    <div className="flex flex-wrap">
      <DashboardSquare title="Magazzino" href={route('products.index')} />
      <DashboardSquare title="Terreni" href={route('lands.index')} />
      <DashboardSquare title="Collaboratori" href={route('employees.index')} />
      <DashboardSquare title="Bilancio" href={route('dashboard')} />
      <DashboardSquare title="Rivenditori" href={route('retailers.index')} />
      <DashboardSquare title="Spese" href={route('shops.index')} />
      <DashboardSquare title="Entrate" href={route('entries.index')} />
      <DashboardSquare title="Lavorazioni" href={route('works.index')} />
    </div>
  );
};

export default Welcome;