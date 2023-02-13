import { CopyIcon } from '@chakra-ui/icons'
import {
  Box, Button, Flex, Heading, Spinner, Text, Tooltip, useToast, VStack
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useCheckPayment, useGetWallet } from '../../api/cashier'
import { SpringIn } from '../../components/Animation/SpringIn'
import { formatBalance } from '../../utils/format'
import { useUserContext } from '../../contexts/UserContext'

export const Cashier = () => {
  const { user, balance } = useUserContext()
  const toast = useToast()
  const { data, getWallet, isLoading: isGetWalletLoading } = useGetWallet()
  const { checkPayment, isFetching: isCheckPaymentLoading } = useCheckPayment()

  return (
    <SpringIn direction='to-left'>
      <VStack flexGrow={1} justifyContent="center" gap="3rem">
        <Heading as="div" mb="3rem" textAlign="center">
          Cashier
        </Heading>

        <Text as="div" fontSize="2xl" mb="2rem">
          Balance:{' '}
          {balance ? (
            <Text as="span" color="green.300">
              {formatBalance(balance?.usd)}
            </Text>
          ) : null}
        </Text>

        <VStack h="20rem">
          {data?.wallet.address ? (
            <>
              <Box mb="2rem">
                <Text textAlign="center" mb="0.5rem">
                  Your deposit wallet address is:
                </Text>
                <Tooltip label="Copy" fontSize="xl" hasArrow arrowSize={15} placement="right" px="1rem">
                  <Flex
                    gap="0.3rem"
                    borderRadius="var(--chakra-radii-md)"
                    _hover={{ bgColor: 'rgba(99, 179, 237, 0.05)' }}
                    border="1px"
                    borderColor="blue.800"
                    p="1.5rem 1rem"
                    cursor="pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(data?.wallet.address)
                      toast({
                        title: 'Copied.',
                        status: 'success',
                        duration: 1000,
                        position: 'bottom-right',
                      })
                    }}
                  >
                    <Text as="span" color="blue.300">
                      {data?.wallet.address}
                    </Text>
                    <CopyIcon />
                  </Flex>
                </Tooltip>
              </Box>
              <Text>Transfer the funds and then click to check the payment</Text>

              <Button
                isDisabled={isCheckPaymentLoading}
                isLoading={isCheckPaymentLoading}
                onClick={checkPayment}
              >
                Check the payment
              </Button>
            </>
          ) : (
            <Spinner />
          )}
        </VStack>
      </VStack>
    </SpringIn>
  )
}
