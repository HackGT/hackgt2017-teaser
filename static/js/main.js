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

    req.onreadystatechange = function(event) {
      if (req.readyState == 4 && req.status == 200) {
        console.log(event)
      } else if (req.readyState == 4 && req.status == 400) {
        console.log(event)
      } else if (req.readyState == 4) {
        console.log(event)
      } else {
        console.log(event)
      }
    }

    req.send(JSON.stringify(submission))
  }
}
