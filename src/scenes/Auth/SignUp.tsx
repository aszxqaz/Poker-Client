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
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useSignUpMutation } from '../../api/auth'
import { FixedHeightAuthErrorBox, FixedHeightInputErrorBox } from '../../ui/BetButton/FixedHeightBox'
import { AuthWrapper } from './AuthWrapper'

type SignUpFormValues = {
  username: string
  email: string
  password: string
  confirm: string
}

export const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false)

  const { mutate: signUp, isError, error, isLoading } = useSignUpMutation()

  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Wrong format of email'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Minimum length is 20 characters')
      .max(20, 'Maximum length is 20 characters'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at 3 char long'),
    confirm: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>(formOptions)

  const usernameRef = useRef<string>('')

  return (
    <AuthWrapper>
      <Heading textAlign="center" mb="5rem">
        Sign Up
      </Heading>

      <VStack as="form" onSubmit={handleSubmit(data => signUp(data))}>
        <FormControl isInvalid={!!errors.email?.message}>
          <Input placeholder="Email" type="email" {...register('email')} />
          <FixedHeightInputErrorBox>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FixedHeightInputErrorBox>
        </FormControl>

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

        <FormControl isInvalid={!!errors.confirm?.message}>
          <Input placeholder="Confirm password" type="password" {...register('confirm')} />
          <FixedHeightInputErrorBox>
            <FormErrorMessage>{errors.confirm?.message}</FormErrorMessage>
          </FixedHeightInputErrorBox>
        </FormControl>

        <FormControl isInvalid={isError}>
          <FixedHeightAuthErrorBox>
            <FormErrorMessage fontSize="lg">{error}</FormErrorMessage>
          </FixedHeightAuthErrorBox>
        </FormControl>

        <Button type="submit" isLoading={isLoading} isDisabled={isLoading} minW="12rem">
          Sign Up
        </Button>

        <Text textAlign="center" mt="3rem !important">
          Have an account?{' '}
          <Link as={NavLink} to="/signin">
            Sign In
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
