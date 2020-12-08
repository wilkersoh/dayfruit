import EditFruitForm from "./EditFruitForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/core";

function EditFruitModal({ children, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color='black'>
          <ModalHeader>Edit Fruit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditFruitForm {...props} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditFruitModal;
