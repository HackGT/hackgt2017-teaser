const app = require('express')()
const bodyParser = require('body-parser')

const url = 'mongodb://localhost:27017/teaser2017'
const db = require('monk')(url)
const people = db.get('people')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.send('Hello, HackGT. Status OK')
})

function isValidEmail(emailAddr) {
  // TODO implement this
  return true
}

app.post('/preregister', function(req, res) {
  const email = req.body.email
  const school = req.body.school
  
  if (!email) {
    res.status(400).json({ error: 'email missing' })
    return
  }
  
  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'email not valid' })
    return
  }
  
  if (!school) {
    res.status(400).json({ error: 'school missing' })
    return
  }
  
  people.findOne({ email: email }).then((person) => {
    if (person) {
      res.status(400).json({ error: 'email already recorded' })
      return
    }

    people.insert({ email: email, school: school }).then((err, result) => {
      console.log(err, result)
      res.json({ success: true })
      return
    })
  })
})



app.listen(3000, function() {
  console.log('Server started on port 3000')
})
