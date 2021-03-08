var origem = null;
function play() {
    if (this.firstChild && origem === null) {
        origem = this;
    } else {
        if (!this.firstChild && origem !== null && origem !== this) {
            this.innerHTML = origem.outerHTML;
            origem.removeChild(origem.firstChild);
        }
        origem = null;
    }
}
function init() {
    let table = document.querySelector("table");
    let rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            if ((i + j) % 2 !== 0) {
                let cell = row.cells[j];
                cell.onclick = play;
            }
        }
    }
}
window.onload = init;