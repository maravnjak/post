import React,{ useEffect, useState } from 'react'
import { AppBar, Button,ButtonGroup,Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'

export default function AlbumPage() {

  const { t } = useTranslation()
  const { userId, albumId } = useParams()
  const [album, setAlbum] = useState([])

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
    response = await response.json()
    console.log(response)
    setAlbum(response)
  }
  useEffect(() => {
    getApiData()
  }, [albumId])

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar>
    <Typography align='right' color='#bdbdbd'>

      <ButtonGroup variant='text' color='inherit' mr='10px'>
        <Button LinkComponent={Link}
          to={{
            pathname: `/users/${userId}/albums`
          }}
          variant='text'
          color='inherit'>
          {t('Show All Albums')}
        </Button>

        <Button LinkComponent={Link}
          to={{
            pathname: `/users/${userId}/posts`
          }}>
          {t('Posts')}
        </Button>

        <Button LinkComponent={Link}
          to={{ pathname: `/users/${userId}/todos` }}>
          {t('Todos')}
        </Button>
        <Button LinkComponent={Link}
          to={{ pathname: `/users/${userId}/albums/${albumId}/photos` }}
          variant='text' color='inherit' >
          {t('Photo')}
        </Button>
      </ButtonGroup>
    </Typography>
    <Typography>
      <UserUsername userId={userId} />
    </Typography>
    <Typography sx={{ fontSize: 20 }} mt={5} gutterBottom>
      {t('Album Title')}
      <Typography variant='h5' mt={3} color='text.secondary'>
        {album.title}
      </Typography>
      <Typography>
      </Typography>
    </Typography></>

  )
}
