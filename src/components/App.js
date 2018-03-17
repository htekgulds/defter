import React from 'react'
import { ipcRenderer } from 'electron'
import Codemirror from 'react-codemirror'

require('codemirror/mode/markdown/markdown')

export default class App extends React.Component {
  state = {
    data: 'No Content Yet...'
  }

  updateCode = (code) => {
    this.setState({
      data: code,
      height: window.innerHeight
    })
  }

  componentDidMount () {
    window.onresize = (e) => {
      this.setState({
        height: window.innerHeight
      })
    }
    this.setState({
      height: window.innerHeight
    })
    ipcRenderer.send('open-file')
    ipcRenderer.on('file-opened', (event, arg) => {
      this.editor
        .getCodeMirror()
        .setValue(arg)
    })
    ipcRenderer.on('file-open-error', (event, arg) => {
      this.editor
        .getCodeMirror()
        .setValue(arg)
    })
  }

  render () {
    const options = {
      lineNumbers: true,
      mode: 'markdown'
    }

    return (
      <main>
        <div style={{height: this.state.height}}>
          <Codemirror ref={node => this.editor = node}
                      className="markdown-editor"
                      codeMirrorInstance={require('codemirror')}
                      defaultValue={this.state.data}
                      options={options}/>
        </div>
      </main>
    )
  }
}