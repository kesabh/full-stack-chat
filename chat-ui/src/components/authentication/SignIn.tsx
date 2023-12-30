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

interface FormData {
  email: string;
  password: string;
}

const SignIn = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [show, setShow] = useState<boolean>(false);
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

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill all the fileds",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      const { data } = await axios.post(apiUrls.USER_LOGIN, formData);
      if (data.success) {
        const token = data.data && data.data.token;
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
          description: "Error occurred while logging in",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    } catch (e) {
      console.error("error occured while logging in ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestUserData = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    setFormData({ email: "demo9@gmail.com", password: "Demo1234" });
  };
  return (
    <form onSubmit={handleSubmit}>
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

      <Box mb={2}>
        <FormControl isRequired={true}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              autoComplete={"off"}
              type={show ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={(): void => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
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
          {"Sign In"}
        </Button>
      </Box>

      <Box mt={2}>
        <Button
          width={"100%"}
          onClick={handleGuestUserData}
          size="md"
          colorScheme="blue"
        >
          Get Guest User Credentials
        </Button>
      </Box>
    </form>
  );
};

export default SignIn;
