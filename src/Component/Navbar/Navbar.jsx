import React from 'react'
import {Box, Heading , Text, Button} from '@chakra-ui/react'
import './navbar.css';
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }
  return (
    <Box className='nav-container'>
      <Link to={'/'}>
        <Heading className='logo'>EHR Dashboard</Heading>
      </Link>
      <Button mt={2} className='login' onClick={handleLogout}>Logout</Button>
    </Box>
  )
}

export default Navbar
