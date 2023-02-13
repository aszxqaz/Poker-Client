import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  ButtonProps,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Checkbox,
  Box,
  Divider,
  VStack,
  usePopover,
  useDisclosure,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, PropsWithChildren, useRef, useEffect } from 'react'
import { useModalOverlayContext } from '../../contexts/ModalOverlay/ModalOverlay'
import { ExtractString, LobbySelectState } from '../../scenes/MobileLobby/lobbySelectReducer'
import { SelectOption } from '../../scenes/MobileLobby/Sng/useSngLobbyOptions'

type SelectProps = {
  options: { value: string | number; text: string }[]
  onSelectChange: (index: number) => void
  curIndex: number
} & ButtonProps

export const Select: React.FC<SelectProps> = ({ options, curIndex, onSelectChange, ...buttonProps }) => {
  const { onClick, ...restButtonProps } = buttonProps
  const { hide: hideOverlay, show: showOverlay } = useModalOverlayContext()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const buttonRef = useRef<HTMLButtonElement>(null)

  console.log(options)

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => {
        hideOverlay()
        onClose()
      }}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <Button
          ref={buttonRef}
          size="md"
          fontSize="1em"
          colorScheme="gray"
          // bgColor="whiteAlpha.50"
          variant="solid"
          display="inline-flex"
          gap="1rem"
          px="0.5em"
          w="100%"
          h="3em"
          justifyContent="space-between"
          onClick={e => {
            showOverlay()
            onClick?.(e)
          }}
          {...buttonProps}
        >
          <Box whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" flexGrow={0}>
            {options[curIndex].text}
          </Box>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent minW="10rem" w="fit-content" p="0">
          <Box />
          <PopoverArrow />
          <PopoverBody
            p="0"
            w={buttonRef.current ? buttonRef.current.getBoundingClientRect().width : undefined}
          >
            <VStack spacing={0} direction="row" alignItems="flex-start" p="0" gap="0">
              {options.map((option, i) => (
                <Box
                  p="0.5em 1em"
                  w="100%"
                  onClick={() => {
                    onSelectChange(i)
                    hideOverlay()
                    onClose()
                  }}
                  key={option.value}
                  bgColor={i === curIndex ? 'whiteAlpha.200' : undefined}
                  cursor="pointer"
                  _hover={{
                    bgColor: i !== curIndex ? 'whiteAlpha.100' : undefined,
                  }}
                >
                  {option.text}
                </Box>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
