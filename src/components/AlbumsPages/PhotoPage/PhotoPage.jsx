import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'
import { AppBar, ButtonGroup, Button, Grid, ImageList, ImageListItem, ImageListItemBar, Toolbar, Typography } from '@mui/material'

export default function PhotoPage() {

  const { t } = useTranslation()
  const [photo, setPhoto] = useState([])
  const { userId,albumId, photoId } = useParams()

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
    response = await response.json()
    console.log(response)
    setPhoto(response)
  }
  useEffect(() => {
    getApiData()
  }, [photoId])

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <ButtonGroup variant='text' size='large' color='inherit'>
          <Button component={Link} to='/users'>{t('Users')}</Button>
          <Button
            LinkComponent={Link}
            to={{
              pathname: `/users/${userId}/albums/${albumId}/photos`
            }}>
            {t('Back to Photos')}
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
    <Grid container alignContent='center' ml={30} mt={10}>
      <Grid item >
        <ImageList>
          <ImageListItem key={photoId}>
            <img
              src={`${photo.url}`}
              alt={photo.title}
              loading='lazy'/>
            <ImageListItemBar
              title={photo.title} />
          </ImageListItem>
        </ImageList>
      </Grid>
    </Grid></>
  )
}
