import React, { useState } from 'react'
import { AppBar,ButtonGroup, Button,TextField, Toolbar,Stack } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'common/i18n'
import { Link } from 'react-router-dom'
import apiServiceUsers from 'services/apiServiceUsers'
import validator from 'validator'

const AddUser = () => {
  const { t } = useTranslation()

  const [users, setUsers] = useState([])
  const [displayError, setDisplayError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const addNewUser = () => {
    const name = newName.trim()
    const username = newUsername.trim()
    const email = newEmail.trim()

    setIsLoading(true)
    try {
      apiServiceUsers.createUser({ name, username, email })
      setUsers([...users, { id: lastId + 1, name, username, email }])
      setNewName(newName)
      setNewUsername(newUsername)
      setNewEmail(newEmail)

    } catch (displayError) {
      setDisplayError(null)

    }

    if (newName === '') {
      toast.error(t('Name is required'))
    }
    if (newUsername === ''){
      toast.error(t('Userame is required'))
    } else
    if (newUsername.length < 4) {
      toast.error(t('Userame is too short'))
    }
    if (newEmail === '') {
      toast.error(t('Email is required'))
    }
    if (validator.isEmail(newEmail)) {
      toast.error(t('Valid Email'))
    } else {
      toast.error(t('Enter valid Email: user@gmail.com'))
    }

    if (newName && newUsername.length > 4 && validator.isEmail(newEmail)) {
      toast.success(t('User added successfully'))
    }

    setIsLoading(false)
  }

  const lastId = users.reduce((previousValue, currentValue) => {
    if (previousValue < currentValue.id) {
      return currentValue.id
    }
    return previousValue
  }, 0)

  const handleClear = () => {
    setNewName('')
    setNewUsername('')
    setNewEmail('')
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

      <ButtonGroup color='inherit' variant='text' size='small'>
        <Button onClick={addNewUser}>{t('ADD USER')}</Button>
        <Button onClick={handleClear}>{t('Clear Text Field')}</Button>
      </ButtonGroup>
    </Stack></>
  )
}
export default AddUser

