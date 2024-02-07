import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, Text, Stack, Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Details = () => {
    const [patient, setPatient] = useState(null);
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`https://brainy-crab-rugby-shirt.cyclic.app/ehrPatient/patients/${id}`);
                setPatient(response.data.patient);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        fetchPatient();
    }, [id]);

    useEffect(() => {
        console.log(patient);
        setPatient(patient)
    }, [patient]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://brainy-crab-rugby-shirt.cyclic.app/ehrPatient/deletePatients/${id}`);
            toast({
                title: "Patient deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        catch (error) {
            console.error('Error deleting patient:', error);
            toast({
                title: "Error deleting patient",
                description: "An error occurred while deleting the patient. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex justifyContent="center" alignItems="center" height="70vh">
            <Box className='patient-details-container' w={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }}>
                <Stack spacing={8}>
                    <Heading textAlign="center" mb={4}>Patient Details</Heading>
                    {patient && (
                        <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                            <Heading as="h3" size="md" mb={2}>{patient.name}</Heading>
                            <Text fontSize="lg" mb={2}><strong>Age:</strong> {patient.age}</Text>
                            <Text fontSize="lg" mb={2}><strong>Gender:</strong> {patient.gender}</Text>
                            <Text fontSize="lg" mb={2}><strong>Contact Number:</strong> {patient.contact_number}</Text>
                            <Text fontSize="lg" mb={2}><strong>Address:</strong> {patient.address}</Text>
                            <Text fontSize="lg" mb={2}><strong>Medical History:</strong> {patient.medical_history ? 'Yes' : 'No'}</Text>
                            <Text fontSize="lg"><strong>Doctor Assigned:</strong> {patient.doctor_assigned}</Text>
                            <ButtonGroup spacing='5' mt={'2rem'}>
                                <Button variant='solid' colorScheme='blue' onClick={() => navigate(`/updatePatient/${id}`)}>
                                    Update Details
                                </Button>

                                <Button variant='solid' colorScheme='red' onClick={handleDelete}>
                                    Delete Details
                                </Button>
                            </ButtonGroup>
                        </Box>
                    )}
                </Stack>
            </Box>
        </Flex>
    );
};

export default Details;
