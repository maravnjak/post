import React from 'react'
import { useParams } from 'react-router-dom'
import { IconButton, ImageList, ImageListItemBar, ImageListItem, Grid } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useTranslation } from 'common/i18n'

const Photo = (photo) => {
  const { t } = useTranslation()

  const { userId, albumId } = useParams()
  const photoId = photo.id
  return (
    <Grid mr={-28}>
      <ImageList>
        <ImageListItem key={photoId}>
          <img
            src={`${photo.thumbnailUrl}`}
            alt={photo.title}
          />
          <ImageListItemBar
            title={photo.title}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${photo.title}`}
                href={`/users/${userId}/albums/${albumId}/photos/${photoId}`}>
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>

      </ImageList>
    </Grid>
  )

}

export default Photo
