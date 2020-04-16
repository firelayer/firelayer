let config = {}

try {
  config = JSON.parse(process.env.config)
} catch (error) {
  config = {}
}

export default config
