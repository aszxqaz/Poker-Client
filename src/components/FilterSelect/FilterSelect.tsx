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
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, PropsWithChildren } from 'react'
import { useModalOverlayContext } from '../../contexts/ModalOverlay/ModalOverlay'

export type FilterOption = {
  value: any
  description: string
  default?: boolean
  compval: any
}

type FilterSelectProps = {
  setIsOverlayed: Dispatch<SetStateAction<boolean>>
  options: FilterOption[]
  filters: FilterOption[]
  onSelectChange: (values: FilterOption[]) => void
} & ButtonProps

export const FilterSelect: React.FC<PropsWithChildren<FilterSelectProps>> = ({
  options,
  filters,
  onSelectChange,

  ...buttonProps
}) => {
  const { hide, show } = useModalOverlayContext()

  const isIndeterminate = filters.length < options.length && filters.length > 0
  const isAllChecked = filters.length === options.length
  const optionsValues = options.map(o => o.value)
  const filterValues = filters.map(_ => _.value)

  return (
    <Popover
      onClose={() => {
        hide()
      }}
    >
      <PopoverTrigger>
        <Button
          size="md"
          fontSize="1em"
          bgColor="whiteAlpha.50"
          variant="solid"
          display="inline-flex"
          gap="1rem"
          px="0.5em"
          w="12em"
          h="3em"
          justifyContent="space-between"
          {...buttonProps}
          onClick={() => {
            show()
          }}
        >
          <Box whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" flexGrow={0}>
            {options
              .filter(_ => filterValues.includes(_.value))
              .map(_ => _.value)
              .join(', ')}
          </Box>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent minW="10rem" w="fit-content" pb=".25rem" pt="0.4rem" px="0.5rem">
          <Box />
          <PopoverArrow />
          <PopoverBody>
            <Checkbox
              isIndeterminate={isIndeterminate}
              isChecked={isAllChecked}
              onChange={list => {
                if (filters.length === options.length) {
                  onSelectChange([options[0]])
                } else {
                  onSelectChange(options)
                }
              }}
              value="__all__"
            >
              All
            </Checkbox>
            <Divider mt="0.75rem" mb="1rem" />
            <VStack spacing={5} direction="row" alignItems="flex-start">
              {options.map(option => (
                <Checkbox
                  key={option.value}
                  // value={option.value}
                  isChecked={filterValues.includes(option.value)}
                  onChange={() => {
                    if (filters.length === 1 && filterValues[0] === option.value) {
                      onSelectChange([...options])
                    } else {
                      onSelectChange(
                        filterValues.includes(option.value)
                          ? filters.filter(_ => _.value !== option.value)
                          : [...filters, options[options.findIndex(_ => _.value === option.value)]]
                      )
                    }
                  }}
                >
                  {option.description}
                </Checkbox>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
