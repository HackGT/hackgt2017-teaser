function send(url, method, data, callback) {
  const req = new XMLHttpRequest()
  req.open(method, url, true)
  req.setRequestHeader('Content-type', 'application/json')

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      const res = JSON.parse(req.responseText)
      callback(req, res)
    }
  }

  req.send(JSON.stringify(data))
}

window.onload = function() {
  // configure form
  const form = document.getElementById('preregister')
  form.onsubmit = function (event) {
    event.preventDefault()
    submission = {
      email: form.elements.email.value,
      school: form.elements.school.value,
    }

    send('http://teaser2017.dev.hack.gt/api/preregister', 'POST', submission, function(req, res) {
      if (req.status === 200) {
        console.log('Success!')
        form.elements.submit.value = 'Success!'
        form.reset()
      } else if (req.status === 400) {
        console.log('Your fault:', res.error)
        form.elements.submit.value = 'Error!'
        alert(res.error)
      } else {
        console.log('My fault:', res)
      }
    })
  }

  form.oninput = function() {
    form.elements.submit.value = 'TUNE IN'
  }

  // configure school suggestion
  const schoolInput = form.elements.school
  const autocomplete = new Awesomplete(schoolInput, {
    list: ['Georgia Institute of Technology']
  })
  schoolInput.oninput = function() {
    send('http://teaser2017.dev.hack.gt/api/school-hint', 'POST', {school: schoolInput.value}, function(req, res) {
      autocomplete.list = res.hints
    })
  }
}
