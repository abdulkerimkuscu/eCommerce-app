import { Text ,Button } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

function Profile() {
    const navigate = useNavigate()
  const {user, logout} = useAuth();

  const handleLogout = async () => {
    logout(()=> {navigate("../")})
  }
  return (
    <div>
      <Text fontSize={30}>Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <br /><br />
      <Button colorScheme="red" variant="solid" onClick={handleLogout}>Log Out</Button>
    </div>
  )
}

export default Profile