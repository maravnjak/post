import React,{ useEffect, useState } from 'react'
import { Alert, AppBar,Box,Button, Toolbar, Typography, Snackbar } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import PropTypes from 'prop-types'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay'
//import useQuery from 'components/useQuery/useQuery'

import UserUsername from 'components/UserUsername/UserUsername'

import Post from '../Post/Post/Post'

export default function Posts() {
  const { t } = useTranslation()

  const [posts, setPosts] = useState([])
  const { userId, postId } = useParams()
  const [displayError, setDisplayError] = useState('')
  const [open, setOpen] = useState(false)
  //const query = useQuery()
  //const username = query.get('username')
  //   const postId = query.get('postId')

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    response = await response.json()
    console.log(response)
    setPosts(response)
  }
  useEffect(() => {
    getApiData()
  }, [userId])

  const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setPosts(posts => {
          return posts.filter(post => post.id !== id)
        })

        setDisplayError(t('Post title ') + `${id} ` + (t(' is deleted successfully.')))
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
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar>
    <Typography variant='h4' align='left' color='grey' sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'left', mb: '12px' }}>
      <UserUsername userId={userId} />
    </Typography>
    <Typography variant='h5' color='grey' letterSpacing={15} m={5} ml={2}>{t('Post Title')}</Typography>
    <Box
      sx={{
        display: 'grid',
        gridRow: 4,
        justifySelf: 'stretch' }}>
      {posts.map((post) => (

        <><Post key={postId} {...post} />

          <Box
            sx={{
              gridColumn: 3,
              justifySelf: 'stretch'
            }}>
            <Button variant='text' onClick={handleOpen}>
              <DeleteBtn handleDelete={() => deletePost(post.id)} />
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                <ErrorDisplay displayError={displayError} />
              </Alert>
            </Snackbar>
          </Box></>
      ))}

    </Box>
    </>
  )
}

Posts.propTypes = {
  handleDelete: PropTypes.func.isRequired

}
