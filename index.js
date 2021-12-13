// untuk redirect ke protokol HTTPS
function requireHttps (req, res, next) {
  // jika tidak secure...
  // Note: Heroku membutuhkan header 'x-forwarded-proto'
  //       jadi kita harus tambahkan di kondisi berikut
  if (!req.secure && req.get('x-forwarded-proto') !== 'https')
    return res.redirect('https://' + req.get('host') + req.url)

  next()
}

const express = require('express')
const app = express()

// penerapan middleware
app.use(requireHttps);
app.use(express.static('./dist/test-angular-deployment'))

// handle request
// method GET
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/test-angular-deployment' })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`App is ready at http://localhost:${port}`)
})
