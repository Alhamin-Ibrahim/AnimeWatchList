import React from 'react'
import { useState } from 'react'
import { Container, VStack, Heading, Box, Input, Button, Text } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import userStore from "../store/userStore";

const SigninPage = () => {

  const { setToken } = userStore();
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const handleSignIn = async () => {
    if (!user.email || !user.password) {
      setError("All fields must be filled!");
      return;
    }
    setError("")
    const res = await fetch("/api/signin", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
    const data = await res.json();
    if(res.ok) {
      setToken(data.token);
      userStore.getState().setUser(data.username);
      navigate('/homepage');
    }
    else{
      setError("Something went wrong")
    }
  }
  return (
    <Container maxW={"container.sm"}>
          <VStack 
          spacing={8}
          >
            <Text
            fontSize={{base:"22", sm:"28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            //bgClip={"text"}
            >
                Anime WatchList
            </Text>
    
            <Box
            w={"full"}
            p={6} rounded={"lg"} shadow={"md"}
            >
              <VStack spacing={4}>
                <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                  Sign in
                </Heading>
                <Input
                placeholder="Enter email"
                name = 'email'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                />
                <Input
                placeholder="Enter password"
                name = 'password'
                type='password'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                />
    
                <Button color="blue" onClick={handleSignIn}w="full">
                  Sign in
                </Button>
              </VStack>
              <Text color={'blue.400'}><Link to='/signup'>Sign up</Link></Text>
              {error && (
                <Box w="full" bg="grey.800" color="white" p={2} textAlign={'center'}>
                  {error}
                </Box>
              )}
            </Box>
          </VStack>
        </Container>
  )
}

export default SigninPage
