import React from 'react'
import {ipcRenderer} from 'electron'

import styles from './App.module.css'
import Codemirror from 'react-codemirror'

require('codemirror/mode/markdown/markdown')

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
    const options = {
      lineNumbers: true,
      mode: 'markdown'
    }

    return (
      <main className={styles.main}>
        <h1 style={{textAlign: 'center'}}>Electron Text Editor</h1>
        <div className={styles.editor}>
          <Codemirror ref={node => this.editor = node}
                      codeMirrorInstance={require('codemirror')}
                      defaultValue={this.state.data}
                      options={options}/>
        </div>
      </main>
    )
  }
}