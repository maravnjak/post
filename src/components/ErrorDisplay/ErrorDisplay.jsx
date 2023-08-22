import React from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'

const ErrorDisplay = ({ displayError }) => {
  const { t } = useTranslation()


  return (

    <Typography>
      {displayError}
    </Typography>
  )
}
ErrorDisplay.propTypes = {
  displayError: PropTypes.string.isRequired
}
export default ErrorDisplay

