import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  useToast,
  Button,
  Box,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { apiUrls } from "../../apiUrls";
import axios from "../../utils/interceptor";
import { useNavigate } from "react-router-dom";
import { userProvider } from "../../store/provider/userProvider";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
}

const SignUp = (): JSX.Element => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { setUserDetails } = userProvider();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
  };

  const handleProfilePictureUpload = async (event: React.FormEvent) => {
    try {
      setLoading(true);
      const payloadFormData = new FormData();
      payloadFormData.append(
        "file",
        (event.target as HTMLFormElement).files[0]
      );
      payloadFormData.append("cloud_name", "dzmtfzd14");
      payloadFormData.append("upload_preset", "full-stack-chat");

      const { data } = await axios.post(
        apiUrls.UPLOAD_PROFILE_PICTURE,
        payloadFormData
      );
      setFormData({ ...formData, profilePicture: data?.url });
    } catch (e) {
      toast({
        title: "Error",
        description: "error while uploading profile picture",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.error("error while uploading profile picture", e);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    const { name, email, password, confirmPassword, profilePicture } = {
      ...formData,
    };
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all the fileds",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password and confirm password doesn't match",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const { data } = await axios.post(apiUrls.USER_REGISTER, {
        name,
        email,
        password,
        profilePicture,
      });

      if (data.success) {
        const token = data && data.token;
        const userDetails = {
          name: data.data.name,
          email: data.data.email,
          userId: data.data.userId,
          profilePicture: data.data?.profilePicture,
        };

        localStorage.setItem("authToken", token);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        setUserDetails(userDetails);

        navigate("/inbox");
      } else {
        toast({
          title: "Error",
          description: "User already exists",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    } catch (e) {
      console.error("error while registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <Box mb={2}>
          <FormControl isRequired={true}>
            <FormLabel>Full name</FormLabel>
            <Input
              type="name"
              autoComplete={"off"}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        {/* email */}
        <Box mb={2}>
          <FormControl isRequired={true}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              autoComplete={"off"}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        {/* password */}
        <Box mb={2}>
          <FormControl isRequired={true}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                autoComplete={"off"}
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={(): void => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        {/* confirm password */}
        <Box mb={2}>
          <FormControl isRequired={true}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                autoComplete={"off"}
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={(): void => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        {/* profile picture */}
        <Box mb={2}>
          <FormControl>
            <FormLabel>Upload Profile Picture</FormLabel>
            <InputGroup>
              <Input
                type="file"
                accept="image/*"
                autoComplete={"off"}
                name="profilePicture"
                onChange={handleProfilePictureUpload}
              />
            </InputGroup>
          </FormControl>
        </Box>

        <Box mt={10}>
          <Button
            width={"100%"}
            onClick={handleSubmit}
            size="md"
            colorScheme="green"
            isLoading={loading}
          >
            {"Sign Up"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
