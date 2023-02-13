import { Box, Checkbox, Flex, Modal, ModalOverlay, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks/useStorage'
import { CashTable } from '../../types'
import { FilterOption, FilterSelect } from '../FilterSelect/FilterSelect'
import './hack.module.css'

type CashTablesFilterProps = {
  tables: CashTable[]
  setFiltered: (tables: CashTable[]) => void
}

export const CashTablesFilter: React.FC<CashTablesFilterProps> = ({ tables, setFiltered }) => {
  // FILTER OPTIONS
  const stakesOptions = [
    { value: 'Micro', description: '$0.01 / $0.02 - $0.02 / $0.04', compval: [2, 4] },
    { value: 'Low', description: '$0.05 / $0.10 - $0.10 / $0.20', compval: [10, 20] },
    { value: 'Medium', description: '$0.25 / $0.50 - $0.50 / $1.00', compval: [50, 100] },
    { value: 'High', description: '$2.50 / $5.00 and higher', compval: [250, 9999999] },
  ]
  const stakeFn = (table: CashTable, filterValue: number[]) =>
    table.bb >= filterValue[0] && table.bb <= filterValue[1]

  const [stakesFilters, setStakesFilters] = useLocalStorage('filter/stakes', stakesOptions)

  const tableSizeOptions = [
    { value: 'Heads Up', description: 'Heads Up', compval: 2 },
    { value: '3-max', description: '3-max', compval: 3 },
    { value: '6-max', description: '6-max', compval: 6 },
  ]
  const [tableSizeFilters, settableSizeFilters] = useLocalStorage('filter/tableSize', tableSizeOptions)
  const tableSizeFn = (table: CashTable, filterValue: number) => table.tableSize === filterValue

  const stackOptions = [
    { value: '20 BB', description: '20 BB', compval: 20 },
    { value: '100 BB', description: '100 BB', compval: 100 },
  ]
  const [stackFilters, setStackFilters] = useLocalStorage('filter/stack', stackOptions)
  const stackFn = (table: CashTable, filterValue: number) => table.stack === filterValue

  const [hideEmpty, setHideEmpty] = useLocalStorage('filter/hideEmpty', false)
  const [hideFull, setHideFull] = useLocalStorage('filter/hideFull', false)

  useEffect(() => {
    setFiltered(
      tables
        .filter(table =>
          stakesFilters.some((stakeFilter: FilterOption) => stakeFn(table, stakeFilter.compval))
        )
        .filter(table =>
          tableSizeFilters.some((tableSizeFilter: FilterOption) =>
            tableSizeFn(table, tableSizeFilter.compval)
          )
        )
        .filter(table =>
          stackFilters.some((stackFilter: FilterOption) => stackFn(table, stackFilter.compval))
        )
        .filter(table => (hideEmpty ? table.players.length : true))
        .filter(table => (hideFull ? table.players.length < table.tableSize : true))
    )
  }, [stakesFilters, tableSizeFilters, stackFilters, hideEmpty, hideFull, tables])

  const [isOverlayed, setIsOverlayed] = useState(false)

  return (
    <Flex gap="1em" justifyContent="flex-end" flexWrap="wrap">
      <Modal isOpen={isOverlayed} onClose={() => {}} onOverlayClick={() => setIsOverlayed(false)}>
        <ModalOverlay background="blackAlpha.300"></ModalOverlay>
      </Modal>
      <Box alignSelf="flex-end" mr="1em">
        <Checkbox
          isChecked={hideEmpty}
          onChange={e => {
            setHideEmpty(e.target.checked)
          }}
          sx={{ '>span': {
            fontSize: '1em'
          }}}
        >
          Hide empty
        </Checkbox>
      </Box>
      <Box alignSelf="flex-end" mr="3em">
        <Checkbox
          isChecked={hideFull}
          onChange={e => {
            setHideFull(e.target.checked)
          }}
          sx={{ '>span': {
            fontSize: '1em'
          }}}
        >
          Hide full
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
          options={stakesOptions}
          filters={stakesFilters}
          onSelectChange={setStakesFilters}
        />
      </VStack>
      <VStack>
        <Box>Max players</Box>
        <FilterSelect
          setIsOverlayed={setIsOverlayed}
          options={tableSizeOptions}
          filters={tableSizeFilters}
          onSelectChange={settableSizeFilters}
        />
      </VStack>
      <VStack>
        <Box>Start stack</Box>
        <div>
          <FilterSelect
            setIsOverlayed={setIsOverlayed}
            options={stackOptions}
            filters={stackFilters}
            onSelectChange={setStackFilters}
          />
        </div>
      </VStack>
    </Flex>
  )
}
