import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import Users from 'components/Users/Users'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'
import PostPage from 'components/PostsPages/PostPage/PostPage'
import Detail from 'components/Detail/Detail'

import Posts from 'components/PostsPages/Posts/Posts'
import Albums from 'components/AlbumsPages/Albums/Albums'

import Todos from 'components/TodosPages/Todos/Todos'

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
            <Route key='detail' path={'/users/:userId'} element={<Detail />} />
            <Route key='posts' path={'/users/:userId/posts'} element={<Posts />} />
            <Route key='post-page' path={'/users/:userId/posts/:postId'} element={<PostPage/>} />
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
