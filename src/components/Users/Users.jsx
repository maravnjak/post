import React, { useState, useEffect } from 'react'
import { AppBar, Button, Container, Grid,Toolbar,Typography, } from '@mui/material'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserCard from 'components/UserCard/UserCard'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay'
import { toast } from 'react-hot-toast'

export default function Users() {

  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const [displayError, setDisplayError] = useState('')
  const [show, setShow] = useState(true)

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
  console.log('errordisplay ', displayError)

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setUsers(users => {
          return users.filter(user => user.id !== id)

        })

        toast.success(t('User deleted successfully.'))
        //setDisplayError(t('User deleted successfully.'))
      })

  }
  const handleSuccess = (event) => {
    event.target.value
    setDisplayError(t('User deleted successfully.'))
  }
  const handleOpen = (user, id)=>{
    if (user.id !== id) {
      setShow(show)

    }
  }
  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button
          component={Link}
          to='/'
          color='inherit'>
          {t('Back to Home Page')}
        </Button>
        <Typography variant='h4' component='div' ml={85}> {t('List of Users')}</Typography>
      </Toolbar>
    </AppBar><Container>
      <Grid container spacing={3}>
        {users.map((user) => <Grid item key={user.id} xs={12} md={6} lg={4}>

          <Typography position='absolute' ml={30}>

            <DeleteBtn handleDelete={() => deleteUser(user.id)}>
              <ErrorDisplay onClick={handleOpen} onChange={handleSuccess } />
            </DeleteBtn>
          </Typography>

          <UserCard user={user}>

          </UserCard>
        </Grid>

        )}
      </Grid>

    </Container></>

  )
}
Users.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.any.isRequired
}
