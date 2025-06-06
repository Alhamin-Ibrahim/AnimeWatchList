import { useState } from "react"
import React from 'react'
import { Container, VStack, Box, Heading, Input, Button } from "@chakra-ui/react";
import userStore from "../store/userStore";
import { Navigate, useNavigate } from "react-router-dom";

const AddPage = () => {
  const [addAnime, setNewAnime] = useState({
    title:"",
    episodewatched:"",
    status:"",
    image:"",
  });

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { addToWatchList, token} = userStore(); 

  const handleAddAnime = async () => {

    if (!addAnime.title || !addAnime.episodewatched || !addAnime.status) {
      setError("All fields must be filled!");
      return;
    }

    try{
      setError("")
      const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${addAnime.title}&limit=1`)
      const tempdata = await temp.json()
      const imageUrl = tempdata.data[0].images.jpg.image_url;
        const addImage = {
          ...addAnime,
          image: imageUrl
        };

      setNewAnime(addImage)

      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addImage)
      })
      const data = await res.json();
      if(res.ok) {
        addToWatchList(data.anime)
        navigate('/homepage');
      }
    } catch (error){
      setError("Something went wrong")
  } 
  setNewAnime({title:"", episodewatched:"",status:"", image:""});
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack 
      spacing={8}
      >
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Add New Anime
        </Heading>

        <Box
        w={"full"}
        p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
            placeholder="Anime Name"
            name = 'title'
            value={addAnime.title}
            onChange={(e) => setNewAnime({...addAnime, title: e.target.value})}
            />
            <Input
            placeholder="Episode Number"
            name = 'episodewatched'
            type='number'
            value={addAnime.episodewatched}
            onChange={(e) => setNewAnime({...addAnime, episodewatched: e.target.value})}
            />
            <Input
            placeholder="Watching, Completed, Planning to Watch, Dropped"
            name = 'status'
            value={addAnime.status}
            onChange={(e) => setNewAnime({...addAnime, status: e.target.value})}
            />

            <Button color="blue" onClick={handleAddAnime} w="full">
              Add Anime
            </Button>
          </VStack>
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

export default AddPage;
