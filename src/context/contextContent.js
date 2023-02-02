import React from 'react'

const AppTheme = React.createContext({
  lightTheme: true,
  savedVideos: [],
  addSavedVideos: () => {},
  onChangeTheme: () => {},
})

export default AppTheme
