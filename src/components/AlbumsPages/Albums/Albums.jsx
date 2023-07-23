import React,{ useEffect, useState } from 'react'
import { AppBar, Button,ButtonGroup, Card, CardActions, CardContent, Container, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'
// import useQuery from 'components/useQuery/useQuery'

import UserUsername from 'components/UserUsername/UserUsername'

import Album from '../Album/Album'

export default function Albums() {
  const [albums, setAlbums] = useState([])

  const { t } = useTranslation()
  const { userId, albumId } = useParams()
  //   const query = useQuery()
  //   const username = query.get('username')
  //   const albumId = query.get('albumId')

  //const userNameAtom = useRecoilValue(nameAtom)

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    response = await response.json()
    console.log(response)
    setAlbums(response)
  }
  useEffect(() => {
    getApiData()
  }, [userId])

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
                to={{
                  pathname: `/users/${userId}/posts`
                  //   , search: `?username=${username}`
                }}>
                {t('Posts')}
              </Button>

              <Button LinkComponent={Link}
                to={{ pathname: `/users/${userId}/todos` }}>
                {t('Todos')}
              </Button>
            </ButtonGroup>
          </Typography>

          <Typography sx={{ fontSize: 20 }} color='text.secondary'>
            {t('Albums')} <UserUsername userId={userId} />
          </Typography>
          <Typography variant='h6'align='center'>
            {albums.map((album) => (
              <><Album key={albumId} {...album} />

              </>
            ))}

          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'
            LinkComponent={Link}
            to='/users'
            style={{ color: 'black',align: 'center' }}
            fullWidth>
            {t('Back to List of Users')}
          </Button>
        </CardActions>
      </Card>

    </Container></>

  )
}
