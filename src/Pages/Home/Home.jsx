import React, { useEffect, useState } from 'react';
import SearchBar from '../../Component/SearchBar';
import { Box, Button, Card, CardBody, Divider, Heading, CardFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () => {
    const [allPatient, setAllPatient] = useState([]);
    const [filteredPatient, setFilteredPatient] = useState([]);

    const getAllPatientFromApi = async () => {
        try {
            let res = await axios.get('http://localhost:8080/ehrPatient/getAllPatients');
            setAllPatient(res.data.patients);
            setFilteredPatient(res.data.patients);
            console.log(allPatient)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPatientFromApi();
    }, []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredPatient(allPatient);
        } else {
            const filtered = allPatient.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredPatient(filtered);
        };

    }

    return (
        <Box p={'2rem 4rem'}>
            <SearchBar onSearch={handleSearch} />
            <Link to={'/addPatient'}>
                <Button mt={'2rem'} colorScheme='green'>Add Patient</Button>
            </Link>

            <Box className='patients-box'>
                {filteredPatient.map((patient, idx) => (
                    <Card maxW='sm' key={idx}>
                        <CardBody>
                            <Heading size='md'>{patient.name}</Heading>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link to={`patient/${patient._id}`}>
                                <Button variant='solid' colorScheme='blue'>
                                    See Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};


export default Home
