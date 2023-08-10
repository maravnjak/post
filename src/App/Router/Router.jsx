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

import AlbumPage from 'components/AlbumsPages/AlbumPage/AlbumPage'

import TodoPage from 'components/TodosPages/TodoPage/TodoPage'

import Comments from 'components/PostsPages/Comments/Comments'

import Photos from 'components/AlbumsPages/Photos/Photos'

import PhotoPage from 'components/AlbumsPages/PhotoPage/PhotoPage'

import AddUser from 'components/AddUser/AddUser'

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
            <Route key='albums' path={'/users/:userId/albums'} element={<Albums />} />
            <Route key='album-page' path={'/users/:userId/albums/:albumId'} element={<AlbumPage/>} />
            <Route key='todos' path={'/users/:userId/todos/'} element={<Todos />} />
            <Route key='todo-page' path={'/users/:userId/todos/:todoId'} element={<TodoPage />} />
            <Route key='comments' path={'/users/:userId/posts/:postId/comments'} element={<Comments />} />
            <Route key='photos' path={'/users/:userId/albums/:albumId/photos'} element={<Photos />} />
            <Route key='photo-page' path={'/users/:userId/albums/:albumId/photos/:photoId'} element={<PhotoPage />} />
            <Route key='add-user' path='/add-user' element={<AddUser/>} />
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
