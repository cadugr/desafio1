const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const queryParamsMiddleware = (req, res, next) => {
  if (req.query.age) {
    return next()
  } else {
    res.redirect('/')
  }
}

app.get('/', (req, res) => {
  return res.render('main')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect('/major?age=' + req.body.age)
  } else {
    return res.redirect('/minor?age=' + req.body.age)
  }
})

app.get('/major', queryParamsMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', queryParamsMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3000)
