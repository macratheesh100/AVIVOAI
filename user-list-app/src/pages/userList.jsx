import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Flex,
  Spacer,
  Box,
  Spinner,
  Center,
  Text,
  Grid,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
} from "@chakra-ui/react";
import { fetchUsers } from "../api/userService";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import UserInputForm from "../components/AddUserForm";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    company: { name: "", title: "" },
    address: { country: "" },
    email: "",
    mobile: "",
  });
  const [cancelRef, setCancelRef] = useState();

  // load users on initially
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setSearchQuery("");
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // search user
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lower = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(lower) ||
        user.company?.name?.toLowerCase().includes(lower) ||
        user.company?.title?.toLowerCase().includes(lower) ||
        user.address?.country?.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = (id) => {
    const updated = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(updated);
  };

  const handleAddUserOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddUserClose = () => {
    setNewUserData({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      companyName: "",
      companyTitle: "",
      country: "",
    });
    setAddDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // addUser
  const handleAddUserSubmit = () => {
    const newUser = {
      id: Date.now(),
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      phone: newUserData.mobile,
      company: {
        name: newUserData.companyName,
        title: newUserData.companyTitle,
      },
      address: { country: newUserData.country },
    };

    setFilteredUsers([newUser, ...filteredUsers]);
    handleAddUserClose();
  };

  return (
    <>
      <Flex mb={4} alignItems="center">
        <Box width="500px">
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        </Box>
        <Spacer />
        <Flex gap={2}>
          <Button
            onClick={handleAddUserOpen}
            colorScheme="green"
            leftIcon={<AddIcon />}
          >
            Add User
          </Button>
          <Button
            onClick={loadUsers}
            colorScheme="blue"
            leftIcon={<RepeatIcon />}
          >
            Refresh
          </Button>
        </Flex>
      </Flex>

      {loading ? (
        <Center height="60vh">
          <Spinner size="xl" />
        </Center>
      ) : filteredUsers.length === 0 ? (
        <Center height="40vh">
          <Text fontSize="xl" color="gray.500">
            No users found
          </Text>
        </Center>
      ) : (
        <>
          {filteredUsers.length > 0 && (
            <Box bg="gray.100" p={4} borderRadius="md" fontWeight="bold" mb={2}>
              <Grid
                templateColumns="80px 1.5fr 1.2fr 2fr 1.5fr 1.5fr 0.5fr"
                gap={4}
                alignItems="center"
              >
                <Text textAlign="center">Image</Text>
                <Text textAlign="center">Name</Text>
                <Text textAlign="center">Mobile</Text>
                <Text textAlign="center">Email</Text>
                <Text textAlign="center">Company</Text>
                <Text textAlign="center">Country</Text>
                <Text textAlign="center">Action</Text>
              </Grid>
            </Box>
          )}

          <Stack>
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onDelete={handleDelete} />
            ))}
          </Stack>
        </>
      )}

      <AlertDialog
        isOpen={isAddDialogOpen}
        onClose={handleAddUserClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Add a New User</AlertDialogHeader>
            <AlertDialogBody>
              <AlertDialogBody>
                <UserInputForm
                  userData={newUserData}
                  handleInputChange={handleInputChange}
                  onSubmit={handleAddUserSubmit}
                  onCancel={handleAddUserClose}
                />
              </AlertDialogBody>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserList;
