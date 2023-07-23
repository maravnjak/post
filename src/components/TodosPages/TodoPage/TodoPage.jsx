import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppBar, Accordion, AccordionSummary, AccordionDetails, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'common/i18n'
import UserUsername from 'components/UserUsername/UserUsername'
// import { useRecoilValue } from 'recoil'
// import useQuery from 'components/useQuery/useQuery'

// import { nameAtom } from 'store/atoms/shared.atom'

export default function TodoPage() {
  const { t } = useTranslation()
  //const userNameAtom = useRecoilValue(nameAtom)

  const [todo, setTodo] = useState([])

  const { userId, todoId } = useParams()
  //   const query = useQuery()
  //   const username = query.get('username')

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
            to={{
              pathname: `/users/${userId}/albums`
              //, search: `?username=${username}`
            }}>
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
    aria-controls='panel-content'
    id='panel-header'
  >
    <Button LinkComponent={Link}
      to={{
        pathname: `/users/${userId}/todos`
        //, search: `?username=${username}`
      }}
      variant='text' color='inherit' font>
      {t('Show All Todos')}
    </Button>
    {/* <Typography m={3}>//{userNameAtom}</Typography> */}
    <Typography>
      <UserUsername userId={userId} />
    </Typography>
  </AccordionSummary>
  <AccordionDetails>

    <Typography variant='h6' >
      {todo.title}
    </Typography>
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

