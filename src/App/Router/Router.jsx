import React, { Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import Users from 'components/Users/Users'
import Loading from 'components/Loading'
import Header from 'components/Header'
import PropTypes from 'prop-types'

import Detail from 'components/Detail/Detail'

import Posts from 'components/Posts/Posts'

import Albums from 'components/Albums/Albums'

import Todos from 'components/Todos/Todos'

import styles from './Router.styles'

const Home = React.lazy(() => import('./Home'))

const useStyles = createUseStyles(styles)
const Router = ({ isLoading }) => {
  const classes = useStyles()

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Suspense fallback='Loading...'>
          <Routes>
            <Route key='home' path='/' element={<Home />} />
            <Route key='users' path='/users' element={<Users />} />
            <Route key='detail' path={'/detail/:id'} element={<Detail />} />
            <Route key='posts' path={'/posts/:userId'} element={<Posts />} />
            <Route key='albums' path={'/albums/:userId'} element={<Albums />} />
            <Route key='todos' path={'/todos/:userId'} element={<Todos />}/>
          </Routes>
        </Suspense>

      </div>

    </div>
  )
}

Router.propTypes = {
  isLoading: PropTypes.bool
}

Router.defaultProps = {
  isLoading: false
}

export default Router
