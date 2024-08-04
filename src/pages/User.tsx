import React from 'react'
import { UserForm } from '../components';


const User:React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-8 lg:px-20">
      <UserForm />
    </div>
  );
}

export default User