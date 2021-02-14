import React from "react";
import CommunityGuidelines from "../components/CommunityGuidelines";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function CommunityGuidelinesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        fontSize={["sm", "md"]}
        padding={["12px", "17px"]}
        onClick={onOpen}
        colorScheme="blue"
        variant="ghost"
      >
        Community Guidelines
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxH="70vh" overflowY="auto" className="custom-scroll">
          <ModalHeader>Community Guidelines</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CommunityGuidelines />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CommunityGuidelinesModal;
