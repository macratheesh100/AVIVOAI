import React, { useState, useEffect } from "react";
import { Input, Button, Box, Text } from "@chakra-ui/react";

const UserInputForm = ({ userData, handleInputChange, onSubmit, onCancel }) => {
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if all fields are empty or invalid, and disable the button
    const isValid = Object.keys(userData).every((key) => userData[key]);
    setIsButtonDisabled(!isValid);
  }, [userData]);

  const handleSubmit = () => {
    if (
      !userData.email ||
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(userData.email)
    ) {
      setErrors({ email: "Valid email is required" });
      return;
    }
    setErrors({});
    onSubmit();
  };

  //clear the error for the input
  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Call the parent handler to update userData
    handleInputChange(e);
  };

  return (
    <Box>
      <Input
        placeholder="First Name"
        name="firstName"
        value={userData.firstName}
        onChange={handleInputChangeWithValidation}
        mb={5}
        pattern="[A-Za-z]*"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
        }}
      />
      {errors.firstName && (
        <Text fontSize="sm" color="red.500">
          {errors.firstName}
        </Text>
      )}

      <Input
        placeholder="Last Name"
        name="lastName"
        value={userData.lastName}
        onChange={handleInputChangeWithValidation}
        mb={5}
        pattern="[A-Za-z]*"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
        }}
      />
      {errors.lastName && (
        <Text fontSize="sm" color="red.500">
          {errors.lastName}
        </Text>
      )}

      <Input
        placeholder="Mobile Number"
        name="mobile"
        value={userData.mobile}
        onChange={handleInputChangeWithValidation}
        mb={5}
        maxLength={16}
        pattern="\+[0-9]{1,15}"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9+]/g, "");
        }}
      />
      {errors.mobile && (
        <Text fontSize="sm" color="red.500">
          {errors.mobile}
        </Text>
      )}

      <Input
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleInputChangeWithValidation}
        mb={5}
      />
      {errors.email && (
        <Text fontSize="sm" color="red.500">
          {errors.email}
        </Text>
      )}

      <Input
        placeholder="Company Name"
        name="companyName"
        value={userData.companyName}
        onChange={handleInputChangeWithValidation}
        mb={5}
        pattern="[A-Za-z]*"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
        }}
      />
      {errors.companyName && (
        <Text fontSize="sm" color="red.500">
          {errors.companyName}
        </Text>
      )}

      <Input
        placeholder="Company Title"
        name="companyTitle"
        value={userData.companyTitle}
        onChange={handleInputChangeWithValidation}
        mb={5}
        pattern="[A-Za-z]*"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
        }}
      />
      {errors.companyTitle && (
        <Text fontSize="sm" color="red.500">
          {errors.companyTitle}
        </Text>
      )}

      <Input
        placeholder="Country"
        name="country"
        value={userData.country}
        onChange={handleInputChangeWithValidation}
        mb={5}
        pattern="[A-Za-z]*"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
        }}
      />
      {errors.country && (
        <Text fontSize="sm" color="red.500">
          {errors.country}
        </Text>
      )}

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button onClick={onCancel} mr={3}>
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={isButtonDisabled}
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default UserInputForm;
