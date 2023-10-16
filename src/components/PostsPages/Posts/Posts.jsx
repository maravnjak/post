import React,{ useEffect, useState } from 'react'
import { Alert, AppBar,Box,Button, Toolbar, Typography, Snackbar } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import DisplayMessage from 'components/DisplayMessage/DisplayMessage'
import apiServicePosts from 'services/apiServicePosts'
import UserUsername from 'components/UserUsername/UserUsername'

import Post from '../Post/Post/Post'

export default function Posts() {
  const { t } = useTranslation()

  const [posts, setPosts] = useState([])
  const { userId, postId } = useParams()
  const [displayError, setDisplayError] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(null)

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    response = await response.json()
    console.log(response)
    setPosts(response)
  }
  useEffect(() => {
    getApiData()
  }, [userId])

  const deletedPost = async (id) => {
    setIsLoading(true)
    try {
      await apiServicePosts.deletePost(id)
      setPosts(posts => {
        return posts.filter(post => post.id !== id)
      })
      setDisplayMessage(t(`Post title ${id} is deleted successfully.`))

    } catch (displayError) {
      setDisplayError(null)

    }
    setIsLoading(false)
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
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar>

    <Typography
      variant='h4'
      align='left'
      color='grey'
      sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'left', mb: '12px' }}>
      <UserUsername userId={userId} />
    </Typography>
    <Typography
      variant='h5'
      color='grey'
      letterSpacing={15}
      m={5}
      ml={2}>
      {t('Post Title')}
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridRow: 4,
        justifySelf: 'stretch'
      }}>

      {posts.map((post) => (

        <><Post key={postId} {...post} />

          <Box
            sx={{
              gridColumn: 3,
              justifySelf: 'stretch'
            }}>
            <Button variant='text' onClick={handleOpen}>
              <DeleteBtn handleDelete={() => deletedPost(post.id)} />
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                <DisplayMessage displayMessage={displayMessage} />
              </Alert>
            </Snackbar>
          </Box></>
      ))}

    </Box>
    </>
  )
}

