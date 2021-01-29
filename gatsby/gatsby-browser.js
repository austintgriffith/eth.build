import React from "react"
import PropTypes from "prop-types"

import { isBrowser } from "@utils/helpers"

import { ContextProvider } from "@providers/Context"
import { ModalProvider } from "@providers/Modal"
import ThemeProvider from "@providers/Theme"

/* eslint-disable import/prefer-default-export */
export const wrapPageElement = ({ element }) => {
  const LayoutLazy = React.lazy(() => import("@components/Layout/Layout"))

  // Suspense is not available yet, but is needed for i18next
  // https://www.gatsbyjs.org/docs/using-client-side-only-packages/#workaround-4-use-reactlazy-and-suspense-on-client-side-only
  return (
    <>
      {isBrowser && (
        <React.Suspense fallback={<div />}>
          <ContextProvider>
            <ThemeProvider>
              <ModalProvider>
                <LayoutLazy>{element}</LayoutLazy>
              </ModalProvider>
            </ThemeProvider>
          </ContextProvider>
        </React.Suspense>
      )}
    </>
  )
}

wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired,
}
