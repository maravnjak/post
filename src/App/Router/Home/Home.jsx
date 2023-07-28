import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { AppBar,Box, Button, Grid, Toolbar, Typography } from '@mui/material'

import { useTranslation } from 'common/i18n'

const Home = () => {

  const { t } = useTranslation()

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar>

    <Box
      component="div"
      sx={{
        position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/post.png'})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        ml: -55
      }}>

      <Grid>
        <Typography
          variant='h1'
          align='center'
          ml={30}
          letterSpacing={7}
          color='grey'
        >
          {t('Welcome')}<br />
          {t('to')}
        </Typography>
      </Grid>
    </Box></>
  )

}

export default memo(Home)
