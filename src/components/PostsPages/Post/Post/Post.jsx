import React from 'react'
import { Button, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
//import useQuery from 'components/useQuery/useQuery'
import { useTranslation } from 'common/i18n'

const Post = (post) => {
  const { t } = useTranslation()

  const postId = post.id
  const postTitle = post.title
  const { userId } = useParams()
  //const query = useQuery()
  //const username = query.get('username')

  return (
    <>
      <Typography mr={18} mb={2} color='#bdbdbd'>{postId}
        <Button
          LinkComponent={Link}
          size='large'
          color='inherit'
          to={{
            pathname: `/users/${userId}/posts/${postId}`
            // search: `?username=${username}&postTitle=${postTitle}&postBody=${postBody}`
          }}>
          {postTitle}

        </Button>
      </Typography></>
  )

}

export default Post

