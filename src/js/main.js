const textUser = document.querySelector('.text-user')
const result = document.querySelector('.result-input')
const cepInvalid = document.querySelector('.cep-invalid') 
const cepLength = document.querySelector('.cep-length')
const cepExistent = document.querySelector('.cep-existent')
const formatted = document.querySelector('.formatted')
const resultBox = document.querySelector('.box-result')
const msgCopy = document.querySelector('.msg-copy')


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
          display(result, off)
          display(resultBox, off)
          display(cepInvalid, on)
          display(cepExistent, on)
        } else {
          filterData(data)
          formText()
        }
      })
      
      display(resultBox, on)
      display(result, on)
    })
    .catch(() => {
      if (cep.length < 8 || cep.length > 8) {
        display(cepLength, on)
      }  
      
      display(resultBox, off)
      display(result, off)
      display(cepInvalid, on)
    })
    
    display(resultBox, off)
    display(cepExistent, off)
    display(cepLength, off)
    display(cepInvalid, off)
  }
}

function filterData(result) {
  for (const campo in result) {
    if (document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).value = result[campo]
    }
  }
}

function formText() {
  if (document.querySelector('#cep').value != '') {
    const cepForm = document.querySelector('#cep').value
    const ruaForm = document.querySelector('#logradouro').value
    const bairroForm = document.querySelector('#bairro').value
    const cidadeForm = document.querySelector('#localidade').value
    const estadoForm = document.querySelector('#uf').value
  
    formatted.textContent = `${ruaForm}, ${bairroForm}, ${cidadeForm} / ${estadoForm} - ${cepForm}`
  }
}

function copy() {
  navigator.clipboard.writeText(formatted.textContent)
  msgCopy.style.opacity = '1'

  setTimeout(() => {
    msgCopy.style.opacity = '0'
  }, 3000)
}

function display(tag, text) {
  tag.style.display = text
}

let on = 'initial'
let off = 'none'
