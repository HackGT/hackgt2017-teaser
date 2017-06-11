const fs = require('fs')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/teaser2017';
const db = require('monk')(url)
db.then(() => {
  console.log('Connected to mongo database')
}).catch((err) => {
  console.error(err)
  throw err
}) // TODO figure out how to quit page
const people = db.get('people')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('combined'))

app.use(express.static('static'))

const schools = JSON.parse(fs.readFileSync('data/schools.json'))

const apiRouter = express.Router()
app.use('/api', apiRouter)

apiRouter.get('/', function(req, res) {
  res.send('Hello, HackGT. Status OK')
})

apiRouter.post('/preregister', function(req, res) {
  console.log(req.body)
  function isValidEmail(emailAddr) {
    // TODO implement this
    return true
  }

  const email = req.body.email
  const school = req.body.school

  if (!email) {
    res.status(400).json({ error: 'Missing Email Address' })
    return
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Email address not valid' })
    return
  }

  if (!school) {
    res.status(400).json({ error: 'Missing School' })
    return
  }

  people.findOne({ email: email }).then((person) => {
    if (person) {
      res.status(400).json({ error: '\'' + email + '\' has already been recorded' })
      return
    }

    people.insert({ email: email, school: school }).then((err, result) => {
      console.log(err, result)
      res.json({ success: true })
      return
    })
  })
})

apiRouter.post('/school-hint', function(req, res) {
  const frag = (req.body.school || '').toLowerCase()

  if (!frag) {
    res.status(400).json({ error: 'nothing to hint' })
    return
  }

  if (frag.length <= 3) {
    res.json({ hints: [], message: 'need more than 3 letters' })
    return
  }

  res.json({ hints: schools.filter((name) => (name.length >= frag.length && name.substring(0, frag.length).toLowerCase() == frag)) })
})

app.listen(3000, function() {
  console.log('Server started on port 3000')
})
