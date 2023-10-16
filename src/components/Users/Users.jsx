import React, { useState, useEffect } from 'react'
import { Alert, AppBar,Box, Button, Container, Grid,IconButton,Toolbar,Typography,Snackbar } from '@mui/material'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserCard from 'components/UserCard/UserCard'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import DisplayMessage from 'components/DisplayMessage/DisplayMessage'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import apiServiceUsers from 'services/apiServiceUsers'

export default function Users() {

  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [displayError, setDisplayError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await apiServiceUsers.fetchUsers()
      setUsers(data)
      setDisplayError(null)
    } catch (displayError) {
      setDisplayError(displayError)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const deletedUser = async (id) => {
    setIsLoading(true)
    try {
      await apiServiceUsers.deleteUser(id)
      setUsers(users => {
        return users.filter(user => user.id !== id)
      })
      setDisplayMessage(t('User is deleted successfully.'))

    } catch (displayError) {
      setDisplayError(null)

    }
    setIsLoading(false)
  }

  const handleOpen = (event) => {
    setOpen(true, event)
  }
  const handleClose = (event, reason) => {
    setDisplayError(null)
    if (reason === 'clickaway', event) {
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
          color='inherit'>
          {t('Back to Home Page')}
        </Button>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mr={-15}
          position='relative'>

          <Typography variant='h4'> {t('List of Users')}</Typography>
        </Grid>
        <Grid item xs={1}>

          <IconButton
            component={Link}
            to='/add-user'
            color='inherit'>
            <Typography variant='body2' noWrap>
              {t('Add User')}
              <PersonAddIcon />
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
              <Button variant='text' onClick={handleOpen} >
                <DeleteBtn handleDelete={() => deletedUser(user.id)} />
              </Button>

              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose } >
                  <DisplayMessage displayMessage={displayMessage} isLoading={isLoading} />
                </Alert>
              </Snackbar>
            </Box>
            <UserCard user={user} />
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

