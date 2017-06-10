window.onload = function() {
  const form = document.getElementById('preregister')
  form.onsubmit = function (event) {
    event.preventDefault()
    submission = {
      email: form.elements.email.value,
      school: form.elements.school.value,
    }

    const req = new XMLHttpRequest()
    req.open('POST', '/api/preregister', true)
    req.setRequestHeader('Content-type', 'application/json')

    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        res = JSON.parse(req.response)
        if (req.status === 200) {
          console.log('Success!')
        } else if (req.status === 400) {
          console.log('Your fault:', res.error)
        } else {
          console.log('Whoops:', res)
        }
      }
    }

    req.send(JSON.stringify(submission))
  }
}
