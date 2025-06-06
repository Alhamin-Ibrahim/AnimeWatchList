import { Container, Flex, HStack, Text, Button, Box } from '@chakra-ui/react'
import React from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

const Navbar = () => {
    const {user, setToken, setUser} = userStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        navigate('/')
    }
  return (
    <Container maxW={"1140px"} px={"4"}>
        <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}>
            <HStack spacing={2} alignItems={"center"}>
            <Text
            fontSize={{base:"22", sm:"28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            //bgClip={"text"}
            >
                <Link to={"/homepage"}>Anime WatchList</Link>
            </Text>

            </HStack>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/search"}>
                <Button bg="gray.900" color='white'>
                <FaSearch fontSize={20}/>
                </Button>
                </Link>

                <Link to={"/add"}>
                <Button bg="gray.900" color='white'>
                <FaPlusCircle fontSize={20}/>
                </Button>
                </Link>
                <Button onClick={handleLogout}bg="gray.900" color='white'>
                log out
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
