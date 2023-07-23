import React, { useState, useEffect } from 'react'
import { Button, Container, ListItem,Stack,Typography, } from '@mui/material'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import { MailTwoTone } from '@mui/icons-material'

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
    <>
      <Container sx={{ maxWidth: 'md', maxHeight: '80%', typography: 'body2' }}>

        <Typography variant='h4' mb={4} align='center'>{t('List of Users')}</Typography>

        <Stack direction='row' useFlexGap flexWrap='wrap' spacing={3}>

          {users.map((user) =>
            <Typography key={user.id}>

              <><ListItem >
                <PersonPinCircleIcon fontSize='small' />
                {t('Name')}
              </ListItem>
              <Button
                LinkComponent={Link}
                style={{ color: 'black', fontSize: '17px', justify: 'center' }}
                to={{ pathname: `/users/${user.id}` }}>
                {user.name}
              </Button>

              <Typography
                sx={{ display: 'inline', colors: 'black', fontSize: '15px' }}
                component='span'
                variant='body2'
                color='text.primary'>

                <Typography fontStyle='oblique' color='text.disabled' >
                  {t('Username')}
                </Typography>

                <Typography gutterBottom fontWeight= 'medium'>{user.username}</Typography>

                <Typography marginTop='10px' marginBottom='20px' marginRight='20px'>

                  <MailTwoTone/> email:<br />
                  {user.email}
                </Typography>

              </Typography></>
            </Typography>
          )}

          <Button LinkComponent={Link}
            to='/'
            style={{ color: 'black', fontSize: '17px',marginTop: '2px' }} fullWidth>
            {t('Back to Home Page')}
          </Button>
        </Stack>
      </Container>
    </>
  )
}
Users.propTypes = {
  id: PropTypes.number.isRequired
}
