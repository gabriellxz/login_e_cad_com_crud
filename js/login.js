let email = document.querySelector('#email');
let senha = document.querySelector('#senha');

document.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();

    let userValid = {
        email: "",
        senha: ""
    };

    user = JSON.parse(localStorage.getItem('user'))


    user.forEach((item) => {
        if (email.value === item.emailCad && senha.value === item.senhaCad) {
            userValid = {
                id: item.id,
                email: item.emailCad,
                senha: item.senhaCad
            }

        }
    });

    if (email.value === '' || senha.value === '') {
        document.querySelector('#msg-error').innerText = 'Preencha os dados!'
    } else if (email.value === userValid.email && senha.value === userValid.senha) {
        document.querySelector('#msg-error').setAttribute('style', 'display: none')
        document.querySelector('#msg-sucesso').innerText = 'Fazendo autenticação, aguarde...'
        saveSession(userValid.id)
        setTimeout(() => {
            location.href = '../html/dash.html'
        }, 4000)
    } else {
        document.querySelector('#msg-error').innerText = 'Email ou senha incorretos!'
    }

    function saveSession(data) {
        if (saveSession) {
            localStorage.setItem('session', data)
        }

        sessionStorage.setItem('logado', JSON.stringify(data))
    }

})
