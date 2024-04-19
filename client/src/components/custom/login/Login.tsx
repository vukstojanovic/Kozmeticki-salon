import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Img,
} from "@chakra-ui/react";
import apiServices from "../../../services";
import logo from "../../../assets/logo.png";

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      const token = await apiServices.loginAdmin(values);
      if (token) {
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxW="md"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="10%"
      gap="5%"
    >
      <Img src={logo} alt="logo" h="112px" cursor="pointer" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormControl isInvalid={!!errors.username} mb={4}>
          <FormLabel htmlFor="username" color="black">
            Korisničko ime
          </FormLabel>
          <Input
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.username?.message ? errors.username.message : null}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" color="black">
            Lozinka
          </FormLabel>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
          />
          <FormErrorMessage>
            {errors.password?.message ? errors.password.message : null}
          </FormErrorMessage>
        </FormControl>

        <Button mt={8} variant="blue" isLoading={isSubmitting} type="submit">
          Prijavi se
        </Button>
      </form>
    </Container>
  );
}
