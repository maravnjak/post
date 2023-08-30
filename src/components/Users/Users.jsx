import React, { useState, useEffect } from 'react'
import { Alert, AppBar,Box, Button, Container, Grid,IconButton,Toolbar,Typography,Snackbar } from '@mui/material'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserCard from 'components/UserCard/UserCard'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay'
//import { toast } from 'react-hot-toast'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function Users() {

  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [displayError, setDisplayError] = useState('')

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

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setUsers(users => {
          return users.filter(user => user.id !== id)

        })

        //toast.success(t('User deleted successfully.'))
        setDisplayError(t('User deleted successfully.'))
      })

  }

  console.log('errordisplay ', displayError)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    setDisplayError(null)
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button
          component={Link}
          to='/'
          color='inherit'
          size='small'>
          {t('Back to Home Page')}
        </Button>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mr={-15}>
          <Typography variant='h4'> {t('List of Users')}</Typography>
        </Grid>
        <Grid item xs={1}>

          <IconButton
            component={Link}
            to='/add-user'
            color='inherit'>
            <Typography variant='body2' noWrap>
              {t('Add User')} <PersonAddIcon />
            </Typography>
          </IconButton>

        </Grid>
      </Toolbar>
    </AppBar>
    <Container>
      <Grid container spacing={3}>

        {users.map((user) =>
          <Grid item key={user.id} xs={12} md={6} lg={4}>
            <Box position='absolute' ml={30} align='center'>
              <Button variant='text'onClick={handleOpen}>
                <DeleteBtn handleDelete={() => deleteUser(user.id)}/>
              </Button>
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose }>
                  <ErrorDisplay displayError={displayError }/>
                </Alert>
              </Snackbar>
            </Box>

            <UserCard user={user}/>
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
