import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link as NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useSignInMutation } from '../../api/auth'
import { FixedHeightAuthErrorBox, FixedHeightInputErrorBox } from '../../ui/BetButton/FixedHeightBox'
import { AuthWrapper } from './AuthWrapper'

type SignInFormValues = {
  username: string
  password: string
}

export const SignIn = () => {
  const { isLoading, signIn, error, isError, data } = useSignInMutation()

  const formSchema = Yup.object().shape({
    username: Yup.string().required('Enter the username'),
    password: Yup.string().required('Password is required'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>(formOptions)

  return (
    <AuthWrapper>
      <Heading textAlign="center" mb="5rem">
        Sign In
      </Heading>

      <VStack as="form" onSubmit={handleSubmit(data => signIn(data))}>
        <FormControl isInvalid={!!errors.username?.message}>
          <Input placeholder="Username" {...register('username')} />
          <FixedHeightInputErrorBox>
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FixedHeightInputErrorBox>
        </FormControl>

        <FormControl isInvalid={!!errors.password?.message}>
          <Input placeholder="Password" type="password" {...register('password')} />
          <FixedHeightInputErrorBox>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FixedHeightInputErrorBox>
        </FormControl>

        <FormControl isInvalid={isError}>
          <FixedHeightAuthErrorBox>
            <FormErrorMessage justifyContent="center" fontSize="lg" mt="0">
              {error}
            </FormErrorMessage>
          </FixedHeightAuthErrorBox>
        </FormControl>

        <Button type="submit" isLoading={isLoading} isDisabled={isLoading} minW="12rem" mx="auto">
          Sign In
        </Button>

        <Text textAlign="center" mt="3rem !important">
          Not signed up yet?{' '}
          <Link as={NavLink} to="/signup">
            Sign Up
          </Link>
          ,<br />
          or enter as{' '}
          <Link as={NavLink} to="/signin">
            Guest
          </Link>
          .
        </Text>
      </VStack>
    </AuthWrapper>
  )
}
