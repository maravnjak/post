import React from 'react'
import { IconButton, ImageList, ImageListItemBar, ImageListItem, Grid } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

//import useQuery from 'components/useQuery/useQuery'
import { useTranslation } from 'common/i18n'

const Photo = (photo) => {
  const { t } = useTranslation()

  //const query = useQuery()
  //const username = query.get('username')
  return (
    <Grid mr={-28}>
      <ImageList>
        <ImageListItem key={photo.id}>
          <img
            src={`${photo.url}`}
            alt={photo.title}
          />
          <ImageListItemBar
            title={photo.title}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${photo.title}`}>
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
