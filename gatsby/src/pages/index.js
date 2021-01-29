import React from "react"

import SEO from "@components/seo"
import ToolBar from "@components/ToolBar/ToolBar"
import Graph from "@components/Graph/Graph"

const IndexPage = () => (
  <>
    <SEO title="Sandbox" />
    <Graph />
    <ToolBar />
  </>
)

export default IndexPage
