const textUser = document.querySelector('.text-user')
const result = document.querySelector('.result-input')


const filterData = (result) => {
  for (const campo in result) {
    if ( document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).value = result[campo]
      console.log()     
    }   
  }
}

function getCep() {
  if (textUser.value != '' && textUser.value.length > 8) {
    let search = textUser.value
    
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }
    
    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then(response => {response.json()
      .then(data => filterData(data))
    })

    .catch(() => console.log('erro'))  

    result.style.display = 'initial'
  } else {
    result.style.display = 'none'
  }
}
