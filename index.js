const app = require('./app')

app.listen(process.env.port, () => {
  console.log("web running on "+process.env.port)
})