import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ClientProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : '');
  const [newLastName, setNewLastName] = useState(user ? user.lastName : '');
  const [newEmail, setNewEmail] = useState(user ? user.email : '');
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user && user.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('lastName', newLastName);
      formData.append('email', newEmail);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await fetch(`/api/metadata/${user.user_id}/profile`, {
        method: 'PUT',
        body: formData,
      });
      console.log(formData);
      if (!response.ok) {
        throw new Error('Failed to save profile changes');
      }

      console.log('Профиль успешно обновлен');
      toast("Профиль успешно обновлен");
      setEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error.message);
      toast("Ошибка при сохранении профиля");
    }
  };

 

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md m-5">
      <h2 className="text-green-700 text-2xl font-semibold mb-5">Client Profile</h2>
    
        <>
          <p className="text-green-900 mb-3">Name: {user && user.name}</p>
          <p className="text-green-900 mb-3">Nachname: {user && user.lastName}</p>
          <p className="text-green-900 mb-3">Email: {user && user.email}</p>
   
       
      
        </>
      

     
    </div>
  );
};

export default ClientProfile;
