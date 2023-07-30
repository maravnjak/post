import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'
//import useQuery from 'components/useQuery/useQuery'

import UserUsername from 'components/UserUsername/UserUsername'

const PostPage = () => {
  const { t } = useTranslation()
  console.log('...POSTS...')

  const [post,setPost] = useState({})
  const { postId, userId } = useParams()
  //const userNameAtom = useRecoilValue(nameAtom)
  //   const query = useQuery()
  //   const username = query.get('username')
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        console.log('resolved', response)
        return response.json()
      }).then(data => {
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [postId])

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar><Box sx={{ flexGrow: 1, maxWidth: 1000 }}>

      <Typography align='right' color='#bdbdbd'>
        <ButtonGroup variant='text' color='inherit' aria-label='medium secondary button group' mr='10px'>
          <Button LinkComponent={Link}
            to={{
              pathname: `/users/${userId}/albums`
              //search: `?username=${username}`
            }}>
            {t('Albums')}
          </Button>

          <Button LinkComponent={Link}
            to={{ pathname: `/users/${userId}/todos` }}>
            {t('Todos')}
          </Button>

        </ButtonGroup>
      </Typography>

      <Typography variant='h4' color='#bdbdbd' sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
        <UserUsername userId={userId} />
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Button LinkComponent={Link}
            to={{
              pathname: `/users/${userId}/posts`
            //, search: `?username=${username}`
            }}
            variant='text' color='inherit'>
            {t('Show All Posts')}
          </Button>
          <Grid ml={99} mt={-5} >
            <Button LinkComponent={Link}
              to={{ pathname: `/users/${userId}/posts/${postId}/comments` }}
              variant='text' color='inherit' >
              {t('Comments for This Post')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'grid', gridTemplateRows: 'repeat(2,auto)', gridTemplateColumns: 'repeat(3, auto)' }} padding='40px'>
        <Grid>
          <Typography align='center'>

            {userId &&
                              <><Typography variant='h4' align='center' m={12} fontStyle='italic'>{post.title}</Typography>
                                <Typography variant='body1'>{post.body}</Typography>
                              </>}
          </Typography>
        </Grid>
      </Grid>

    </Box></>

  )
}

export default PostPage

