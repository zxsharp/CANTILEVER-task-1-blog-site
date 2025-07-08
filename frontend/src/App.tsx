import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { AuthProvider } from './components/AuthProvider'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreateBlog from './pages/CreateBlog'
import Feed from './pages/Feed'
import BlogDetail from './pages/BlogDetail'
import Bookmarks from './pages/Bookmarks'
import MyBlogs from './pages/MyBlogs'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-blog' element={<CreateBlog />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/blog/:id' element={<BlogDetail />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/my-blogs' element={<MyBlogs />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
