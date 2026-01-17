let turni = new Map();

function stampa(testo) {
    let paragrafo = document.createElement('p');
    
    paragrafo.textContent = testo;
    document.getElementById('risultato').appendChild(paragrafo);
}

function pulisci() {
    document.getElementById('risultato').innerHTML = '';
}

function turno() {
    pulisci();
    let orario = document.getElementById('orario').value.trim();
    let inputStudenti = document.getElementById('studenti').value.trim();
    
    if (!orario || !inputStudenti) {
        stampa('Errore: compila entrambi i campi');
        return;
    }
    if (turni.has(orario)) {
        stampa('Errore: turno già esistente');
        return;
    }
    
    let arrayStudenti = inputStudenti.split(',').map(s => s.trim()).filter(s => s);
    turni.set(orario, arrayStudenti);
    
    stampa('Turno ' + orario + ' creato con ' + arrayStudenti.length + ' studenti');
    document.getElementById('orario').value = '';
    document.getElementById('studenti').value = '';
}

function mostra() {
    pulisci();
    if (turni.size == 0) {
        stampa('Nessun turno presente');
        return;
    }    
    
    stampa('Elenco turni:');
    for (let [orario, studenti] of turni) {
        stampa(orario + ': ' + studenti.join(', '));
    }
}

function cerca() {
    pulisci();
    let codice = document.getElementById('cerca').value.trim();
    if (!codice) return stampa('Inserisci un codice');
    
    for (let [orario, studenti] of turni) {
        if (studenti.includes(codice)) {
            stampa(codice + ' trovato nel turno ' + orario);
            return;
        }
    }
    stampa('Studente non trovato');
}

function aggiungi() {
    pulisci();
    let orario = document.getElementById('turno').value.trim();
    let codice = document.getElementById('studente').value.trim();
    
    if (!turni.has(orario)){
         stampa('Turno non esistente');
        return;
    }
    // Controllo duplicati in TUTTI i turni
    for (let lista of turni.values()) {
        if (lista.includes(codice)) {
            stampa('Errore: Studente già presente in un turno');
            return;
        }
    }
    
    turni.get(orario).push(codice);
    stampa(codice + ' aggiunto a ' + orario);
}

function rimuovi() {
    pulisci();
    let orario = document.getElementById('turno').value.trim();
    let codice = document.getElementById('studente').value.trim();
    
    if (!turni.has(orario)){
        stampa('Turno non esistente');
        return;
    }
    let lista = turni.get(orario);
    let indice = lista.indexOf(codice);
    
    if (indice === -1){
        stampa('Studente non trovato in questo turno');
        return;
    }
    lista.splice(indice, 1);
    stampa('Studente rimosso');
}

function dati() {
    pulisci();
    let totale = 0;
    for (let s of turni.values()) totale += s.length;
    stampa('Turni: ' + turni.size);
    stampa('Totale studenti: ' + totale);
}

function max() {
    pulisci();
    let max = -1, orarioMax = '';
    for (let [ora, s] of turni) {
        if (s.length > max) {
            max = s.length;
            orarioMax = ora;
        }
    }
    stampa('Max studenti: ' + orarioMax + ' (' + max + ')');
}