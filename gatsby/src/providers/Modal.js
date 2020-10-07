import React, { useState, createContext } from "react"
import PropTypes from "prop-types"

// TODO: import all modals

const ModalContext = createContext()

export const LOAD_MODAL_KEY = "load"
export const SAVE_MODAL_KEY = "save"
export const ABOUT_MODAL_KEY = "about"
export const QR_MODAL_KEY = "qr"

// TODO: replace with actual modals
const SaveModal = () => <>save modal</>

const MODAL_OPTIONS = {
  SAVE_MODAL_KEY: SaveModal,
  // LOAD_MODAL_KEY: LoadModal,
  // ABOUT_MODAL_KEY: AboutModal,
  // QR_MODAL_KEY: QrModal
}

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)

  const toggleModal = key => {
    if (!Object.keys(MODAL_OPTIONS).includes(key)) return () => setModal(null)
    if (key === modal) return () => setModal(null)
    return () => setModal(key)
  }

  return (
    <ModalContext.Provider value={[modal, toggleModal]}>
      {modal && MODAL_OPTIONS[modal]}
      {children}
    </ModalContext.Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ModalContext, ModalProvider }
