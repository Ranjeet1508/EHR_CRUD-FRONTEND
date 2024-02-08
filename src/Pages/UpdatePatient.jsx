import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePatient = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact_number: '',
    address: '',
    medical_history: '',
    doctor_assigned: ''
  });
  const toast = useToast();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://ehr-crud-backend.vercel.app/ehrPatient/patients/${id}`);
        setFormData(response.data.patient);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id]);

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
      await axios.put(`https://ehr-crud-backend.vercel.app/ehrPatient/updatePatients/${id}`, formData);
      toast({
        title: "Patient updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/patient/${id}`)
    } catch (error) {
      console.error('Error updating patient:', error);
      toast({
        title: "Error updating patient",
        description: "An error occurred while updating the patient. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box className='update-patient-container' w={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }}>
        <Heading textAlign="center" mb={8}>Update Patient</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Age</FormLabel>
            <Input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Gender</FormLabel>
            <Input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Contact Number</FormLabel>
            <Input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Medical History</FormLabel>
            <Input type="text" name="medical_history" value={formData.medical_history} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Doctor Assigned</FormLabel>
            <Input type="text" name="doctor_assigned" value={formData.doctor_assigned} onChange={handleChange} required />
          </FormControl>
          <Button colorScheme="blue" type="submit">Update Patient</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default UpdatePatient;
