import React,{ useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'

//import useQuery from 'components/useQuery/useQuery'

import UserUsername from 'components/UserUsername/UserUsername'

import Post from '../Post/Post/Post'

export default function Posts() {
  const { t } = useTranslation()

  const [posts, setPosts] = useState([])
  const { userId, postId } = useParams()
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

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar>

    <Typography variant='h4' align='left' color='grey' sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'left',mb: '12px' }}>
      <UserUsername userId={userId}/>
    </Typography>

    <Typography variant='h5' color='grey' letterSpacing={15} m={5} ml={2}>{t('Post Title')}</Typography>
    <Typography>
      {posts.map((post) => (
        <><Post key={postId} {...post} />

        </>
      ))}

    </Typography></>
  )

}

