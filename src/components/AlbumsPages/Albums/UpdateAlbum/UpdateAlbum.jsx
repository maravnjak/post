import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import apiServiceAlbums from 'services/apiServiceAlbums'
import { Alert,Button,ButtonGroup,Snackbar,Stack,TextField } from '@mui/material'
import ErrorDisplay from 'components/ErrorDisplay'
import toast from 'react-hot-toast'
import { useTranslation } from 'common/i18n'

function UpdateAlbum() {

  const { t } = useTranslation()
  const { albumId } = useParams()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState([])
  const [displayError, setDisplayError] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const createTitle = () => {
    const title = newTitle.trim()
    setIsLoading(true)
    try {
      apiServiceAlbums.createAlbum({ title })
      setAlbums([...albums, { id: lastId + 1, title }])
      setNewTitle(newTitle)
    } catch (displayError) {
      setDisplayError(null)
    }toast.success(t('Album title is created successfully.'))
  }
  const lastId = albums.reduce((previousValue, currentValue) => {
    if (previousValue < currentValue.id) {
      return currentValue.id
    }
    return previousValue
  }, 0)

  const updatedAlbum = () => {
    setIsLoading(true)
    apiServiceAlbums.updateAlbum(albumId, { title } )
    toast.success(t(`Album title ${albumId} is updated successfully.`))
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

    <Stack
      component='form'
      sx={{
        width: '35ch',
      }}
      direction='column'
      justifyContent='center'
      align='center'
      spacing={5}>

      <><TextField
        multiline
        placeholder={t('Update album title')}
        value={title}
        onChange={event => {
          onChangeHandler(albumId, 'title', event)
          setTitle(event.target.value)
        }} />
      <ButtonGroup variant='text' color='inherit'>
        <Button onClick={() => updatedAlbum({ albumId,title })}
        >{t('Update')}</Button>
        <Button onClick={handleClearUpdate}>{t('Clear Text Field')}</Button>
      </ButtonGroup></>
      <TextField
        multiline
        placeholder={t('Create album title')}
        value={newTitle}
        onChange={event => {
          setNewTitle(event.target.value)
        }} />
      <ButtonGroup variant='text' color='inherit'>
        <Button onClick={()=>createTitle(title)}>{t('Create Title')}</Button>
        <Button onClick={handleClearCreate}>{t('Clear Text Field')}</Button>
      </ButtonGroup>
      <Button variant='text' onClick={handleOpen}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
            <ErrorDisplay displayError={displayError} />
          </Alert>
        </Snackbar>
      </Button>
    </Stack>
  )
}

export default UpdateAlbum
