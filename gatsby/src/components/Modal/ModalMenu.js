import React from "react"
import styled from "styled-components"

import { Button, Grid, Tooltip } from "@material-ui/core"

const StyledButton = styled(Button)`
  width: 200;
`

const StyledGrid = styled(Grid)`
  margin: 0;
  width: 100%;
  padding: 32px 32px 0 32px;
`

const Option = ({ toolTipText, onClick, text, icon }) => (
  <Grid item style={{ width: 220 }}>
    <Tooltip title={toolTipText}>
      <StyledButton onClick={onClick} startIcon={icon}>
        {text}
      </StyledButton>
    </Tooltip>
  </Grid>
)

const ModalMenu = ({ optionsList }) => {
  const options =
    optionsList &&
    optionsList.map((option, index) => (
      <Option key={`${index}-${option.text}`} {...option} />
    ))
  return (
    <StyledGrid container spacing={3} justify="center">
      {options}
    </StyledGrid>
  )
}

export default ModalMenu
