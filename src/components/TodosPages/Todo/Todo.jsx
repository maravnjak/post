import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'

const Todo = (todo) => {
  const { t } = useTranslation()

  const todoId = todo.id
  const todoTitle = todo.title
  const { userId } = useParams()

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={8}>
        <Button
          LinkComponent={Link}
          size='large'
          color='inherit'
          to={{
            pathname: `/users/${userId}/todos/${todoId}`
          }}>

          <Typography variant='body2' color='#bdbdbd' noWrap> {todoId}/{t('Todo Title')}:</Typography><br/>
          <Typography variant='h6' color='text.primary' noWrap>{todoTitle}</Typography>
        </Button>
      </Grid>
    </Grid>
  )

}

export default Todo
