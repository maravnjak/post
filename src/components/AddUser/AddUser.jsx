import React, { useState } from 'react'
import { AppBar, Button,TextField, Toolbar,Stack } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'

const AddUser = () => {
  const { t } = useTranslation()

  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const addNewUser = () => {
    const name = newName.trim()
    const username = newUsername.trim()
    const email = newEmail.trim()

    if (name && username && email) {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          username,
          email,

        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setUsers([...users, data])
          setNewName('')
          setNewUsername('')
          setNewEmail('')
          toast.success(t('User added successfully'))
        })
    }
  }
  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button
          component={Link}
          to='/users'
          color='inherit'>
          {t('Back to List of Users')}
        </Button>
      </Toolbar>
    </AppBar>
    <Stack
      component='form'
      sx={{
        width: '35ch',
      }}
      direction='column'
      justifyContent='center'
      align='center'
      spacing={5}>
      <TextField
        multiline
        value={newName}
        onChange={e => setNewName(e.target.value)}
        placeholder={t('Add name here...')} />
      <TextField
        multiline
        placeholder={t('Add username here...')}
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)} />
      <TextField
        multiline
        placeholder={t('Add email here...')}
        value={newEmail}
        onChange={e => setNewEmail(e.target.value)} />

      <Button variant='outlinend' onClick={addNewUser}>{t('ADD USER')}</Button>
    </Stack></>
  )
}
export default AddUser
