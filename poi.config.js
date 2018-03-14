module.exports = {
  webpack(config) {
    config.target = 'electron-renderer'
    return config
  },
  homepage: './',
  entry: 'src/index.js',
  presets: [
    require('poi-preset-react')()
  ]
}