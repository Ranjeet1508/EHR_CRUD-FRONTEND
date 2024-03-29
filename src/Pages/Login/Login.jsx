import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Stack,Text, Button, Flex, Heading, Box, useToast } from '@chakra-ui/react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    try {
        e.preventDefault();
        let res = await axios.post('https://ehr-crud-backend.vercel.app/ehrUser/login', {
            email:formData.email,
            password:formData.password
        })
        let token = res.data.token;
        let isUser = res.data.isUser;
        localStorage.setItem("isUser", isUser);
        localStorage.setItem("token", token);
        toast({
            title: 'Login Successfull.',
            description: "you are logged in system successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        setFormData({
            email:'',
            password:''
        })
        setTimeout(() => {
            navigate('/')
        }, 2000);
    } catch (error) {
        console.log(error)
    }    
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box className='login-container'>
        <Stack spacing={4} width={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }}>
          <Heading textAlign="center">Login</Heading>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit}>Login</Button>
          <Text>Don't have an account? <Link to='/signup'><strong>SignUp here</strong></Link></Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
