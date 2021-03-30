//  Autor: Vagner Henrique Silva de França
//  29/03/2021

var jogadas = 0;
var origem = null;
var iniciando = true;
var jogadaValida = false;
//armazena origem para validar jogada
var lineOrigem = null;
var columOrigem = null;
//armazena destino para validar jogada
var columDestino = null;
var lineDestino = null;

function montaTabuleiro() {
    let line = document.getElementById("linhas");
    let colums = document.getElementById("colunas");

    var nlines = Number(line.value);
    var ncolums = Number(colums.value);

    let table = document.querySelector("table");
    table.innerHTML = ``;

    if (iniciando == true) {

        for (let i = 0; i < 8; i++) {
            let linha = table.insertRow(i);
            for (let j = 0; j < 8; j++) {
                let coluna = linha.insertCell(j);
            }
        }
        iniciando = false;
    } else {

        for (let i = 0; i < nlines; i++) {
            let linha = table.insertRow(i);
            for (let j = 0; j < ncolums; j++) {
                let coluna = linha.insertCell(j);
            }
        }

    }



    atribuirclick();
}

function atribuirclick() {
    let table = document.querySelector("table");
    let rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            cell.innerHTML = null;
            cell.onclick = play;
            document.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.borderColor = "black";
        }
    }

    let status = document.getElementById('status');
    status.innerHTML = ``;
    jogadas = 0;
    origem = null;
    verificarfim();
}

function verificarfim() {
    let table = document.querySelector("table");
    let rows = table.rows;
    let status = document.getElementById('status');

    let acabou = 1;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            if (cell.firstChild == null) {
                acabou = 0;
            } else {
                document.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.borderColor = "blue";
            }
        }
    }


    if (acabou === 1) {
        status.innerHTML = `VOCÊ GANHOU!!`;
    }

    if (acabou === 0) {
        status.innerHTML = `Partida em andamento...`;
    }


}

function play() {
    if (jogadas == 0 && origem === null) {
        this.innerHTML = '<img src="imagens/cavaloOK.png" alt="cavalo">'
        if (jogadas == 0) {
            jogadas = -1;
        }
        jogadas += 1;
        origem = this;
    } else {
        achaOrigem();
        bordaVermelha();      
        if (!this.firstChild && origem !== null && origem !== this) {
            
            this.innerHTML = '<strong></strong>'; 
            achaDestino();
            this.innerHTML = '';
            if(validaJogada(lineOrigem, columOrigem, lineDestino, columDestino)){
                jogadaValida = false;
                this.innerHTML = origem.outerHTML;
                jogadas += 1;
                origem.innerHTML = `<p class="jogo">${jogadas}</p>`;
                origem = this;
                origem.style.borderColor = "blue";
                
                bordaPreta();
            }
        }

        
    }
    verificarfim();
}

function achaOrigem(){
    let table = document.querySelector("table");
    let rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            if (cell.querySelector("img")) {
                lineOrigem = Number(i);
                columOrigem = Number(j);
                break;
            }
        }
    }
    
}

function achaDestino(){
    let table = document.querySelector("table");
    let rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            if (cell.querySelector("strong")) {
                lineDestino = Number(i);
                columDestino = Number(j);
                break;
            }
        }
    }
}

function validaJogada(lineOrigem, columOrigem, lineDest, columDest){
    if(((columDest - 1) === columOrigem) && ((lineDest - 2) === lineOrigem)){
        return true;
    }
    if(((columDest + 1) === columOrigem) && ((lineDest + 2) === lineOrigem)){
        return true;
    }
    if(((columDest + 1) === columOrigem) && ((lineDest - 2) === lineOrigem)){
        return true;
    }
	if(((columDest - 1) === columOrigem) && ((lineDest + 2) === lineOrigem)){
        return true;
    }
	if(((columDest - 2) === columOrigem) && ((lineDest - 1) === lineOrigem)){
        return true;
    }
    if(((columDest + 2) === columOrigem) && ((lineDest + 1) === lineOrigem)){
        return true;
    }
    if(((columDest - 2) === columOrigem) && ((lineDest - 1) === lineOrigem)){
        return true;
    }
	if(((columDest + 2) === columOrigem) && ((lineDest - 1) === lineOrigem)){
        return true;
    }
    if(((columDest - 2) === columOrigem) && ((lineDest + 1) === lineOrigem)){
        return true;
    }
    
}

function bordaVermelha(){
    
    let table = document.querySelector("table");
    let rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            if(validaJogada(lineOrigem, columOrigem, i, j)){
                document.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.borderColor = "red";
            }
        }
    }
}
function bordaPreta(){
    let table = document.querySelector("table");
    let rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];

            if(cell.firstChild){

            }else{
                document.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.borderColor = "black";
            }
        }
    }
}
