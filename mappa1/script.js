function calcola() {
    const N = parseInt(document.getElementById("numeri").value);
    const contenitore = document.getElementById("campo");
    const risultatoDiv = document.getElementById("ris");

    // Pulizia campi
    contenitore.innerHTML = "";
    risultatoDiv.innerHTML = "";

    if (isNaN(N) || N < 1) {
        alert("Inserisci un numero valido!");
        return;
    }

    // Creazione dinamica degli input
    for (let i = 0; i < N; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "inputArray";
        input.placeholder = `Valore per posizione ${i}`;
        contenitore.appendChild(input);
        contenitore.appendChild(document.createElement("br"));
    }

    const bottone = document.createElement("button");
    bottone.textContent = "Calcola";
    bottone.onclick = () => analisi();
    contenitore.appendChild(bottone);
}

function analisi() {
    const inputs = document.getElementsByClassName("inputArray");
    
    // Chiave: Indice della posizione, Valore: Numero inserito
    const mappaNumeri = new Map();

    for (let i = 0; i < inputs.length; i++) {
        let valore = parseFloat(inputs[i].value) || 0;
        mappaNumeri.set(i, valore); // Memorizziamo nella mappa
    }

    // Calcolo Somma Pari
    let sommaPari = 0;
    mappaNumeri.forEach((valore) => {
        if (valore % 2 === 0) {
            sommaPari += valore;
        }
    });

    // Calcolo Prodotto Posizioni Dispari
    let prodottoDispari = 1;
    let haPosizioniDispari = false;

    for (let [indice, valore] of mappaNumeri) {
        // Se l'indice (chiave) è dispari (1, 3, 5...)
        if (indice % 2 !== 0) {
            prodottoDispari *= valore;
            haPosizioniDispari = true;
        }
    }

    // Se non ci sono indici dispari il prodotto è 0
    if (!haPosizioniDispari) prodottoDispari = 0;

    // Visualizzazione
    document.getElementById("ris").innerHTML = `
        Somma numeri pari: ${sommaPari} <br>
        Prodotto indici dispari: ${prodottoDispari}`;
}