import React from 'react'
import { ipcRenderer } from 'electron'
import Codemirror from 'react-codemirror'

require('codemirror/mode/javascript/javascript')
require('codemirror/addon/selection/active-line')

export default class App extends React.Component {
  state = {
    data: null,
    height: window.innerHeight
  }

  updateCode = (code) => {
    this.setState({
      data: code
    })
  }

  updateHeightOnResize = () => {
    window.onresize = (e) => {
      this.setState({
        height: window.innerHeight
      })
    }
  }

  componentDidMount () {
    this.updateHeightOnResize()
    ipcRenderer.send('open-file')
    ipcRenderer.on('file-opened', (event, arg) => {
      this.editor
        .getCodeMirror()
        .setValue(arg)
    })
    ipcRenderer.on('file-open-error', (event, arg) => {
      window.alert('Dosya açılırken hata oluştu: ' + JSON.stringify(arg))
    })
  }

  render () {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'oceanic-next',
      autofocus: true,
      dragDrop: false,
      styleActiveLine: true
    }

    return (
      <main>
        <div style={{height: this.state.height}}>
          <Codemirror ref={node => this.editor = node}
                      className="markdown-editor"
                      codeMirrorInstance={require('codemirror')}
                      defaultValue={this.state.data}
                      onChange={this.updateCode}
                      options={options}/>
        </div>
      </main>
    )
  }
}