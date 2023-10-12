import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
//import useQuery from 'components/useQuery/useQuery'
import { useTranslation } from 'common/i18n'

const Todo = (todo) => {
  const { t } = useTranslation()

  const todoId = todo.id
  const todoTitle = todo.title
  const { userId } = useParams()
  //const query = useQuery()
  //const username = query.get('username')

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={6}>
        <Typography color='#bdbdbd'>{todoId}
          <Button
            LinkComponent={Link}
            size='large'
            color='inherit'
            to={{
              pathname: `/users/${userId}/todos/${todoId}`
            }}>
            <Typography variant='body2' noWrap>{t('Todo Title')}:</Typography>
            <Typography variant='h6' color='text.primary' noWrap>{todoTitle}</Typography>
          </Button>
        </Typography>
      </Grid>
    </Grid>
  )

}

export default Todo
