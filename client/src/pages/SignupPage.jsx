import React, {useState} from 'react'
import { Container, VStack, Heading, Box, Input, Button, Text } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const [user, setUser] = useState({
    username:"",
    email:"",
    password:"",
  });

  const handleSignUp = async () => {
    if (!user.username || !user.email || !user.password) {
      setError("All fields must be filled!");
      return;
    }
    setError("")
    const res = await fetch("/api/signup", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
    const data = await res.json();
    if(res.ok) {
      navigate('/');
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
          Sign up
        </Heading>
      <Input
          placeholder="Enter Username"
          name = 'username'
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
        />
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
        
          <Button color="blue" onClick={handleSignUp} w="full">
            Sign up
          </Button>
        </VStack>
        <Text color={'blue.400'}><Link to='/'>Sign in</Link></Text>
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

export default SignupPage
