import React, { Fragment } from 'react'
import { CardContent, Typography } from '@mui/material'

const Album = (album) => {
  const albumId = album.id
  return (

    <Fragment>
      <CardContent>

        <Typography variant="h5">
        </Typography>
        <Typography color="text.secondary">
          {albumId}/{album.title}
        </Typography>
      </CardContent>
    </Fragment>
  )

}

export default Album
