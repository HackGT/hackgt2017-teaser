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
const emails = new Set()

app.post('/preregister', function(req, res) {
  const email = req.body.email
  
  if (!email) {
    res.status(400)
    res.json({'error': 'email missing'})
  } else if (!isValidEmail(email)) {
    res.status(400)
    res.json({'error': 'email not valid'})
  } else if (emails.has(email)) {
    res.status(400)
    res.json({'error': 'duplicate email'})
  } else {
    emails.add(email)
    res.json({'success': 'email successfully added'})
  }

})

app.listen(3000, function() {
  console.log('Server started on port 3000')
})
