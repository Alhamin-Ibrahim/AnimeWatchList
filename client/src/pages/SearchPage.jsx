import { Container, Input, VStack, HStack, Select, Flex, SimpleGrid } from '@chakra-ui/react'
import React, {useCallback, useEffect, useState} from 'react'
import debounce from "lodash.debounce";
import SearchCard from '../component/SearchCard';

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [AnimeList, setAnimeList] = useState()
  const [orderBy, setOrderBy] = useState("popularity");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState("10");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("asc")

  const handleSearch = async (query) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=${show}&order_by=${orderBy}&genres=${genre}&sort=${sort}&status=${status}`)
    const data = await res.json();
    setAnimeList(data.data)
  }

  const debounceSearch = useCallback(
    debounce((query) => {
      handleSearch(query);
    }, 500),
    [show, orderBy, genre, sort]
  )
  
  useEffect(() => {
    debounceSearch(search)
    return () => {
      debounceSearch.cancel()
    };
  }, [search, debounceSearch])

  useEffect(() => {
    handleSearch(search)
  }, [status, orderBy, genre, sort ,show])

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
      <Input
        placeholder="Search"
        name = 'title'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Flex
      h={16} 
      alignItems={"center"} 
      justifyContent={"flex-start"}
      flexDir={{
          base:"column",
          sm:"row"
      }}
      >
      <HStack spacing={4} alignItems={'center'}>
      <Select placeholder={`Sort by: ${orderBy}`} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
        <option value='popularity'>Popularity</option>
      </Select>
      <Select placeholder={`Status: ${status}`} value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value='airing'>airing</option>
        <option value='complete'>complete</option>
        <option value='upcoming'>upcoming</option>
      </Select>
      <Select placeholder={`Show: ${show}`} value={show} onChange={(e) => setShow(e.target.value)}>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='25'>25</option>
      </Select>
      <Select placeholder={`Genre: ${genre}`} value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value='1'>Action</option>
        <option value='2'>Adventure</option>
        <option value='4'>Comedy</option>
        <option value='8'>Drama</option>
        <option value='10'>Fantasy</option>
        <option value='14'>Horror</option>
        <option value='22'>Romance</option>
        <option value='24'>Sci-Fi</option>
        <option value='36'>Slice of Life</option>
        <option value='37'>Supernatural</option>
        <option value='7'>Mystery</option>
      </Select>
      <Select placeholder={`Show: ${sort}`} value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value='asc'>Ascending</option>
        <option value='desc'>Descending</option>
      </Select>
      </HStack>
      </Flex>
      <SimpleGrid
        columns={{
          base: 2,
          md:3,
          lg:4,
        }}
        spacing={10}
        w={"full"}
        >
          {[...new Map(
            AnimeList?.filter(anime => anime && anime.mal_id).map(anime => [anime.mal_id, anime])
              )].map(([id, anime]) => (
            <SearchCard key={id} anime={anime} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default SearchPage
