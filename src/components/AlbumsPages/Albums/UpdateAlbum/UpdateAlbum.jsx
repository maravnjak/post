import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiServiceAlbums from 'services/apiServiceAlbums'
import { Alert, AppBar,Button,ButtonGroup,Container,Snackbar,Stack,TextField, Toolbar } from '@mui/material'
import DisplayMessage from 'components/DisplayMessage'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'

function UpdateAlbum() {

  const { t } = useTranslation()
  const { userId, albumId } = useParams()
  console.log('updateAlbum ','userId ',userId, 'albumId ', albumId)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState([])
  const [displayError, setDisplayError] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(null)

  const createTitle = () => {
    const title = newTitle.trim()
    setIsLoading(true)
    try {
      apiServiceAlbums.createAlbum({ title })
      setAlbums([...albums, { id: lastId + 1, title }])
      setNewTitle(newTitle)
    } catch (displayError) {
      setDisplayError(null)
    }setDisplayMessage(t('Album title is created successfully.'))
  }
  const lastId = albums.reduce((previousValue, currentValue) => {
    if (previousValue < currentValue.id) {
      return currentValue.id
    }
    return previousValue
  }, 0)

  const updatedAlbum = () => {
    setIsLoading(true)
    apiServiceAlbums.updateAlbum(albumId,{ title })
    setDisplayMessage(t(`Album title ${albumId} is updated successfully.`))
    setIsLoading(false)
  }

  const handleClearCreate = () => {
    setNewTitle('')
  }
  const handleClearUpdate = () => {
    setTitle('')
  }
  const onChangeHandler = (id,key, event) => {
    setTitle({ ...title, [key]: event.target.value })
  }
  const handleOpen = (event) =>{
    setOpen(true,event)
  }
  const handleClose = (event, reason) => {
    setDisplayError(null)
    if (reason === 'clickaway', event) {
      return
    }
    setOpen(false)
  }
  return (
    <><AppBar sx={{ flexDirection: 'column', color: 'inherit', backgroundColor: 'white' }} >
      <Toolbar variant='prominent'>
        <Button color='inherit'
          LinkComponent={Link}
          to={{
            pathname: `/users/${userId}/albums`
          }}>
          {t('Back to Albums')}
        </Button>
        <UserUsername userId={userId} />
      </Toolbar>
    </AppBar>

    <Container sx={{
      flexGrow: 1,
      overflow: 'hidden',
      pt: 20,
    }}>
      <Stack
        component='form'
        direction={{ xs: 'column' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center">

        <><TextField
          id='update-title'
          multiline
          label={albumId}
          placeholder={t('update title')}
          value={title}
          onChange={event => {
            onChangeHandler(albumId, title, event)
            setTitle(event.target.value)
          } } />
        <ButtonGroup variant='text' color='inherit' onClick={handleOpen}>
          <Button onClick={() => updatedAlbum({ albumId, title })}>{t('Update')}</Button>
          <Button onClick={handleClearUpdate}>{t('Clear Text Field')}</Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
              <DisplayMessage displayMessage={displayMessage} />
            </Alert>
          </Snackbar>
        </ButtonGroup></>
        <TextField
          id='create-title'
          multiline
          placeholder={t('create title')}
          value={newTitle}
          onChange={event => {
            setNewTitle(event.target.value)
          } } />
        <ButtonGroup variant='text' color='inherit' onClick={handleOpen}>
          <Button onClick={() => createTitle(title)}>{t('Create Title')}</Button>
          <Button onClick={handleClearCreate}>{t('Clear Text Field')}</Button>

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
              <DisplayMessage displayMessage={displayMessage} />
            </Alert>
          </Snackbar>
        </ButtonGroup>
      </Stack>
    </Container></>
  )
}

export default UpdateAlbum
