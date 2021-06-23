import React from 'react';

import ProfileDescription from '../../components/profile-description/profile-description.component';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';

import './profile.styles.css'

const ProfilePage = () => {
  return (
    <div className='profile-wrapper'>
      <ProfilePicture></ProfilePicture>
      <ProfileDescription></ProfileDescription>
    </div>
  )
};

export default ProfilePage;