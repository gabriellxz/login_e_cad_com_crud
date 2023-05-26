let usuarios = []

let nome = document.querySelector('#nome');
let email = document.querySelector('#email');
let senha = document.querySelector('#senha');
let confirmSenha = document.querySelector('#confirmSenha');

nome.addEventListener('keyup', () => {

    if (nome.value.length < 3) {
        nome.setAttribute('style', 'border-bottom: 1px solid red')
        document.getElementById('msg-nome').style.color = 'red'
        document.getElementById('msg-nome').style.fontSize = '15px'
        document.querySelector('#msg-nome').innerText= '*Nome deve conter no mínimo 3 caracteres'
        document.querySelector('#cad').setAttribute('style', 'display: none;')
    } else {
        nome.setAttribute('style', 'border-bottom: 1px solid green')
        document.querySelector('#msg-nome'). innerText= ''
        document.querySelector('#cad').setAttribute('style', 'display: block;')
    }

})

senha.addEventListener('keyup', () => {
    if (senha.value.length < 4) {
        senha.setAttribute('style', 'border-bottom: 1px solid red')
        document.getElementById('msg-senha').style.color = 'red'
        document.getElementById('msg-senha').style.fontSize = '15px'
        document.querySelector('#msg-senha').innerText= '*Senha deve conter no mínimo 4 caracteres'
        document.querySelector('#cad').setAttribute('style', 'display: none;')
    } else {
        senha.setAttribute('style', 'border-bottom: 1px solid green')
        document.querySelector('#msg-senha'). innerText= ''
        document.querySelector('#cad').setAttribute('style', 'display: block;')
    }
})

confirmSenha.addEventListener('keyup', () => {
    if (confirmSenha.value != senha.value) {
        confirmSenha.setAttribute('style', 'border-bottom: 1px solid red')
        document.getElementById('msg-confirmS').style.color = 'red'
        document.getElementById('msg-confirmS').style.fontSize = '15px'
        document.querySelector('#msg-confirmS').innerText= '*As senhas não conferem'
        document.querySelector('#cad').setAttribute('style', 'display: none;')
    } else {
        confirmSenha.setAttribute('style', 'border-bottom: 1px solid green')
        document.querySelector('#msg-confirmS'). innerText= ''
        document.querySelector('#cad').setAttribute('style', 'display: block;')
    }
})

document.querySelector('#cad').addEventListener('click', (e) => {
    e.preventDefault()

    if (nome.value === '' || email.value === '' || senha.value === '' || confirmSenha.value === '') {
        document.querySelector('#msg-error').innerText = 'Preencha os dados!'
    } else if (confirmSenha.value != senha.value) {
        alert('As senhas não conferem')
    } else {
        let db = JSON.parse(localStorage.getItem('user') || '[]');
        let objUser = {
            id: db.length + 1,
            nomeCad: nome.value,
            emailCad: email.value,
            senhaCad: senha.value
        }

        usuarios = localDados()
        usuarios.push(objUser)

        localStorage.setItem('user', JSON.stringify(usuarios))

        document.querySelector('#msg-sucesso').innerText = 'cadastrando usuário, aguarde...'
        document.querySelector('#msg-error').setAttribute('style', 'display:none')

        setTimeout(() => {
            location.href  = '../html/login.html'
        }, 4000)

    }})

const localDados = () => {
    let dados = JSON.parse(localStorage.getItem('user') || '[]')
    return dados
}