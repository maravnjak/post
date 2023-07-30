import React,{ useEffect, useState } from 'react'
import { AppBar, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'

//import useQuery from 'components/useQuery/useQuery'

import UserUsername from 'components/UserUsername/UserUsername'

import Comment from '../Comment/Comment'

export default function Comments() {
  const { t } = useTranslation()

  const [comments, setComments] = useState([])
  const { userId, postId } = useParams()
  //const query = useQuery()
  //const username = query.get('username')
  //   const postId = query.get('postId')

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    response = await response.json()
    console.log(response)
    setComments(response)
  }
  useEffect(() => {
    getApiData()
  }, [postId])

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <ButtonGroup variant='text' size='large' color='inherit' >
          <Button component={Link} to='/users' >{t('Users')}</Button>
          <Button
            LinkComponent={Link}
            to={{
              pathname: `/users/${userId}/posts`
            //, search: `?username=${userName}`
            }}
          >
            {t('Back to Posts')}
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>

    <Typography variant='h5' color='grey' letterSpacing={15} m={5} ml={2} noWrap sx={{ borderBottom: 1, borderColor: 'divider',mt: '15px' }}>
      <Typography><UserUsername userId={userId} />{t('Comments of Post')} {t('no')}: { postId}<br/></Typography>
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={12}>
        {comments.map((comment) => (
          <><Comment key={postId} {...comment} />

          </>
        ))}

      </Grid>
    </Grid></>
  )

}

