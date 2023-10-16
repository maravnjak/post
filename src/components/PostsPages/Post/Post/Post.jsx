import React from 'react'
import { Button, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'common/i18n'

const Post = (post) => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const postId = post.id
  const postTitle = post.title

  return (
    <>
      <Typography mr={18} mb={2} color='#bdbdbd'>
        {postId}
        <Button
          LinkComponent={Link}
          size='large'
          color='inherit'
          to={{
            pathname: `/users/${userId}/posts/${postId}`
          }}>
          {postTitle}
        </Button>
      </Typography></>
  )

}

export default Post

