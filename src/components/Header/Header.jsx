import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar } from '@mui/material'
import { useTranslation } from 'common/i18n'

const Header = () => {
  const { t } = useTranslation()

  return (
    <AppBar position='absolute' color='grey'>
      <Toolbar variant='dense' >
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
