import React, { useContext, useState } from "react"
import styled from "styled-components"

import GetAppIcon from "@material-ui/icons/GetApp"
import ShareIcon from "@material-ui/icons/Share"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import { ThreeBoxIcon } from "@assets/icons"

import { Context } from "@providers/Context"
import { ModalContext } from "@providers/Modal"
import { downloadLiteGraph } from "@utils/liteGraph"

import ModalBase from "@components/Modal/ModalBase"
import ModalMenu from "@components/Modal/ModalMenu"

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
  const [modal, toggleModal] = useContext(ModalContext)
  const [context] = useContext(Context)

  const { liteGraph } = context

  const [state, setState] = useState(null)

  const onDownload = async () => {
    await downloadLiteGraph(liteGraph)
    toggleModal(modal)
  }

  const optionsList = [
    {
      text: "Download",
      icon: <GetAppIcon />,
      toolTipText: "Download a local file",
      onClick: onDownload,
    },
    {
      disabled: true,
      text: "Copy",
      icon: <FileCopyIcon />,
      toolTipText: "Copy via a unique URL",
      onClick: onDownload,
    },
    {
      disabled: true,
      text: "Share",
      icon: <ShareIcon />,
      toolTipText: "Save to the network and share URL",
      onClick: onDownload,
    },
    {
      disabled: true,
      text: "Save to 3box",
      icon: <ThreeBoxIcon />,
      toolTipText: "Save to your 3Box space",
      onClick: onDownload,
    },
  ]

  return (
    <ModalBase>{!state && <ModalMenu optionsList={optionsList} />}</ModalBase>
  )
}

export default SaveModal
