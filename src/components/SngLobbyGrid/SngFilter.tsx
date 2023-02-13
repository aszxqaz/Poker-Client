import { Box, Checkbox, Flex, Modal, ModalOverlay, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks/useStorage'
import { Tourney } from '../../types'
import { Speed } from '../../types/misc'
import { FilterOption, FilterSelect } from '../FilterSelect/FilterSelect'
// import './hack.module.css'

type SngLobbyFilterProps = {
  tourneys: Tourney[]
  setFiltered: (tourneys: Tourney[]) => void
}

const buyinOptions = [
  { value: 'Micro', description: '$0.01 - $4.99', compval: [1, 500] },
  { value: 'Low', description: '$5.00 - $9.99', compval: [500, 1000] },
  { value: 'Medium', description: '$10.00 - $24.99', compval: [1000, 2500] },
  { value: 'High', description: '$25.00 and higher', compval: [2500, 9999999] },
]

const countOptions = [
  { value: 'Heads Up', description: 'Heads Up', compval: 2 },
  { value: '3-max', description: '3-max', compval: 3 },
  { value: '6-max', description: '6-max', compval: 6 },
]

const speedOptions = [
  { value: 'Regular', description: 'Regular', compval: 'REGULAR' as const },
  { value: 'Turbo', description: 'Turbo', compval: 'TURBO' as const },
  { value: 'Hyper', description: 'Hyper', compval: 'HYPER' as const },
  { value: 'Ultra', description: 'Ultra', compval: 'ULTRA' as const },
]

export const SngLobbyFilter: React.FC<SngLobbyFilterProps> = ({ tourneys, setFiltered }) => {
  const [buyinFilters, setBuyinFilters] = useLocalStorage('sng-filter/buyin', buyinOptions)
  const [countFilters, setCountFilters] = useLocalStorage('sng-filter/count', countOptions)
  const [speedFilters, setSpeedFilters] = useLocalStorage('sng-filter/speed', speedOptions)

  const buyinFn = (tourney: Tourney, compval: number[]) =>
    tourney.buyin >= compval[0] && tourney.buyin < compval[1]

  const tableSizeFn = (tourney: Tourney, compval: number) => tourney.tableSize === compval

  const speedFn = (tourney: Tourney, compval: Speed) => tourney.speed === compval

  const [hidePlaying, setHidePlaying] = useLocalStorage('sng-filter/hidePlaying', false)

  useEffect(() => {
    setFiltered(
      tourneys
        .filter(tourney => buyinFilters.some((filter: FilterOption) => buyinFn(tourney, filter.compval)))
        .filter(tourney => countFilters.some((filter: FilterOption) => tableSizeFn(tourney, filter.compval)))
        .filter(tourney => speedFilters.some((filter: FilterOption) => speedFn(tourney, filter.compval)))
        .filter(tourney => (hidePlaying ? tourney.state !== 'IN_PROGRESS' : true))
    )
  }, [buyinFilters, countFilters, speedFilters, hidePlaying, tourneys])

  const [isOverlayed, setIsOverlayed] = useState(false)

  return (
    <Flex gap="1rem" justifyContent="flex-end" userSelect="none" flexWrap="wrap">
      {/* <Modal isOpen={isOverlayed} onClose={() => {}} onOverlayClick={() => setIsOverlayed(false)}>
        <ModalOverlay background="blackAlpha.300"></ModalOverlay>
      </Modal> */}
      <Box alignSelf="flex-end" mr="1rem">
        <Checkbox
          isChecked={hidePlaying}
          onChange={e => {
            setHidePlaying(e.target.checked)
          }}
        >
          Hide playing
        </Checkbox>
      </Box>
      <VStack>
        <Box>Games</Box>
        <FilterSelect
          isDisabled={true}
          options={[{ value: 'NLH', description: 'NLH', compval: -1 }]}
          filters={[{ compval: -1, description: '', value: 'NLH' }]}
          onSelectChange={() => {}}
          setIsOverlayed={setIsOverlayed}
        />
      </VStack>
      <VStack>
        <Box>Stakes</Box>
        <FilterSelect
          setIsOverlayed={setIsOverlayed}
          options={buyinOptions}
          filters={buyinFilters}
          onSelectChange={setBuyinFilters}
        />
      </VStack>
      <VStack>
        <Box>Table size</Box>
        <FilterSelect
          setIsOverlayed={setIsOverlayed}
          options={countOptions}
          filters={countFilters}
          onSelectChange={setCountFilters}
        />
      </VStack>
      <VStack>
        <Box>Tournament speed</Box>
        <div>
          <FilterSelect
            setIsOverlayed={setIsOverlayed}
            options={speedOptions}
            filters={speedFilters}
            onSelectChange={setSpeedFilters}
          />
        </div>
      </VStack>
    </Flex>
  )
}
