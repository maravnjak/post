import React, { Fragment } from 'react'
import { Button, CardContent, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

const Album = (album) => {
  const albumId = album.id
  const { userId } = useParams()
  const albumTitle = album.title
  return (

    <Fragment>
      <CardContent>

        <Typography variant="h5">
        </Typography>
        <Typography color="text.secondary">
          {albumId}
          <Button
            LinkComponent={Link}
            style={{ color: 'black', fontSize: '15px', justify: 'center' }}
            to={{
              pathname: `/users/${userId}/albums/${albumId}`
              //   , search: `?albumTitle=${albumTitle}`
            }}>
            {albumTitle}
          </Button></Typography>

      </CardContent>
    </Fragment>
  )

}

export default Album
