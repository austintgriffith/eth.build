import React, { useEffect, useState } from "react"

import LiteGraphJS from "litegraph.js/build/litegraph.js"
import "litegraph.js/css/litegraph.css"

import { loadCustomNode } from "./utils/node"
import { starterExample } from "./utils/example"

import { decompressLiteGraph } from "@utils/liteGraph"

const Graph = () => {
  const [liteGraph, setLiteGraph] = useState()
  const [liteGraphCanvas, setLiteGraphCanvas] = useState()

  const init = () => {
    const graph = new LiteGraphJS.LGraph()
    const canvas = new LiteGraphJS.LGraphCanvas("#main", graph)
    LiteGraphJS.LiteGraph.debug = true
    window.addEventListener("resize", function () {
      canvas.resize()
    })
    graph.onAfterExecute = () => {
      canvas.draw(true)
    }
    window.onpagehide = function () {
      var data = JSON.stringify(graph.serialize())
      localStorage.setItem("litegraph", data)
    }
    return { graph, canvas }
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
    const { graph, canvas } = await init()

    // TODO: add this back
    // loadCustomNodes(LiteGraphJS)

    const data = loadData()
    if (data) graph.configure(data)
    graph.canvas = canvas

    setLiteGraph(graph)
    setLiteGraphCanvas(canvas)

    graph.start()
    // TODO: What is this???
    setInterval(() => {
      graph.runStep()
    }, 250)
  }

  useEffect(() => {
    startGraph()
  }, [])

  return <></>
}

export default Graph
