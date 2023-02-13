import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalProps
} from '@chakra-ui/react'
import { Tourney } from '../../types'
import { SngInfo } from '../../scenes/TourneyInfo/SngInfo'

type SngInfoModalProps = {
  tourney: Tourney
  onClose: () => void
} & Omit<ModalProps, 'children'>

export const SngInfoModal: React.FC<SngInfoModalProps> = ({ tourney, isOpen, onClose, ...rest }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} {...rest}>
      <ModalOverlay background="blackAlpha.300"></ModalOverlay>
      <ModalContent maxW="60rem" w="initial" userSelect="none">
        <ModalCloseButton size="lg" />
        <ModalBody p="2rem" color="whiteAlpha.800">
          <SngInfo tourney={tourney} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
