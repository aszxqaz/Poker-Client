import { Modal, ModalOverlay } from '@chakra-ui/react'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type ModalOverlayContext = {
  isOverlayed: boolean
  show: () => void
  hide: () => void
  toggle: () => void
}

const ModalOverlayContext = createContext<ModalOverlayContext>({
  isOverlayed: false,
  show: () => {},
  hide: () => {},
  toggle: () => {},
})

export const ModalOverlayProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalOverlayContext.Provider
      value={{
        isOverlayed: isOpen,
        show: () => {
          setIsOpen(true)
        },
        hide: () => {
          setIsOpen(false)
        },
        toggle: () => {
          setIsOpen(prev => !prev)
        },
      }}
    >
      <Modal isOpen={isOpen} onClose={() => {}} onOverlayClick={() => setIsOpen(false)}>
        <ModalOverlay background="blackAlpha.300"></ModalOverlay>
      </Modal>
      {children}
    </ModalOverlayContext.Provider>
  )
}

export const useModalOverlayContext = () => useContext(ModalOverlayContext)