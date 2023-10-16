import React,{ useEffect, useState } from 'react'
import { AppBar, Box, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'

import Photo from '../Photo/Photo'

export default function Comments() {

  const { t } = useTranslation()
  const [photos, setPhotos] = useState([])
  const { userId, albumId } = useParams()

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    response = await response.json()
    console.log(response)
    setPhotos(response)
  }
  useEffect(() => {
    getApiData()
  }, [albumId])

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <ButtonGroup variant='text' size='large' color='inherit'>
          <Button component={Link} to='/users'>{t('Users')}</Button>
          <Button
            LinkComponent={Link}
            to={{
              pathname: `/users/${userId}/albums`
            }}>
            {t('Back to Albums')}
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
    <Typography
      variant='h5'
      color='grey'
      letterSpacing={15}
      m={5}
      ml={2}
      noWrap
      sx={{ borderBottom: 1, borderColor: 'divider', mt: '15px' }}>
      <Typography textAlign='center'>
        <UserUsername userId={userId} />
      </Typography>
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={{ xs: 2, md: 12 }}>

        {photos.map((photo) => (
          <Grid item xs={2} sm={2} md={3} key={photo.id}>
            <Photo key={photo.id} {...photo} />
          </Grid>
        ))}
      </Grid>
    </Box> </>
  )

}

