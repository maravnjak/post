import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppBar, Accordion, AccordionSummary, AccordionDetails, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'

import Todo from '../Todo/Todo'
// import { useRecoilValue } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'

export default function Todos() {
  const { t } = useTranslation()
  //const userNameAtom = useRecoilValue(nameAtom)

  const [todos, setTodos] = useState([])
  console.log('TODOS = ', todos)
  const { userId, todoId } = useParams()

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
  return (
    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
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
            to={{ pathname: `/users/${userId}/albums` }}>
            {t('Albums')}
          </Button>
        </ButtonGroup>
      </Typography>

      {userId &&
                    <><Accordion
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        minWidth: 300,
                      }}>

                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel-header"
                      >
                        <Typography variant='h6' color='#bdbdbd'>{t('Todos')}</Typography>
                        {/* <Typography m={3}>{userNameAtom}</Typography> */}
                        <Typography>
                          <UserUsername userId={userId} />
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {todos.map((todo)=>
                          (<><Todo key={todoId} {...todo} /><Typography variant='h5' align='center'>
                          </Typography></>
                          ) )}
                      </AccordionDetails>

                    </Accordion></>}

      <Button LinkComponent={Link}
        to='/users'
        style={{ color: 'ActiveBorder', fontSize: '17px', align: 'center', padding: '30px' }} fullWidth>
        {t('Back to List of Users')}
      </Button>
    </Grid></>
  )
}
