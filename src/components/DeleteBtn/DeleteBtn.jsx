import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'common/i18n'

const DeleteBtn = ({ handleDelete })=> {
  const { t } = useTranslation()

  return (

    <IconButton>
      <DeleteIcon onClick={handleDelete}>
      </DeleteIcon>
    </IconButton>

  )
}

DeleteBtn.propTypes = {
  handleDelete: PropTypes.func.isRequired
}

export default DeleteBtn
