import React from 'react';

import './profile-picture.styles.css';
import image from './profilna.jpg'

const ProfilePicture = ({ avatarSrc, isAvatarToggled }) => {
  return (
    <div className='image-wrapper'>
      <img src={!isAvatarToggled ? image : avatarSrc} alt="profile" />
    </div>
  );
}

export default ProfilePicture;