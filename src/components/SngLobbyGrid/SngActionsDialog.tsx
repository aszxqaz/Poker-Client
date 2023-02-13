import { Modal, ModalOverlay, ModalContent, Button, Tooltip } from '@chakra-ui/react'
import React, { MutableRefObject } from 'react'
import { DialogButton } from '../Lobby/DialogButton'

type SngActionsDialogProps = {
  isOpen: boolean
  isDisabled: boolean
  onClose: () => void
  pointerPos: MutableRefObject<{ left: number; top: number }>
  onInfoOpen: () => void
  isRegistered?: boolean
  isActionable?: boolean
  onRegister: () => void
  onUnregister: () => void
}

export const SngActionsDialog: React.FC<SngActionsDialogProps> = ({
  isOpen,
  isDisabled,
  onClose,
  pointerPos,
  isRegistered,
  isActionable,
  onInfoOpen,
  onRegister,
  onUnregister,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
      <ModalOverlay background="blackAlpha.300" />
      <ModalContent
        transform={`translate(calc(${pointerPos.current.left}px + 50%), calc(${pointerPos.current.top}px - 50%)) !important`}
        p="0.5rem"
        gap="0.2rem"
        w="fit-content"
      >
        <DialogButton onClick={onInfoOpen}>
          Open Info
        </DialogButton>
        {isActionable ? (
          <Tooltip label="Not enough funds" placement="right" isDisabled={!isDisabled}>
            <DialogButton
              colorScheme="red"
              // isLoading={isRegisterLoading}
              // isDisabled={isRegisterLoading}
              isDisabled={isDisabled}
              onClick={async () => {
                if (isRegistered) {
                  onUnregister()
                } else {
                  onRegister()
                }
                // try {
                //   const res = await register({ isRegister: !isRegisteredInClickedGame, id: clickedGameId })
                //   toast({
                //     title: res.message,
                //     status: 'success',
                //     colorScheme: 'green',
                //     duration: 2000,
                //     position: 'bottom-right',
                //   })
                // } catch (message: any) {
                //   toast({
                //     title: message as string,
                //     colorScheme: 'red',
                //     status: 'error',
                //     duration: 2000,
                //     position: 'bottom-right',
                //   })
                // } finally {
                //   setClickedGameId(null)
                //   onGameOptionsClose()
                // }
              }}
            >
              {isRegistered ? 'Unregister' : 'Register'}
            </DialogButton>
          </Tooltip>
        ) : null}
      </ModalContent>
    </Modal>
  )
}
