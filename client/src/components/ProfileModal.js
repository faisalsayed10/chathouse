import React, { useContext } from 'react'
import { UserContext } from '../context/context'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function ProfileModal() {
  const { user } = useContext(UserContext)
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        fontSize={["sm", "md"]}
        padding={["12px", "17px"]}
        onClick={onOpen}
        colorScheme="green"
      >
        Profile
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxH="70vh" overflowY="auto" className="custom-scroll">
          <ModalHeader>Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="h2">
              <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
              {user?.userName}
            </Text>
            <Text as="h2">
              <span style={{ fontWeight: "bold" }}>Email:</span> {user?.email}
            </Text>
            <Text as="h2">
              <span style={{ fontWeight: "bold" }}>Unique Id:</span> {user?.id}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
