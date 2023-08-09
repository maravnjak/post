import React from 'react'
import { Alert, IconButton } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'

const ErrorDisplay = ({ handleOpen, handleSuccess, displayError }) => {
  const { t } = useTranslation()

  console.log('error display, error ', displayError)

  return (
    <IconButton handleOpen={handleOpen}>
      <Alert severity="success" handleSuccess={handleSuccess}>{displayError}</Alert>
    </IconButton>
  )

}
ErrorDisplay.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  displayError: PropTypes.string.isRequired
}
export default ErrorDisplay

