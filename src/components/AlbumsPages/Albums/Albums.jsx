import React,{ useEffect, useState } from 'react'
import { Alert, AppBar, Box, Button,ButtonGroup, List, ListItemText,Snackbar, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'
// import useQuery from 'components/useQuery/useQuery'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay'
import UserUsername from 'components/UserUsername/UserUsername'

import Album from '../Album/Album'

export default function Albums() {
  const [albums, setAlbums] = useState([])
  const [open, setOpen] = useState(false)
  const [displayError, setDisplayError] = useState(null)
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

  const deleteAlbum = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setAlbums(albums => {
          return albums.filter(album => album.id !== id)
        })

        setDisplayError(t('Album title ') + `${id} ` + (t(' is deleted successfully.')))
      })
  }
  const handleOpen = (event) =>{
    setOpen(true,event)
  }
  const handleClose = (event, reason) => {
    setDisplayError(null)
    if (reason === 'clickaway',event) {
      return
    }
    setOpen(false)
  }

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
      <Typography variant='h6' color='text.secondary' noWrap>
        {t('Albums')}
        <Typography ml={10}>
          <UserUsername userId={userId} /></Typography>
      </Typography>
      <ListItemText>
        <Box
          sx={{
            display: 'grid',
            gridRow: 4,
            justifySelf: 'stretch' }}>
          {albums.map((album) => (
            <><Album key={albumId} {...album} />
              <Box
                sx={{
                  gridColumn: 3,
                  justifySelf: 'stretch'
                }}>
                <Button variant='text' onClick={handleOpen}>
                  <DeleteBtn handleDelete={() => deleteAlbum(album.id)} />
                </Button>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                  <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                    <ErrorDisplay displayError={displayError} />
                  </Alert>
                </Snackbar>
              </Box></>
          ))}
        </Box>
      </ListItemText>
    </List></>
  )
}
