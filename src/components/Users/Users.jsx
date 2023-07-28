import React, { useState, useEffect } from 'react'
import { AppBar, Button, Container, Grid,Toolbar,Typography, } from '@mui/material'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserCard from 'components/UserCard/UserCard'

export default function Users() {

  const { t } = useTranslation()
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log('resolved', response)
        return response.json()
      }).then(data => {
        console.log(data)
        setUsers(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [])
  console.log('users = ', users)

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button
          component={Link}
          to='/'
          color='inherit'>
          {t('Back to Home Page')}
        </Button>
        <Typography variant='h4' component='div' ml={30}> {t('List of Users')}</Typography>
      </Toolbar>
    </AppBar>

    <Container>

      <Grid container spacing={3}>
        {users.map((user) =>
          <Grid item key={user.id} xs={12} md={6} lg={4}>
            <UserCard user={user}/>
          </Grid>
        )}
      </Grid>

    </Container>
    </>
  )
}
Users.propTypes = {
  id: PropTypes.number.isRequired
}
