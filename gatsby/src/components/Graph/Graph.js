import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"

import { Context } from "@providers/Context"

import LiteGraphJS from "litegraph.js/build/litegraph.js"
import "litegraph.js/css/litegraph.css"

import { loadCustomNode } from "./utils/node"
import { starterExample } from "./utils/example"

import { decompressLiteGraph } from "@utils/liteGraph"

const Container = styled.div`
  overscrollbehavior: "none";
  position: "relative";
  overflow: "hidden";
  background: "#222";
  width: "100%";
  height: "100%";
`

const Canvas = styled.canvas`
  background: "#111111";
  outline: "none";
  borderbottom: "1px solid #666666";
`

const Graph = () => {
  const [context, setContext] = useContext(Context)

  const init = () => {
    const liteGraph = new LiteGraphJS.LGraph()
    const canvas = new LiteGraphJS.LGraphCanvas("#main", liteGraph)
    LiteGraphJS.LiteGraph.debug = true
    window.addEventListener("resize", function () {
      canvas.resize()
    })
    liteGraph.onAfterExecute = () => {
      canvas.draw(true)
    }
    window.onpagehide = function () {
      var data = JSON.stringify(liteGraph.serialize())
      localStorage.setItem("litegraph", data)
    }
    return { liteGraph, canvas }
  }

  const loadFromPath = rawPath => {
    let path = rawPath
    path = path.substring(1) // Remove initial "/"
    if (path.indexOf("wof") === 0) {
      window.history.pushState("", "", "/")
      return decompressLiteGraph(path)
    }
    return null
  }

  const loadData = () => {
    const path = window.location.pathname
    if (path && path.length > 1) return loadFromPath(path)
    const rawData = localStorage.getItem("litegraph")
    if (rawData) {
      try {
        return JSON.parse(rawData)
      } catch (e) {
        console.log(e)
      }
    }
    return decompressLiteGraph(starterExample)
  }

  const startGraph = async () => {
    const { liteGraph, canvas } = init()

    // TODO: add this back
    // loadCustomNodes(LiteGraphJS)

    const data = loadData()
    if (data) liteGraph.configure(data)
    liteGraph.canvas = canvas

    setContext({ ...context, liteGraph })

    liteGraph.start()
    // TODO: What is this???
    setInterval(() => {
      liteGraph.runStep()
    }, 250)
  }

  useEffect(() => {
    startGraph()
  }, [])

  return (
    <Container>
      <canvas id="main" width={600} height={600}></canvas>
    </Container>
  )
}

export default Graph
