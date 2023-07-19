import React,{ useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'

import useQuery from 'components/useQuery/useQuery'

import Post from '../Post/Post/Post'

export default function Posts() {
  const { t } = useTranslation()

  const [posts, setPosts] = useState([])
  const { userId } = useParams()
  const query = useQuery()
  const username = query.get('username')
  const postId = query.get('postId')

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
    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar>

    <Typography variant='h4' align='left' color='grey' sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'left',mb: '12px' }}>
      {username}
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

