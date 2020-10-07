import React, { useState, createContext } from "react"
import PropTypes from "prop-types"

const Context = createContext()

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({})
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Context, ContextProvider }
