import React from 'react'
import { Menu } from '../components';

const Landing : React.FC = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center px-4 lg:px-20 py-8">
      <Menu />
    </div>
  );
}

export default Landing