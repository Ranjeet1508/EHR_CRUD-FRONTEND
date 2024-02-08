import React, { useState } from 'react';
import { FormControl, FormLabel, Select, Input, Stack, Button, Flex, Heading, Box, useToast } from '@chakra-ui/react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post('https://ehr-crud-backend.vercel.app/ehrUser/signup', {
                name: formData.name,
                role: formData.role,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("signup successfull");
            toast({
                title: 'Signup Successfull.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            setFormData({
                name: '',
                role: '',
                email: '',
                password: ''
            });
            setTimeout(() => {
                navigate('/login')
            },2000)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <Box className='signup-container'>
                <Stack spacing={4} width={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }}>
                    <Heading textAlign="center">Sign Up</Heading>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Select name="role" value={formData.role} onChange={handleChange}>
                            <option value="">--Select--</option>
                            <option value="doctor">Doctor</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleSubmit}>Sign Up</Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Signup;
