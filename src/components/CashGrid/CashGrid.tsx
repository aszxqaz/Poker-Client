import {
  Box,
  Button,
  Container,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { CashTable } from '../../types'
import { formatBalance } from '../../utils/format'
import { SpringIn } from '../Animation/SpringIn'
import { Fallback } from '../Fallback/Fallback'
import { LobbyContainer } from '../Lobby/Container'
import { DialogButton } from '../Lobby/DialogButton'
import { LobbyGridBody } from '../LobbyGrid/LobbyGrid'
import { BuyinModal } from './BuyInModal'
import { CashTablesFilter } from './CashTablesFilter'
import { TableHeaderGrid } from './TableHeaderGrid'
import { TableRowGrid } from './TableRowGrid'
import { useCashLobby } from './useCashLobby'
// import { GameInfoModal } from './CashInfoModal'

type CashGridProps = {
  tables?: CashTable[]
}

export const CashGrid: React.FC<CashGridProps> = ({}) => {
  const {
    balance,
    clickedTable,
    clickedTableId,
    isJoined,
    selectedTable,
    selectedTableId,
    setClickedTableId,
    setSelectedTableId,
    tables,
    user,
    joinTable,
  } = useCashLobby()

  const [filtered, setFiltered] = useState(tables)

  useEffect(() => {
    if (!filtered.length && tables.length) setFiltered(tables)
  }, [tables])

  const initialRef = useRef(null)

  const { onOpen: onGameOptionsOpen, onClose: closeDialog, isOpen: isGameOptionsOpen } = useDisclosure()
  const { onClose: onGameInfoClose, onOpen: onGameInfoOpen, isOpen: isGameInfoOpen } = useDisclosure()
  const { onClose: onCashJoinClose, onOpen: onCashJoinOpen, isOpen: isCashJoinOpen } = useDisclosure()

  const toast = useToast()

  const pointerPos = useRef({ left: 0, top: 0 })

  const gridStyle = {
    templateColumns: '0.5fr 0.3fr 0.5fr 0.3fr 0.3fr 0.4fr 0.3fr',
    justifyItems: 'center',
    padding: '1em 0.75em',
  }

  if (!tables.length) return <Fallback h="65vh" />

  return (
    <SpringIn direction="to-right">
      <LobbyContainer>
        <CashTablesFilter tables={tables} setFiltered={setFiltered} />
        <br />
        <Box
          borderTopWidth="2px"
          borderBottomWidth="2px"
          borderLeftWidth="2px"
          borderRightWidth="2px"
          borderColor="hsl(220, 26%, 28%)"
        >
          <TableHeaderGrid setFiltered={setFiltered} />
          <LobbyGridBody>
            {filtered.length ? (
              filtered.map(table => (
                <TableRowGrid
                  key={table.id}
                  onClick={e => {
                    setClickedTableId(table.id)
                    pointerPos.current = {
                      left: e.clientX - document.documentElement.clientWidth / 2,
                      top: e.clientY - document.documentElement.clientHeight / 2,
                    }
                    onGameOptionsOpen()
                  }}
                  table={table}
                  gridProps={gridStyle}
                  isActive={table.players.findIndex(_ => _.username === user?.username) !== -1}
                  formatFn={formatBalance}
                />
              ))
            ) : (
              <Box p="1em 0.75em" textAlign="center">
                No tables to display. Change filters to see available tables.
              </Box>
            )}
          </LobbyGridBody>
        </Box>
        {clickedTable ? (
          <Modal
            isOpen={isGameOptionsOpen}
            onClose={() => {
              setSelectedTableId(null)
              setClickedTableId(null)
              closeDialog()
            }}
            isCentered
            autoFocus={false}
          >
            <ModalOverlay background="blackAlpha.300" />
            <ModalContent
              transform={`translate(calc(${pointerPos.current.left}px + 50%), calc(${pointerPos.current.top}px - 50%)) !important`}
              p="0.5em"
              gap="0.2em"
              w="fit-content"
            >
              <DialogButton
                onClick={() => {
                  setSelectedTableId(clickedTableId)
                  setClickedTableId(null)
                  closeDialog()
                  onGameInfoOpen()
                }}
              >
                Open Table
              </DialogButton>
              <DialogButton
                // isLoading={isRegisterLoading}
                // isDisabled={isRegisterLoading}
                onClick={async () => {
                  // joinCashTable(clickedGameId)
                  onCashJoinOpen()
                  closeDialog()
                }}
                colorScheme={isJoined ? "red" : "green"}
              >
                {isJoined ? 'Unjoin' : 'Join'}
              </DialogButton>
            </ModalContent>
          </Modal>
        ) : null}
        {/* {selectedGame ? (
        <CashInfoModal
          isOpen={isGameInfoOpen}
          onClose={onGameInfoClose}
          table={selectedGame}
          onOverlayClick={() => {
            setSelectedGameId(null)
            onGameInfoClose()
          }}
        />
      ) : null} */}
        {clickedTable && isCashJoinOpen ? (
          <BuyinModal
            balance={balance.usd}
            table={clickedTable}
            initialFocusRef={initialRef}
            isOpen={isCashJoinOpen}
            onClose={onCashJoinClose}
            onJoinTable={joinTable}
          />
        ) : null}
      </LobbyContainer>
    </SpringIn>
  )
}
