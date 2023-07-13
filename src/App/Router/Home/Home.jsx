import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'common/i18n'
import { AppBar,Button, Grid, Toolbar, Typography } from '@mui/material'

const Home = () => {

  const { t } = useTranslation()

  return (

    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar>
    <Grid maxWidth='sm'>
      <Typography
        variant='h3'
        align='center'
        paddingTop='30px'
        bgcolor='background.paper'>
        {t('Welcome to Post')}
      </Typography>
    </Grid></>
  )

}

export default memo(Home)
