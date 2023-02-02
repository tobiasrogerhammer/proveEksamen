function courseOne() {
    
    fetch('http://172.16.1.11:3001/kurs')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const kursItems = data.data;
            document.getElementById('en').innerHTML = [kursItems[0].Dato, kursItems[0].Tid, kursItems[0].Adresse];
            console.log(kursItems[0]);
        })
        .catch(error => console.error('Error:', error));
}

function courseTwo() {
    
    fetch('http://172.16.1.11:3001/kurs')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const kursItems = data.data;
            document.getElementById('to').innerHTML = [kursItems[1].Dato, kursItems[1].Tid, kursItems[1].Adresse];
            console.log(kursItems[1]);
        })
        .catch(error => console.error('Error:', error));
}