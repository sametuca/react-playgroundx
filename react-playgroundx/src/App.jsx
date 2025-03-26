import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './App.css'
import UserList from './components/User/UserList'
import UserDetail from './components/User/UserDetail'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Router>
      <nav>
        <Link to="/">{t('welcome')}</Link> | <Link to="/users">{t('users')}</Link>
        <div style={{ float: 'right' }}>
          <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">{t('english')}</option>
            <option value="tr">{t('turkish')}</option>
          </select>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App
