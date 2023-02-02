import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import contextContent from './context/contextContent'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'

class App extends Component {
  state = {
    lightTheme: true,
    savedVideos: [],
  }

  onChangeTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  addSavedVideos = async data => {
    const {savedVideos} = this.state
    if (savedVideos.length > 0) {
      const checkSavedVideos = savedVideos.filter(item => item.id === data.id)
      if (checkSavedVideos.length === 0) {
        await this.setState({
          savedVideos: [...savedVideos, data],
        })
      }
    } else {
      await this.setState({
        savedVideos: [...savedVideos, data],
      })
    }
  }

  render() {
    const {lightTheme, savedVideos} = this.state
    const bgColor = lightTheme ? 'light' : 'dark'
    return (
      <contextContent.Provider
        value={{
          lightTheme,
          savedVideos,
          addSavedVideos: this.addSavedVideos,
          onChangeTheme: this.onChangeTheme,
        }}
      >
        <div
          className="app-container"
          className={`${bgColor} main-frame-container`}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <div>
              <ProtectedRoute exact path="/" component={Home} />
            </div>
          </Switch>
        </div>
      </contextContent.Provider>
    )
  }
}

export default App
