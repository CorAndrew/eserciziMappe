function gestisci() {
    const output = document.getElementById("output");
    output.innerHTML = ""; // Pulisce l'area

    function stampa(messaggio) {
        output.innerHTML += messaggio + "<br>";
    }

    // Creare la Map chiamata turni
    const turni = new Map();

    // Inserire almeno 3 turni con almeno 3 studenti
    turni.set("08:00-09:00", ["S01", "S02", "S03"]);
    turni.set("09:00-10:00", ["S04", "S05", "S06"]);
    turni.set("10:00-11:00", ["S07", "S08", "S09"]);

    // Stampare tutti i turni
    stampa("<strong>Elenco Turni Iniziale:</strong>");
    for (let [orario, studenti] of turni) {
        stampa(`Turno ${orario}: ${studenti.join(", ")}`);
    }

    // Calcolare numero totale turni e studenti
    let totaleStudenti = 0;
    for (let studenti of turni.values()) {
        totaleStudenti += studenti.length;
    }
    stampa(`<br>Numero turni: ${turni.size}`);
    stampa(`Numero totale studenti: ${totaleStudenti}`);

    // Verificare posizione di uno studente
    const cercaStudente = "S05";
    let trovato = false;
    for (let [orario, studenti] of turni) {
        if (studenti.includes(cercaStudente)) {
            stampa(`Studente ${cercaStudente} trovato nel turno ${orario}`);
            trovato = true;
            break;
        }
    }

    // Funzione per aggiungere studente
    function aggiungiStudente(nuovoStudente, orarioDestinazione) {
        // Controllo se esiste già in qualsiasi turno
        for (let studenti of turni.values()) {
            if (studenti.includes(nuovoStudente)) {
                stampa(`Errore: lo studente ${nuovoStudente} è già prenotato in un altro turno`);
                return;
            }
        }
        // Se non esiste, lo aggiungo
        if (turni.has(orarioDestinazione)) {
            turni.get(orarioDestinazione).push(nuovoStudente);
            stampa(`Studente ${nuovoStudente} aggiunto al turno ${orarioDestinazione}`);
        }
    }

    // Prova aggiunta duplicato
    stampa("Tentativo di aggiunta studente S03 al turno 10:00-11:00...");
    aggiungiStudente("S03", "10:00-11:00");

    // Prova aggiunta nuovo
    aggiungiStudente("S10", "10:00-11:00");

    // Rimuovere uno studente
    const studenteDaRimuovere = "S02";
    const orarioRimozione = "08:00-09:00";
    if (turni.has(orarioRimozione)) {
        let lista = turni.get(orarioRimozione);
        const index = lista.indexOf(studenteDaRimuovere);
        if (index > -1) {
            lista.splice(index, 1);
            stampa(`Studente ${studenteDaRimuovere} rimosso dal turno ${orarioRimozione}`);
        }
    }

    // Stampare elenco aggiornato
    stampa("<strong>Situazione aggiornata:</strong>");
    for (let [orario, studenti] of turni) {
        stampa(`Turno ${orario}: ${studenti.join(", ")}`);
    }

    // Determinare il turno con più studenti
    let maxStudenti = -1;
    let turnoMigliore = "";
    for (let [orario, studenti] of turni) {
        if (studenti.length > maxStudenti) {
            maxStudenti = studenti.length;
            turnoMigliore = orario;
        }
    }
    stampa(`Turno con il maggior numero di studenti: ${turnoMigliore} (${maxStudenti} studenti)`);

    // Stampare solo i turni con almeno 3 studenti
    stampa(`Turni con almeno 3 studenti:`);
    for (let [orario, studenti] of turni) {
        if (studenti.length >= 3) {
            stampa(`- ${orario}`);
        }
    }
}