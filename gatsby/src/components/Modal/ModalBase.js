import React, { useContext, useState } from "react"

import { Dialog } from "@material-ui/core"

import {
  ModalContext,
  LOAD_MODAL_KEY,
  SAVE_MODAL_KEY,
  ABOUT_MODAL_KEY,
  QR_MODAL_KEY,
} from "@providers/Modal"

import styled from "styled-components"
import { Icon } from "@material-ui/core"

const Container = styled.div`
  zindex: 1;
  position: "fixed";
  height: barHeight;
  left: 0;
  bottom: 0;
  width: "100%";
  cursor: "pointer";
  letterspacing: -5;
  fontsize: 32;
  fontfamily: "'Rubik Mono One', sans-serif";
`

const ModalBase = ({ children }) => {
  const [modal, toggleModal] = useContext(ModalContext)
  const handleClose = () => {
    toggleModal(modal)
    // old
    // setOpenSaveDialog(false);
    // setSaveType(null);
    // setThreeBoxStatus(null);
    // setThreeBoxConnectionStep(0);
    // clearTimeout(updateTimer);
    // setUpdateTimer(null);
    // setSaving(false);
  }

  return (
    <Dialog onClose={handleClose} open maxWidth="md">
      {children}
    </Dialog>
  )
}
export default ModalBase
