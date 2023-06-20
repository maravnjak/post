import React, { memo } from 'react'
import { useTranslation } from 'common/i18n'
import { Grid, Typography } from '@mui/material'

const Home = () => {

  const { t } = useTranslation()

  return (
    <Grid maxWidth='sm'>
      <Typography variant='h3' align='center' paddingTop='30px' bgcolor='background.paper'>{t('Welcome to Post')}</Typography>
    </Grid>
  )

}

export default memo(Home)
