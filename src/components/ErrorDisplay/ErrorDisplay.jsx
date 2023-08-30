import React from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'

const ErrorDisplay = ({ displayError, isLoading }) => {
  const { t } = useTranslation()
  console.log({ isLoading })
  return (
    <>{isLoading &&
      (<Typography>Loading...</Typography>)}
    <Typography>
      {displayError}
    </Typography></>

  )
}
ErrorDisplay.propTypes = {
  displayError: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

ErrorDisplay.defaultProps = {
  isLoading: false
}

export default ErrorDisplay

