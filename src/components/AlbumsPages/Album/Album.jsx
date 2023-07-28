import React from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { useTranslation } from 'common/i18n'

const Album = (album) => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const albumTitle = album.title
  const albumId = album.id
  return (
    <Box>
      <Typography mt={3}>
        <LibraryBooksIcon fontSize='small'/> {albumId}*{t('Album Title')}
      </Typography>
      <Typography
        component='a'
        color='inherit'
        textDecorationLine='none'
        href={`/users/${userId}/albums/${albumId}`
          //   , search: `?albumTitle=${albumTitle}`
        }>

        <Typography variant='h5'
          color='text.primary'>
          {albumTitle}

        </Typography>
      </Typography>

    </Box>
  )

}

export default Album
