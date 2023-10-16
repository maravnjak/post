import React from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'

const DisplayMessage = ({ displayMessage, isLoading }) => {
  const { t } = useTranslation()
  console.log({ isLoading })
  return (
    <>{isLoading &&
      (<Typography>Loading...</Typography>)}
    <Typography>
      {displayMessage}
    </Typography></>

  )
}
DisplayMessage.propTypes = {
  displayMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

DisplayMessage.defaultProps = {
  isLoading: false
}

export default DisplayMessage

