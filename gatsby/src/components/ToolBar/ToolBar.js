import React, { useContext, useState } from "react"
import { ModalContext, MODAL_KEY } from "@providers/Modal"

import styled from "styled-components"
import { Drawer, Tooltip, Icon } from "@material-ui/core"

import Library from "@components/Library/Library"

const Item = styled.button`
  margin: 5;
  borderleft: "1px solid #cccccc";
  height: barHeight;
`

const StyledToolTip = styled(Tooltip)`
  marginleft: 10;
  cursor: "pointer";
`

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

const QrIcon = () => (
  <svg style={{ width: 24, height: 24, opacity: 0.95 }} viewBox="0 0 24 24">
    <path
      fill="#000000"
      d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z"
    />
  </svg>
)

const BarItem = ({ onClick, children, tooltipText }) => (
  <Item onClick={onClick}>
    <StyledToolTip title={tooltipText}>
      <>{children}</>
    </StyledToolTip>
  </Item>
)

const EthBuildBarItem = ({ onClick }) => (
  <span onClick={onClick}>
    <span style={{ color: "#03a9f4" }}>eth</span>
    <span
      style={{
        position: "relative",
        left: -5,
        bottom: 15,
        color: "#f44336",
        marginBottom: 25,
      }}
    >
      .
    </span>
    <span style={{ position: "relative", left: -10, color: "#333" }}>
      build
    </span>
  </span>
)

const ToolBar = () => {
  const [_, toggleModal] = useContext(ModalContext)

  const [showLibrary, setShowLibrary] = useState(false)

  const onToggleLibrary = () => setShowLibrary(!showLibrary)

  return (
    <>
      <Container>
        <BarItem tooltipText="Save" onClick={() => toggleModal(MODAL_KEY.save)}>
          <Icon>save</Icon>
        </BarItem>
        <BarItem tooltipText="Load" onClick={() => toggleModal(MODAL_KEY.load)}>
          <Icon>open_in_browser</Icon>
        </BarItem>
        <EthBuildBarItem onClick={onToggleLibrary} />
        <BarItem
          tooltipText="About"
          onClick={() => toggleModal(MODAL_KEY.about)}
        >
          <Icon>info</Icon>
        </BarItem>
        <BarItem tooltipText="Scan" onClick={() => toggleModal(MODAL_KEY.scan)}>
          <QrIcon />
        </BarItem>
      </Container>
      <Drawer variant="persistent" anchor="bottom" open={showLibrary}>
        <Library />
      </Drawer>
    </>
  )
}
export default ToolBar
