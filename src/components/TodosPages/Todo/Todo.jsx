import React from 'react'
import { Button, Typography } from '@mui/material'
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
    <>
      <Typography mr={18} mb={2} color='#bdbdbd'>{todoId}
        <Button
          LinkComponent={Link}
          style={{ color: 'black', fontSize: '20px', justify: 'center' }}
          to={{
            pathname: `/users/${userId}/todos/${todoId}` }}>
          {todoTitle}
        </Button></Typography></>
  )

}

export default Todo
