import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Grid,
  Image,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const UserCard = ({ user, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  // Delete User Alert Dialog
  const handleDelete = () => {
    onDelete(user.id);
    setIsOpen(false);
  };

  return (
    <>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={2}>
        {/* Header Grid */}
        <Grid
          templateColumns="80px 1.2fr 1.2fr 2fr 1.5fr 1.5fr 0.5fr"
          gap={4}
          alignItems="center"
        >
          <Image
            boxSize="50px"
            borderRadius="full"
            src={user.image}
            fallbackSrc="https://www.w3schools.com/howto/img_avatar.png"
            alt={`${user.firstName} ${user.lastName}`}
          />
          <Text textAlign="center">
            {user.firstName} {user.lastName}
          </Text>
          <Text textAlign="center">{user.phone || "N/A"}</Text>
          <Text textAlign="center">{user.email || "N/A"}</Text>
          <Text textAlign="center">{user.company?.name || "N/A"}</Text>
          <Text textAlign="center">{user.address?.country || "N/A"}</Text>
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="outline"
            onClick={() => setIsOpen(true)}
            aria-label="Delete user"
          />
        </Grid>
      </Box>

      {/* Alert Dialog for Delete User */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              alignSelf="center"
            >
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody alignSelf="center">
              Are you sure you want to delete {user?.firstName}?
            </AlertDialogBody>

            <AlertDialogFooter alignSelf="center">
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserCard;
