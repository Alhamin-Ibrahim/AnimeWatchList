import { Container, VStack, Text, SimpleGrid, color, Box} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import userStore from '../store/userStore'
import AnimeCard from '../component/AnimeCard'

const HomePage = () => {
  const { token, user, watchlist, setWatchList} = userStore()
  useEffect(() => {
    const getWatchlist = async () => {
      const res = await fetch("/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      const data = await res.json();
      setWatchList(data.data.watchlist)
    }

    getWatchlist();
  }, [token, setWatchList])
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
        fontSize={"20"}
        fontWeight={"bold"}
        bgClip={"text"}
        textAlign={"center"}
        color={"white"}
        >
          {`Welcome ${user}`}
        </Text>
          
        <Text
        fontSize={"30"}
        fontWeight={"bold"}
        bgClip={"text"}
        textAlign={"center"}
        color={"white"}
        >
          Current Animes
        </Text>

        <SimpleGrid
        columns={{
          base: 2,
          md:3,
          lg:4
        }}
        spacing={10}
        w={"full"}
        >
          {watchlist?.filter(anime => anime && anime._id).map((anime) => (
            <AnimeCard key={anime._id} anime={anime}/>
          ))}
        </SimpleGrid>

        {watchlist.length === 0 && (
          <Text
          fontSize='x1'
          textAlign={"center"}
          fontWeight="bold"
          color="gray.500"
          >
            No animes added{" "}
            <Link to={"/add"}>
            <Text color='blue.600' as="span" _hover={{textDecoration: "underliine"}}>
              Add anime to watchlist
            </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage
