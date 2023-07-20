import React,{ useEffect, useState } from 'react'
import { AppBar, Button,ButtonGroup, Card, CardActions, CardContent, Container, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'
import useQuery from 'components/useQuery/useQuery'
import PropTypes from 'prop-types'

export default function AlbumPage() {
  const { t } = useTranslation()
  const { userId, albumId } = useParams()
  const [album,setAlbum] = useState([])
  //const userNameAtom = useRecoilValue(nameAtom)
  const query = useQuery()
  const username = query.get('username')
  const albumTitle = query.get('albumTitle')

  //   useEffect(() => {
  //     fetch(`https://jsonplaceholder.typicode.com/albums/?${albumId}`)
  //       .then((response) => {
  //         //console.log('resolved', response)
  //         return response.json()
  //       }).then(data => {
  //         //console.log(data)
  //         setAlbum(data)
  //       }).catch((err) => {
  //         console.log('reject', err)
  //       })
  //   }, [albumId])
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
    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar>

    <Container maxWidth='sm'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography align='right' color='#bdbdbd'>
            <ButtonGroup variant='text' color='inherit' mr='10px'>
              <Button LinkComponent={Link}
                to={{ pathname: `/users/${userId}/albums`, search: `?username=${username}` }}
                variant='text' color='inherit' font>
                {t('Show All Albums')}
              </Button>
              <Button LinkComponent={Link}
                to={{ pathname: `/users/${userId}/posts`, search: `?username=${username}` }}>
                {t('Posts')}
              </Button>

              <Button LinkComponent={Link}
                to={{ pathname: `/todos/${userId}` }}>
                {t('Todos')}
              </Button>
            </ButtonGroup>
          </Typography>

          <Typography sx={{ fontSize: 20 }} color='text.secondary' mt={5} gutterBottom>
            {t('Albums')}<br/>{username}
          </Typography>
          <Typography variant='h5' component='div' align='center' mt={7}>
            {albumTitle}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'
            LinkComponent={Link}
            to='/users'
            style={{ color: 'black', marginTop: '150px', align: 'center' }}
            fullWidth>
            {t('Back to List of Users')}
          </Button>
        </CardActions>
      </Card>

    </Container></>

  )
}

AlbumPage.propTypes = {
  albumTitle: PropTypes.string.isRequired
}
