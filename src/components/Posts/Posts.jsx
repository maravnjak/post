import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import { useRecoilValue } from 'recoil'
import { nameAtom } from 'store/atoms/shared.atom'

const Posts = () => {
  const { t } = useTranslation()
  console.log('...POSTS...')

  const [posts, setPosts] = useState([])
  const { userId } = useParams()
  const userNameAtom = useRecoilValue(nameAtom)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then((response) => {
        console.log('resolved', response)
        return response.json()
      }).then(data => {
        console.log(data)
        setPosts(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [userId])

  return (
    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar><>

      <Box sx={{ flexGrow: 1, maxWidth: 1000 }}>

        <Typography align='right' color='#bdbdbd'>
          <ButtonGroup variant='text' color='inherit' aria-label='medium secondary button group' mr='10px'>
            <Button LinkComponent={Link}
              to={{ pathname: `/albums/${userId}` }}>
              {t('Albums')}
            </Button>

            <Button LinkComponent={Link}
              to={{ pathname: `/todos/${userId}` }}>
              {t('Todos')}
            </Button>
          </ButtonGroup>
        </Typography>

        <Typography variant='h4' align='left' color='#bdbdbd' sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
          {t('POSTS')}
        </Typography>

        <Typography>Name {userNameAtom }</Typography>

        <Grid sx={{ display: 'grid', gridTemplateRows: 'repeat(2,auto)', gridTemplateColumns: 'repeat(3, auto)' }} padding='40px'>
          <Grid>
            <Typography align='center'>

              {userId &&
                            <><Typography variant='h4' align='center' m={12} fontStyle='italic'>{posts.title}</Typography>
                              <Typography variant='body1'>{posts.body}</Typography>
                              <Typography></Typography></>}
            </Typography>
          </Grid>
        </Grid>

      </Box>

      <Button LinkComponent={Link}
        to='/users'
        style={{ color: 'black', fontSize: '17px', marginTop: '150px', align: 'center' }} fullWidth>
        {t('Back to List of Users')}
      </Button></></>
  )
}

export default Posts
