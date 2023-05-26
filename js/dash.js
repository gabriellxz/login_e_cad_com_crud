const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

let usuarioId = Number(sessionStorage.getItem('logado'));
const session = localStorage.getItem('session');

checkedLogged();

function checkedLogged() {
    if (session) {
        sessionStorage.setItem('log', session);
        usuarioId = session;
    }

    if (!usuarioId) {
        location.href = 'login.html';
        return
    }
}

const atualizarLocalStorage = (pedidos) => { localStorage.setItem('pedidos', JSON.stringify(pedidos)) };

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('pedidos') || '[]')

const salvarPedido = (e) => {
    e.preventDefault()

    const sabor = form.sabor.value
    const quantidade = Number(form.quantidade.value)
    const localizacao = form.localizacao.value

    if (idx === 'novo') {
        const pedidos = recuperarLocalStorage();
        let idp = 0;
        for (const ped of pedidos) {
            if (ped.usuarioId === usuarioId) {
                idp = Number(ped.id);
            }
        }
        pedidos.push({id: idp + 1, sabor, quantidade, localizacao, usuarioId});
        atualizarLocalStorage(pedidos);
        preencherTabela();
        form.reset();
    } else {
        let pedido = {
            id:idx, 
            sabor, 
            quantidade, 
            localizacao, 
            usuarioId
        };
        const pedidos = recuperarLocalStorage();
        const indexPedido = pedidos.findIndex((pedido) => pedido.id === idx);
        if (indexPedido >= 0) {
        atualizarPedido(idx, pedido);
        preencherTabela();
        form.reset();
        idx = 'novo'
    }

    }
}

const preencherTabela = () => {
    const pedidos = recuperarLocalStorage()
    tabela.innerHTML = '';
    for (const pedido of pedidos) {
        if (pedido.usuarioId === usuarioId) {
            tabela.innerHTML +=
        `
            <tr>
                <td scope="row">${pedido.id}</td>
                <td>${pedido.sabor}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.localizacao}</td>
                <td>
                    <img type="button" width="25px" src="../img/delete.png" onclick="removerPedido(${pedido.id})">
                    <img type="button" width="25px" src="../img/pen.png" onclick="editarPedido(${pedido.id})">
                </td>
            </tr>
        `
        }
    }
}

const removerPedido = (id) => {
    const pedidos = recuperarLocalStorage();
    const indexPedidos = pedidos.findIndex((pedido) => pedido.id === id);
    if (indexPedidos < 0) return;
    pedidos.splice(indexPedidos, 1);
    atualizarLocalStorage(pedidos);
    preencherTabela();
    
    document.querySelector('#msg').innerHTML = 'Pedido removido com sucesso!'
    setTimeout(() =>  {
    document.querySelector('#msg').setAttribute('style', 'display: none')
    }, 2000)
}

const editarPedido = (id) => {
    const pedidos = recuperarLocalStorage();
    const indexPedidos = pedidos.findIndex((pedido) => pedido.id === id);
    form.sabor.value = pedidos[indexPedidos].sabor;
    form.quantidade.value = pedidos[indexPedidos].quantidade;
    form.localizacao.value = pedidos[indexPedidos].localizacao;
    idx = id
}

const atualizarPedido = (id, pedido) => {
    const pedidos = recuperarLocalStorage();
    const indexPedidos = pedidos.findIndex((pedido) => pedido.id === id);
    pedidos[indexPedidos] = pedido 
    atualizarLocalStorage(pedidos);

    document.querySelector('#msg').innerHTML = 'Pedido editado com sucesso!'
    setTimeout(() =>  {
    document.querySelector('#msg').setAttribute('style', 'display: none')
    }, 2000)
}



document.querySelector('#sair').addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    localStorage.removeItem('session');   
    location.href = 'login.html';
})

//eventos
form.addEventListener('submit', salvarPedido)
document.addEventListener('DOMContentLoaded', preencherTabela())

document.querySelector('#button').addEventListener('click', () => {
    mensagem()
})
function mensagem() {
    if (form.sabor.value === '' || form.quantidade.value === '' || form.localizacao.value === '') {
        document.querySelector('#msg-error').innerHTML = 'Preencha todos os campos!'
        setTimeout(() => {
            document.querySelector('#msg-error').setAttribute('style', 'display: none')
        }, 2000)
    } else {
        document.querySelector('#msg-error').setAttribute('style','display: none')
        document.querySelector('#msg-sucesso').innerHTML = 'Pedido salvo com sucesso'
        setTimeout(() => {
            document.querySelector('#msg-sucesso').setAttribute('style', 'display: none')
        }, 2000)
    }
}
