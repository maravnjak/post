import React,{ useEffect, useState } from 'react'
import { AppBar, Box, Button,ButtonGroup, Container, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
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
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <ButtonGroup variant='text' color='inherit'>
          <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
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
      </Toolbar>
    </AppBar>

    <List>
      <Typography variant='h6' color='text.secondary'>
        {t('Albums')}
        <Typography ml={10}><UserUsername userId={userId} /></Typography>
      </Typography>
      <ListItemText>
        {albums.map((album) => (
          <Album key={albumId} {...album} />

        ))}
      </ListItemText>
    </List></>
  )
}
