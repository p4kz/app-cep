const textUser = document.querySelector('.text-user')
const result = document.querySelector('.result-input')
const cepInvalid = document.querySelector('.cep-invalid') 
const cepLength = document.querySelector('.cep-length')
const cepExistent = document.querySelector('.cep-existent')

function getCep() {
  if (textUser.value != '') {
    let cep = textUser.value
    
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
    .then(response => {response.json()
      .then((data) => {
        if (data.erro === 'true') {
          result.style.display = 'none'
          cepInvalid.style.display = 'initial'
          cepExistent.style.display = 'initial'
        } else {
          filterData(data)
        }
      })

      result.style.display = 'initial'
    })
    .catch(() => {
      if (cep.length < 8 || cep.length > 8) {
        cepLength.style.display = 'initial'
      }  

      result.style.display = 'none'
      cepInvalid.style.display = 'initial'
    })
    
    cepExistent.style.display = 'none'
    cepLength.style.display = 'none'
    cepInvalid.style.display = 'none'
  }
}

function filterData(result) {
  for (const campo in result) {
    if (document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).value = result[campo]
    }  
  }
}