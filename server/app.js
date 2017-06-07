const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.send('Hello, HackGT. Status OK')
})

function isValidEmail(emailAddr) {
  // TODO implement this
  return true
}

// TODO this is SUPER temporary
const people = new Set()

app.post('/preregister', function(req, res) {
  const email = req.body.email
  const school = req.body.school
  
  if (!email) {
    res.status(400)
    res.json({error: 'email missing'})
    return
  }
  
  if (!isValidEmail(email)) {
    res.status(400)
    res.json({error: 'email not valid'})
    return
  }
  
  if (emails.has(email)) {
    res.status(400)
    res.json({error: 'duplicate email'})
    return
  }

  if (!school) {
    res.status(400)
    res.json({error: 'school missing'})
    return
  }
  
  people.add({
    email: email,
    school: school
  })
  res.json({'success': 'email successfully added'})
})

app.listen(3000, function() {
  console.log('Server started on port 3000')
})
