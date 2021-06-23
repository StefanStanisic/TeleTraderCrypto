import React from 'react';

import './profile-description.styles.css';

import userData from '../profile/user-profile';

const ProfileDescription = () => {


  return (
    <div className='content-wrapper'>
      <h1 className='title'>{userData.name}</h1>
      <p className='email'>{userData.email}</p>
      <p className='website'>{userData.website}</p>
    </div>
  )
};

export default ProfileDescription;