import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Input, Select, Stack, Button, Flex, Heading, Box, useToast } from '@chakra-ui/react';
import './addpatient.css';

const AddPatient = () => {
    const toast = useToast();
    const initialFormData = {
        name: '',
        age: '',
        gender: '',
        contact_number: '',
        address: '',
        medical_history: '',
        doctor_assigned: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://ehr-crud-backend.vercel.app/ehrPatient/addPatients', formData);
            console.log("Patient added successfully");
            toast({
                title: 'Patient Added.',
                description: "patient added in system successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            setFormData(initialFormData);
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <Box className='add-patient-container' w={'100%'} p={'1rem 4rem'}>
                <Stack spacing={4} width={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }}>
                    <Heading textAlign="center">Add Patient</Heading>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input type="number" name="age" value={formData.age} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Contact Number</FormLabel>
                        <Input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Medical History</FormLabel>
                        <Select name="medical_history" value={formData.medical_history} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Doctor Assigned</FormLabel>
                        <Input type="text" name="doctor_assigned" value={formData.doctor_assigned} onChange={handleChange} />
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleSubmit}>Add Patient</Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default AddPatient;
