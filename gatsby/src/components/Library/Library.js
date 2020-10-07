import React, { useContext } from "react"
import { Context } from "@providers/Context"

import styled from "styled-components"

const Background = styled.div`
  height: height * 0.6;
  backgroundcolor: "#eeeeee";
`
const Container = styled.div`
  margin: "auto";
  textalign: "center";
  color: "#222222";
  height: barHeight + 3;
  left: 0;
  bottom: 0;
  width: "100%";
  backgroundcolor: "#DFDFDF";
`

const Library = () => {
  // const [context, setContext] = useContext(Context)

  return (
    <Background>
      <Container>
        {/*  <div
            style={{
              cursor: "pointer",
              letterSpacing: -5,
              borderBottom: "1px solid #999999",
              borderLeft: "1px solid #999999",
              borderRight: "1px solid #999999",
              fontSize: 32,
              fontFamily: "'Rubik Mono One', sans-serif",
            }}
            onTouchStart={async () => {
              setShowVideoLibrary(false)
              global.showLibrary = false
              localStorage.setItem("eth.build.showLibrary", false)
            }}
            onClick={async () => {
              setShowVideoLibrary(false)
              global.showLibrary = false
              localStorage.setItem("eth.build.showLibrary", false)
            }}
          >
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
            <span
              style={{
                margin: 5,
                borderLeft: "1px solid #BBBBBB",
                height: barHeight,
              }}
            >
              <Tooltip
                title="Collapse"
                style={{ marginLeft: 10, cursor: "pointer" }}
              >
                <Icon>swap_vert</Icon>
              </Tooltip>
            </span>
          </div>
          <div>
            <StackGrid columnWidth={350}>{allCards}</StackGrid>
          </div> */}
      </Container>
    </Background>
  )
}
export default Library
