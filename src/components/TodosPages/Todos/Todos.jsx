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
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>

        <ButtonGroup variant='text' color='inherit' mr='10px'>

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

    <Grid>

      {userId &&
                    <><Accordion
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        minWidth: 800,
                      }}>

                      <AccordionSummary

                        aria-controls="panel-content"
                        id="panel-header"
                      >
                        <Grid spacing={3}>
                          <Typography>
                            <UserUsername userId={userId} />
                          </Typography>
                          <Typography variant='h6' color='#bdbdbd' mr={30}>{t('Todos')}<ExpandMoreIcon /></Typography>
                        </Grid>

                        {/* <Typography m={3}>{userNameAtom}</Typography> */}

                      </AccordionSummary>
                      <AccordionDetails>
                        {todos.map((todo)=>
                          (<><Todo key={todoId} {...todo} /></>
                          ) )}
                      </AccordionDetails>

                    </Accordion></>}
    </Grid></>
  )
}
