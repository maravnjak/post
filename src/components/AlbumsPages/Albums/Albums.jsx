import React,{ useEffect, useState } from 'react'
import { Alert, AppBar,BottomNavigation, BottomNavigationAction, Box, Button,ButtonGroup,IconButton,List, ListItemText,Snackbar,TextField, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'
// import useQuery from 'components/useQuery/useQuery'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import DisplayMessage from 'components/DisplayMessage/DisplayMessage'
import UserUsername from 'components/UserUsername/UserUsername'
import UpdateIcon from '@mui/icons-material/Update'
import EditNoteIcon from '@mui/icons-material/EditNote'
import apiServiceAlbums from 'services/apiServiceAlbums'

import Album from '../Album/Album'

export default function Albums() {
  const { t } = useTranslation()
  const { userId, albumId } = useParams()
  const [albums, setAlbums] = useState([])
  const [open, setOpen] = useState(false)
  const [displayError, setDisplayError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(0)
  const [displayMessage, setDisplayMessage] = useState(null)
  const [title, setTitle] = useState([])

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

  //   const deleteAlbum = (albumId) => {
  //     fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
  //       method: 'DELETE',
  //     })
  //       .then(response => response.json())
  //       .then(() => {
  //         setAlbums(albums => {
  //           return albums.filter(album => album.id !== albumId)
  //         })
  //         setDisplayError(t(`Album title ${albumId} is deleted successfully.`))
  //         //     toast.success(t('Album title ') + `${id} ` + (t(' is deleted successfully.')))
  //       })
  //   }
  const deletedAlbum = async (albumId) => {
    setIsLoading(true)
    try {
      await apiServiceAlbums.deleteAlbum(albumId)
      setAlbums(albums => {
        return albums.filter(album => album.id !== albumId)
      })
      setDisplayMessage(t(`Album title ${albumId} is deleted successfully.`))

    } catch (displayError) {
      setDisplayError(null)

    }
    setIsLoading(false)
  }
  //   const updatedAlbum = (albumId) => {
  //     const album = albums.find(album => album.id === albumId)
  //     let title = album
  //     setIsLoading(true)
  //     apiServiceAlbums.updateAlbum(albumId,title )
  //     toast.success(t(`Album title ${albumId} is updated successfully.`))
  //     setIsLoading(false)
  //   }
  //   const createTitle = () => {
  //     const title = newTitle.trim()
  //     setIsLoading(true)
  //     try {
  //       apiServiceAlbums.createAlbum({ title })
  //       setAlbums([...albums, { albumId: lastId + 1, title }])
  //       setNewTitle(newTitle)
  //     } catch (displayError) {
  //       setDisplayError(null)
  //     }toast.success(t('Album title is created successfully.'))
  //   }
  //   const lastId = albums.reduce((previousValue, currentValue) => {
  //     if (previousValue < currentValue.id) {
  //       return currentValue.id
  //     }
  //     return previousValue
  //   }, 0)
  const onChangeHandler = (id,key, event) => {
    setTitle({ ...title, [key]: event.target.value })
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
    <><AppBar color='inherit'>
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
          <UserUsername userId={userId} />
        </Typography>
      </Typography>
      <ListItemText>
        <Box
          sx={{
            display: 'grid',
            gridRow: 4,
            justifySelf: 'stretch'

          }}>

          {albums.map((album) => (
            <><Album key={albumId} {...album} />

              <Box
                sx={{
                  gridColumn: 3,
                  justifySelf: 'stretch'
                }}>

                {/* <TextField
                  multiline
                  placeholder={t('Update album title')}
                  value={album.title}
                  onChange={event => {
                    onChangeHandler(albumId, 'title', event)
                    setTitle(event.target.value)
                  }} /> */}
                <BottomNavigation
                  showlabels={value.toString()}
                  value={value}
                  onChange={(event, newValue) => {
                    event.preventDefault()
                    setValue(newValue,event.target.value)
                  }}
                >
                  {/* <ButtonGroup variant='text'> */}

                  <IconButton aria-label='update'
                    opacity={0.1}
                    component={Link}
                    to={{ pathname: `/users/${userId}/albums/${album.id}/${album.id}` }}
                    onChange={event => {
                      onChangeHandler(albumId, 'title', event)
                    }}>

                    <BottomNavigationAction label='update'
                      icon={<UpdateIcon fontSize='small' />} />
                  </IconButton>
                  {/* onClick={()=>updatedAlbum(album.id)}/> */}
                  <IconButton aria-label='create'
                    component={Link}
                    to={{ pathname: `/users/${userId}/albums/${album.id}/${album.id}` }}>

                    <BottomNavigationAction label='create'
                      icon={<EditNoteIcon />}/>
                  </IconButton>

                  <IconButton onClick={handleOpen}>
                    <DeleteBtn handleDelete={() => deletedAlbum(album.id)} />
                  </IconButton>
                  {/* </ButtonGroup> */}
                </BottomNavigation>
              </Box></>
          ))}
        </Box>
        <Button variant='text' onClick={handleOpen}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
              <DisplayMessage displayMessage={displayMessage} />
            </Alert>
          </Snackbar>
        </Button>

      </ListItemText>
    </List></>
  )
}
