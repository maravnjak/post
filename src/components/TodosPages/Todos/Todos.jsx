import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, AppBar, Accordion, AccordionSummary, AccordionDetails, Box, Button, ButtonGroup, Grid, Snackbar,TextField, Toolbar, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'
import DeleteBtn from 'components/DeleteBtn/DeleteBtn'
import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay'
import apiServiceTodos from 'services/apiServiceTodos'

import Todo from '../Todo/Todo'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'

export default function Todos() {
  const { t } = useTranslation()
  //const userNameAtom = useRecoilValue(nameAtom)

  const [todos, setTodos] = useState([])
  console.log('TODOS = ', todos)
  const { userId, todoId } = useParams()
  const [open, setOpen] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [title, setTitle] = useState()
  const [displayError, setDisplayError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${userId}`)
      .then((response) => {
        console.log('resolved', response)
        return response.json()
      }).then(data => {
        console.log(data)
        setTodos(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [userId])

  const createTodoTitle = () => {
    const title = newTodoTitle.trim()
    setIsLoading(true)
    try {
      apiServiceTodos.createTodo({ title })
      setTodos([...todos, { id: lastId + 1, title }])
      setNewTodoTitle(newTodoTitle)
    } catch (displayError) {
      setDisplayError(t('Todo title is created successfully.'))
    }
  }
  const handleClearCreate = () => {
    setNewTodoTitle('')
  }
  const lastId = todos.reduce((previousValue, currentValue) => {
    if (previousValue < currentValue.id) {
      return currentValue.id
    }
    return previousValue
  }, 0)

  const deletedTodo = async (todoId) => {
    setIsLoading(true)
    try {
      await apiServiceTodos.deleteTodo(todoId)
      setTodos(todos => {
        return todos.filter(todo => todo.id !== todoId)
      })
      setDisplayError(t(`Todo title ${todoId} is deleted successfully.`))

    } catch (displayError) {
      setDisplayError(null)

    }
    setIsLoading(false)
  }
  const onChangeHandler = (id,key, event) => {
    setTitle({ ...title, [key]: event.target.value })
  }
  const handleOpen = (event) =>{
    setOpen(true,event)
  }
  const handleClose = (event, reason) => {
    setDisplayError(null)
    if (reason === 'clickaway',event) {
      return
    }
    setOpen(false)
  }

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>

        <ButtonGroup variant='text' color='inherit'>

          <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>

          <Button LinkComponent={Link}
            to={{ pathname: `/users/${userId}/posts` }}>
            {t('Posts')}
          </Button>

          <Button LinkComponent={Link}
            to={{ pathname: `/users/${userId}/albums` }}>
            {t('Albums')}
          </Button>
        </ButtonGroup>

      </Toolbar>
    </AppBar>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columnSpacing={1}>

        {userId &&
                    <><Accordion
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        borderRadius: 2,
                        p: 2,
                        minWidth: 800,
                      }}>

                      <AccordionSummary
                        aria-controls="panel-content"
                        id="panel-header"
                      >
                        <Grid item spacing={3}>
                          <Typography>
                            <UserUsername userId={userId} />
                          </Typography>
                          <Typography variant='h6' color='#bdbdbd'>{t('Todos')}<ExpandMoreIcon /></Typography>
                        </Grid>

                        {/* <Typography m={3}>{userNameAtom}</Typography> */}

                      </AccordionSummary>
                      <AccordionDetails>

                        <Grid item xs={6} md={8}>
                          <TextField
                            multiline
                            placeholder={t('Create todo title')}
                            value={newTodoTitle}
                            onChange={event => {
                              onChangeHandler(todoId, 'title', event)
                              setNewTodoTitle(event.target.value)
                            }} />
                          <ButtonGroup variant='text' color='inherit' size='small'>
                            <Button onClick={()=>createTodoTitle(title)}>{t('Create Title')}</Button>
                            <Button onClick={handleClearCreate}>{t('Clear Text Field')}</Button>
                          </ButtonGroup>

                          {todos.map((todo)=>
                            (<><Todo key={todoId} {...todo} />

                              <Grid item xs={1}>
                                <Button variant='text' onClick={handleOpen}>
                                  <DeleteBtn handleDelete={() => deletedTodo(todo.id)} />
                                </Button>
                                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                  <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                                    <ErrorDisplay displayError={displayError} />
                                  </Alert>
                                </Snackbar>
                              </Grid>
                            </>
                            ))}
                        </Grid>
                      </AccordionDetails>

                    </Accordion></>}
      </Grid>
    </Box></>
  )
}
