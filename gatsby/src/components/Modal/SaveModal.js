import React, { useContext, useState } from "react"

import ModalBase from "@components/Modal/ModalBase"

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

const SaveModal = () => {
  return <ModalBase>Save modal</ModalBase>
}

export default SaveModal
