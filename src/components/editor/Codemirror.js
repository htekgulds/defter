import React from 'react'

import './Codemirror.reset.css'

export default class Codemirror extends React.Component {
  getCodeMirrorInstance = () => {
    return require('codemirror')
  }

  componentDidMount () {
    const codeMirrorInstance = this.getCodeMirrorInstance()
    this.codeMirror = codeMirrorInstance.fromTextArea(this.textArea, this.props.options)
    this.codeMirror.on('change', this.codemirrorValueChanged)
    this.codeMirror.setValue(this.props.defaultValue || this.props.value || '')
  }

  componentWillUnmount () {
    if (this.codeMirror) {
      this.codeMirror.toTextArea()
    }
  }

  getCodeMirror = () => {
    return this.codeMirror
  }

  codemirrorValueChanged = (doc, change) => {
    console.log(doc)
    console.log(change)
  }

  render() {
    return (
      <div style={{background: '#efefef'}}>
        <textarea ref={node => this.textArea = node} name="editor" id="editor" autoComplete="off" autoFocus={true} />
      </div>
    )
  }
}