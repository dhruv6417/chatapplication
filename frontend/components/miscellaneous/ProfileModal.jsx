import { ViewIcon } from "@chakra-ui/icons";
import { FiEye } from 'react-icons/fi';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<FiEye />} onClick={onOpen} />

      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="24px"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            color="teal.500"
            textAlign={"center"}
          >
            {(user.name)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" alignItems="center" justifyContent="center" p={4}>
              <Text fontSize="20px" fontFamily="Arial, sans-serif" color="gray.500">
                Email: {user.email}
              </Text>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
                my={4}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="center" w="100%">
              <Button colorScheme="teal" onClick={onClose} w="120px">
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
