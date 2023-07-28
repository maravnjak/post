import React from 'react'
import { Card, CardHeader, CardContent,Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'

import { MailTwoTone } from '@mui/icons-material'

export default function UserCard({ user }) {
  const { t } = useTranslation()

  return (

    <Card elevation={1}>
      <CardHeader

        action={
          <Typography
            variant='h6'
            component='a'
            color='inherit'
            mr={13}
            href={`/users/${user.id}`}
          >{user.name}
          </Typography>
        }
      />
      <CardContent>

        <Typography variant='body2' color='text.primary'>
          <Typography paragraph>{t('Username')} {user.username}</Typography>

        </Typography>
        <MailTwoTone /> email:<br />
        {user.email}

      </CardContent>
    </Card>

  )
}

UserCard.propTypes = {
  user: PropTypes.any.isRequired
}
