import React,{ useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppBar, Box, Button,ButtonGroup,Container, Grid,Tab, Tabs,Toolbar, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'
import { Phone } from '@mui/icons-material'
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp'
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp'
import TabPanel from 'components/TabPanel/TabPanel'
import allyProps from 'components/TabPanel/allyProps/allyProps'
// import { useRecoilState } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'

export default function Detail() {
  const { t } = useTranslation()
  console.log( ' ....DETAiL....')
  const { userId, id } = useParams()

  const [user, setUser] = useState([])
  const [value, setValue] = useState(0)
  // const [userNameAtom, setUserNameAtom] = useRecoilState(nameAtom)
  const [setUserName] = useState()
  const userName = user.name
  console.log('setUserName detil = ', userName)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        console.log('resolved', response)
        return response.json()
      }).then(data => {
        console.log(data)
        setUser(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [userId])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleButton = (event) => {
    setUserName(event.target.value)
  }
  return (
    <><AppBar position='absolute' color='grey'>
      <Toolbar variant='dense'>
        <Button component={Link} to='/users' style={{ color: 'grey', fontSize: '17px' }}>{t('Users')}</Button>
      </Toolbar>
    </AppBar><>

      <Container sx={{ maxWidth: 'xl', maxHeight: '100%', typography: 'body2', borderBottom: 1, borderColor: 'divider', bgcolor: '#bcd' }}>

        <Box sx={{ width: 600, height: 600, }}>

          {(id || userName) && (<Grid>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor='black'
              centered>

              <Tab icon={<ContactsSharpIcon />} label={t('Name')} {...allyProps(0)} />
              <Tab icon={<LanguageSharpIcon />} label={t('Website')} {...allyProps(1)} />
              <Tab icon={<Phone />} label={t('phone')} {...allyProps(2)} />

            </Tabs>

            <TabPanel value={value} index={0}>
              <Typography
                variant='h2'
                color='text.primary'
                display='flex' flexDirection={1} m='60px'>
                {userName}
              </Typography>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Typography
                fontStyle='oblique'
                color='text.disabled'
                fontSize='20px' display='flex'
                flexDirection={1} ml='220px'>
                {user.website}
              </Typography>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Typography
                variant='body2'
                color='grey'
                fontSize='17px'
                display='flex'
                flexDirection={1}
                ml='320px'>
                {user.phone}
              </Typography>
            </TabPanel>

          </Grid>)}

        </Box>

      </Container>

      <ButtonGroup color='inherit' aria-label='medium secondary button group'>

        <Button
          onClick={handleButton}
          LinkComponent={Link}
          to={{ pathname: 'posts', search: `?username=${userName}` }}

        >
          {t('Posts')}
        </Button>

        <Button LinkComponent={Link}
          to={{ pathname: 'albums', search: `?username=${userName}` }}>
          {t('Albums')}
        </Button>

        <Button LinkComponent={Link}
          to={{ pathname: 'todos', search: `?username=${userName}` }}>
          {t('Todos')}
        </Button>

      </ButtonGroup></></>
  )
}

Detail.propTypes = {
  id: PropTypes.number.isRequired
}

