import React,{ useEffect, useState } from 'react'
import { AppBar, Button,ButtonGroup, Card, CardActions, CardContent, Container, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'
import { useRecoilValue } from 'recoil'
import { nameAtom } from 'store/atoms/shared.atom'
export default function Albums() {
  const { t } = useTranslation()
  const { userId } = useParams()
  const [albums, setAlbums] = useState({})
  const userNameAtom = useRecoilValue(nameAtom)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${userId}`)
      .then((response) => {
        //console.log('resolved', response)
        return response.json()
      }).then(data => {
        //console.log(data)
        setAlbums(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [userId])

  return (
    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar>

    <Container maxWidth='sm'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography align='right' color='#bdbdbd'>
            <ButtonGroup variant='text' color='inherit' mr='10px'>
              <Button LinkComponent={Link}
                to={{ pathname: `/posts/${userId}` }}>
                {t('Posts')}
              </Button>

              <Button LinkComponent={Link}
                to={{ pathname: `/todos/${userId}` }}>
                {t('Todos')}
              </Button>
            </ButtonGroup>
          </Typography>

          <Typography sx={{ fontSize: 20 }} color='text.secondary' mt={5} gutterBottom>
            {t('Albums')}<br/>{userNameAtom}
          </Typography>
          <Typography variant='h5' component='div' align='center' mt={7}>
            {albums.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'
            LinkComponent={Link}
            to='/users'
            style={{ color: 'black', marginTop: '150px', align: 'center' }}
            fullWidth>
            {t('Back to List of Users')}
          </Button>
        </CardActions>
      </Card>

    </Container></>

  )
}
