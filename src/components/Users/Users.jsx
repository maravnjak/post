import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, ListItem, ListItemText, Typography, } from '@mui/material'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'

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

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid>
          <Typography variant='h3' align='center' gutterBottom>{t('List of Users')}</Typography>
          <Grid sx={{ display: 'grid', gridTemplateRows: 'repeat(5,auto)',gridTemplateColumns: 'repeat(4, auto)' }} padding='40px'>

            {users.map((user) => <>

              <ListItem alignItems='flex-start' >
                <PersonPinCircleIcon fontSize='small' />
                {t('Name')}
              </ListItem>
              <ListItemText
                style={{ color: 'black', fontSize: '17px' }}
                key={user.id}
                primary={user.name}
                secondary={<>
                  <Typography
                    sx={{ display: 'inline', colors: 'black' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  >
                    <Typography marginTop='10px'>{t('Username')}</Typography>
                    {user.username}

                    <Typography marginTop='10px' marginBottom='60px'>
                                email:<br />
                      {user.email}
                    </Typography>
                  </Typography>
                </>} />

            </>)}
          </Grid>

          <Button component={Link} to='/' style={{ color: 'black', fontSize: '17px', padding: '30px' }} fullWidth>{t('Back to Home Page')}</Button>
        </Grid>
      </Box >
    </>
  )

}

