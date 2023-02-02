function courseOne() {

    const kursEn = document.getElementById("kursEn");
    const en = document.getElementById("en");

    kursEn.addEventListener("click", function () {
        if (en.style.display === "none") {
            en.style.display = "block";
        } else {
            en.style.display = "none";
        }
    });

    fetch('http://172.16.1.11:3001/kursEn')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tableElements = data.data.map(item => {
                return `<tr><td>${item.KursID}<br>${item.KursNavn}<br>${item.Dato}<br>${item.Tid}<br>${item.Adresse}<br>${item.Postnummer}<br>${item.Poststed}`
            });
            document.getElementById('en').innerHTML = `<table><tbody>${tableElements.join('')}</tbody></table>`;
        })
        .catch(error => console.error('Error:', error));

}


function courseTwo() {
    fetch('http://172.16.1.11:3001/kursTo')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tableElements = data.data.map(item => {
                return `${item.KursID}<br>${item.KursNavn}<br>${item.Dato}<br>${item.Tid}<br>${item.Adresse}<br>${item.Postnummer}<br>${item.Poststed}`
            });
            document.getElementById('to').innerHTML = `<table><tbody>${tableElements.join('')}</tbody></table>`;
        })
        .catch(error => console.error('Error:', error));
}
