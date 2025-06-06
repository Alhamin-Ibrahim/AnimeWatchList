import { Box, Image, Heading, Text, ModalFooter, Modal, ModalBody, ModalOverlay, ModalContent, 
ModalHeader, ModalCloseButton, useDisclosure, VStack, Input, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import userStore from '../store/userStore';

const SearchCard = ({anime}) => {
    const {addAnimeSearch} = userStore()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const addAnime = async(id, anime) => {
        await addAnimeSearch(id, anime);
        onClose();
      }
  return (
    <>
    <Link onClick={onOpen}>
          <Box
              shadow='lg'
              rounded='lg'
              overflow='hidden'
              transition='all 0.3s'
              _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
          >
              <Image src={anime.images.jpg.image_url} alt={anime.title_english} h={48} w='full' objectFit='cover' />
              <Box p={4}>
                  <Heading as='h3' size='md' mb={2}>
                      {anime.title_english || anime.title}
                  </Heading>

                  <Text fontWeight='bold' fontSize='xl' color={"gray.600"} mb={4}>
                      {anime.episodes}
                  </Text>
                  <Text fontWeight='bold' fontSize='xl' color={"gray.600"} mb={4}>
                      {anime.status}
                  </Text>
              </Box>
          </Box>
      </Link><Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />

              <ModalContent bg="gray.800" color="white">
                  <ModalHeader>Description</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <VStack spacing={4}>
                        <Text fontWeight='bold' fontSize='xl' color={"white"} mb={4}>
                            {anime.title_english || anime.title}
                        </Text>
                        <Text fontWeight='bold' fontSize='xl' color={"white"} mb={4}>
                            {"Episodes: " + anime.episodes}
                        </Text>
                        <Text fontWeight='bold' fontSize='xl' color={"white"} mb={4}>
                            {anime.synopsis}
                        </Text>
                      </VStack>
                  </ModalBody>

                  <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={() => addAnime(anime._id, anime)}>
                          Add
                      </Button>
                      <Button colorScheme='ghost' onClick={onClose}>
                          Cancel
                      </Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
    </>
  )
}

export default SearchCard
