import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import './styles.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { t } from './motion'
import Home from './pages/Home'
import About from './pages/About'
import Episodes from './pages/Episodes'
import QuickAnswers from './pages/QuickAnswers'
import Guests from './pages/Guests'
import Collaboration from './pages/Collaboration'
import Contact from './pages/Contact'

// Pages whose top section is dark (nav starts white-on-dark)
const DARK_TOP = ['/', '/about', '/collaboration']

const routes = [
  { path: '/', el: <Home /> },
  { path: '/about', el: <About /> },
  { path: '/episodes', el: <Episodes /> },
  { path: '/quick-answers', el: <QuickAnswers /> },
  { path: '/guests', el: <Guests /> },
  { path: '/collaboration', el: <Collaboration /> },
  { path: '/contact', el: <Contact /> },
]

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: t.slow }}
      exit={{ opacity: 0, transition: t.exit }}
    >
      {children}
      <Footer />
    </motion.main>
  )
}

function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return (
    <MotionConfig reducedMotion="user">
      <Nav key={location.pathname} tone={DARK_TOP.includes(location.pathname) ? 'dark' : 'light'} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map((r) => <Route key={r.path} path={r.path} element={<Page>{r.el}</Page>} />)}
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
