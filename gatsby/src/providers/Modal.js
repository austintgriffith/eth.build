import React, { useState, createContext } from "react"
import PropTypes from "prop-types"

import SaveModal from "@components/Modal/SaveModal"

const ModalContext = createContext()

export const MODAL_KEY = {
  save: "save",
  load: "load",
  scan: "scan",
  about: "about",
}

const MODAL_OPTIONS = {
  [MODAL_KEY.save]: SaveModal,
  // [MODAL_KEY.load]: LoadModal,
  // [MODAL_KEY.scan]: ScanModal
  // [MODAL_KEY.about]: AboutModal,
}

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)

  const toggleModal = key => {
    if (!Object.keys(MODAL_OPTIONS).includes(key)) return setModal(null)
    if (key === modal) return setModal(null)
    return setModal(key)
  }

  return (
    <ModalContext.Provider value={[modal, toggleModal]}>
      {modal && MODAL_OPTIONS[modal]()}
      {children}
    </ModalContext.Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ModalContext, ModalProvider }
