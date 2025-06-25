import React from 'react';
import EditProfile from '../../components/EditProfile';

const EditProfileRoute = () => {
  return (
    <div className="p-4 w-auto mx-auto overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="flex flex-col md:flex-row gap-6 items-start justify-start align-start">
        <EditProfile />
      </div>
    </div>
  );
};

export default EditProfileRoute;