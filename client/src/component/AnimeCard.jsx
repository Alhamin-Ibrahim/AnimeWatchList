import React, {useState} from 'react'
import { Box, Image, Heading, Text, HStack, Button, useDisclosure, 
VStack, Input, ModalFooter, Modal, ModalBody, ModalOverlay, ModalContent, 
ModalHeader, ModalCloseButton } from '@chakra-ui/react'
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import userStore from '../store/userStore';

const AnimeCard = ({anime}) => {
  const {deleteFromWatchList, updateAnime} = userStore()
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleDeleteAnime = async (id) => {
    await deleteFromWatchList(id)
  }

  const [updatedAnime, setUpdatedAnime] = useState(anime);
  const handleUpdate = async(id, updatedAnime) => {
    await updateAnime(id, updatedAnime);
    onClose();
  }

  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    bg="gray.800"
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    >
        <Image src={anime.image} alt={anime.title} h={48} w='full' objectFit='cover'/>
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
            {anime.title}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={"gray.600"} mb={4}>
            {anime.episodewatched}
        </Text>
        <Text fontWeight='bold' fontSize='xl' color={"gray.600"} mb={4}>
            {anime.status}
        </Text>

        <HStack spacing={2}>
            <Link>
              <Button bg="gray.700" color="white" onClick={onOpen}>
              <FaEdit fontSize={20}/>
              </Button>
            </Link>
            <Link>
              <Button bg="gray.700" color="white" onClick={() => handleDeleteAnime(anime._id)}>
              <FaTrash fontSize={20}/>
              </Button>
            </Link>
        </HStack>

      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>

        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Update Anime</ModalHeader>
          <ModalCloseButton/>
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Anime Name"
              name = 'title'
              value={updatedAnime.title}
              onChange={(e) => setUpdatedAnime({...updatedAnime, title: e.target.value})}
              />
              <Input
              placeholder="Episode Number"
              name = 'episodewatched'
              type='number'
              value={updatedAnime.episodewatched}
              onChange={(e) => setUpdatedAnime({...updatedAnime, episodewatched: e.target.value})}
              />
              <Input
                placeholder="Watching, Completed, Planning to Watch, Dropped"
                name = 'status'
                value={updatedAnime.status}
                onChange={(e) => setUpdatedAnime({...updatedAnime, status: e.target.value})}
              />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(anime._id, updatedAnime)}>
            Update
          </Button>
          <Button colorScheme='ghost' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default AnimeCard;
