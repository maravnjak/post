import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppBar, Accordion, AccordionSummary, AccordionDetails, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'

export default function TodoPage() {
  const { t } = useTranslation()
  const { userId, todoId } = useParams()
  const [todo, setTodo] = useState([])

  const getApiData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    response = await response.json()
    console.log(response)
    setTodo(response)
  }
  useEffect(() => {
    getApiData()
  }, [todoId])
  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button
          component={Link}
          to='/users'
          size='large'
          color='inherit'>
          {t('Users')}
        </Button>
      </Toolbar>
    </AppBar>

    <Grid>
      <Typography align='right' color='#bdbdbd'>
        <ButtonGroup variant='text' color='inherit' mr='10px'>
          <Button LinkComponent={Link}
            to={{ pathname: `/users/${userId}/posts` }}>
            {t('Posts')}
          </Button>

          <Button LinkComponent={Link}
            to={{
              pathname: `/users/${userId}/albums`
            }}>
            {t('Albums')}
          </Button>
        </ButtonGroup>
      </Typography>

      {userId &&
<><Accordion
  sx={{
    bgcolor: 'background.paper',
    boxShadow: 3,
    borderRadius: 2,
    p: 2,
    minWidth: 300,
  }}>

  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls='panel-content'
    id='panel-header'>

    <Button LinkComponent={Link}
      variant='text'
      color='inherit'
      to={{
        pathname: `/users/${userId}/todos`
      }}>
      {t('Show All Todos')}
    </Button>
    <Typography>
      <UserUsername userId={userId} />
    </Typography>
  </AccordionSummary>
  <AccordionDetails>

    <Typography
      variant='paragraph'
      color='inherit' ml={50}
      gutterBottom>
      {t('Todo Title')}
    </Typography>
    <Typography variant='h6' align='center'>
      {todo.title}
    </Typography>
  </AccordionDetails>
</Accordion></>}
    </Grid></>
  )
}

