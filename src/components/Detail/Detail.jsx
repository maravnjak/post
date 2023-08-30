import React,{ useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppBar, Box, Button,ButtonGroup,Container, Grid,Tab, Tabs,TextField,Toolbar, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'common/i18n'
import { Phone } from '@mui/icons-material'
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp'
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp'
import TabPanel from 'components/TabPanel/TabPanel'
import allyProps from 'components/TabPanel/allyProps/allyProps'
import { toast } from 'react-hot-toast'

// import { useRecoilState } from 'recoil'
// import { nameAtom } from 'store/atoms/shared.atom'

export default function Detail() {
  const { t } = useTranslation()
  console.log( ' ....DETAiL....')
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [value, setValue] = useState(0)
  // const [userNameAtom, setUserNameAtom] = useRecoilState(nameAtom)
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
    event.preventDefault()
    setValue(newValue)
  }
  const updateUser = ()=> {
    //const user = users.find(user => user.id === id)
    let { website, phone } = user
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ website, phone }),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(() => {

      })
    toast.success(t('User updated successfully.'))

  }

  const onChangeHandler = (id,key, event) => {
    setUser({ ...user, [key]: event.target.value })

  }

  return (
    <><AppBar color='grey'>
      <Toolbar variant='prominent'>
        <Button component={Link} to='/users' size='large' color='inherit'>{t('Users')}</Button>
      </Toolbar>
    </AppBar><>

      <Container sx={{ maxWidth: 'xl', maxHeight: '100%', typography: 'body2', borderBottom: 1, borderColor: 'divider', bgcolor: '#bcd' }}>

        <Box sx={{ width: 600, height: 600, }}>

          <Grid>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor='inherit'
              centered>

              <Tab icon={<ContactsSharpIcon />} label={t('Name')} {...allyProps(0)} />
              <Tab icon={<LanguageSharpIcon />} label={t('Website')} {...allyProps(1)} />
              <Tab icon={<Phone />} label={t('phone')} {...allyProps(2)} />

            </Tabs>
            <Grid container spacing={1}>
              <TabPanel value={value} index={0}>
                <Typography
                  variant='h2'
                  color='text.primary'>
                  {userName}
                </Typography>
              </TabPanel>

              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} textAlign={'center'}>
                <TabPanel value={value} index={1}>
                  {/* <Typography
                    fontStyle='oblique'
                    color='text.disabled'
                    fontSize='20px' display='flex'
                    flexDirection={1} ml='220px'>
                    {user.website}
                  </Typography> */}

                  <Grid item xs={6} ml={25}>
                    <TextField
                      multiline
                      placeholder={t('Update website')}
                      value={user.website}
                      onChange={event => onChangeHandler(userId, 'website', event)} />

                    <Button onClick={() => updateUser(userId)}>{t('Update')}</Button>

                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={2}>

                  {/* <Typography
                    variant='body2'
                    color='grey'
                    fontSize='17px'>
                    {user.phone}
                  </Typography> */}
                  <Grid item ml={40}>
                    <TextField
                      multiline
                      placeholder={t('Update phone')}
                      value={user.phone}
                      onChange={event => onChangeHandler(userId, 'phone', event)} />

                    <Button onClick={() => updateUser(userId)}>{t('Update')}</Button>

                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>

        </Box>

      </Container>

      <ButtonGroup color='inherit' aria-label='medium secondary button group'>
        <Button
          LinkComponent={Link}
          to={{
            pathname: `/users/${userId}/posts`
            //, search: `?username=${userName}`
          }}
        >
          {t('Posts')}
        </Button>

        <Button LinkComponent={Link}
          to={{
            pathname: `/users/${userId}/albums`
            //, search: `?username=${userName}`
          }}>
          {t('Albums')}
        </Button>

        <Button LinkComponent={Link}
          to={{
            pathname: `/users/${userId}/todos`
            //, search: `?username=${userName}`
          }}>
          {t('Todos')}
        </Button>

      </ButtonGroup></></>
  )
}

Detail.propTypes = {
  id: PropTypes.number.isRequired

}
