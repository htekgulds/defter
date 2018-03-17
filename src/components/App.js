import React from 'react'
import {ipcRenderer} from 'electron'

import styles from './App.module.css'

export default class App extends React.Component {
  state = {
    data: 'No Content Yet...'
  }

  componentDidMount() {
    ipcRenderer.send('open-file')
    ipcRenderer.on('file-opened', (event, arg) => {
      this.setState({
        data: arg
      })
    })
    ipcRenderer.on('file-open-error', (event, arg) => {
      console.error(arg)
      this.setState({
        data: 'Dosya okunamadı!'
      })
    })
  }

  render() {
    return (
      <main className={styles.main}>
        <h1>Hello Electron Editor!</h1>
        <div>
          {this.state.data}
        </div>
      </main>
    )
  }
}