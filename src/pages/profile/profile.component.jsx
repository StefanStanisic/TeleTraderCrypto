import React, { useState } from 'react';

import { Button } from 'react-bootstrap';

import ProfileDescription from '../../components/profile-description/profile-description.component';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';

import './profile.styles.css'

const ProfilePage = () => {
  const [avatar, setAvatar] = useState('');
  const [isAvatarToggled, setIsAvatarToggled] = useState(false);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const toggleAvatar = () => {
    console.log(getRandomNumber(1, 100));
    setAvatar(`https://api.hello-avatar.com/adorables/${getRandomNumber(1, 100)}`);
    setIsAvatarToggled(!isAvatarToggled);
  }

  return (
    <div className='profile-wrapper'>
      <ProfilePicture avatarSrc={avatar} isAvatarToggled={isAvatarToggled}></ProfilePicture>
      <ProfileDescription></ProfileDescription>
      <Button onClick={toggleAvatar} className='toggle-button'>Toggle avatar</Button>
    </div>
  )
};

export default ProfilePage;