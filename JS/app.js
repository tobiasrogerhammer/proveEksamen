function kursEn() {
    fetch('http://localhost:3001/kurs')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const kursItems = data.data;
            const enDiv = document.getElementById('en');
            enDiv.innerHTML = ''; // clear the content of the div before inserting the new data
            const dateDiv = document.createElement('div');
            dateDiv.innerHTML = kursItems[0].Dato;
            enDiv.appendChild(dateDiv);
            const timeDiv = document.createElement('div');
            timeDiv.innerHTML = kursItems[0].Tid;
            enDiv.appendChild(timeDiv);
            const addressDiv = document.createElement('div');
            addressDiv.innerHTML = kursItems[0].Adresse;
            enDiv.appendChild(addressDiv);
        })
        .catch(error => console.error('Error:', error));
}


function kursTo() {
    fetch('http://localhost:3001/kurs')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const kursItems = data.data;
            const toDiv = document.getElementById('to');
            toDiv.innerHTML = ''; // clear the content of the div before inserting the new data
            const dateDiv = document.createElement('div');
            dateDiv.innerHTML = kursItems[1].Dato;
            toDiv.appendChild(dateDiv);
            const timeDiv = document.createElement('div');
            timeDiv.innerHTML = kursItems[1].Tid;
            toDiv.appendChild(timeDiv);
            const addressDiv = document.createElement('div');
            addressDiv.innerHTML = kursItems[1].Adresse;
            toDiv.appendChild(addressDiv);
        })
        .catch(error => console.error('Error:', error));
}


const form = document.getElementById("deltakerForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const personID = form.elements.personID.value;
    const fornavn = form.elements.fornavn.value;
    const etternavn = form.elements.etternavn.value;
    const adresse = form.elements.adresse.value;
    const postnummer = form.elements.postnummer.value;
    const poststed = form.elements.poststed.value;

    fetch("http://localhost:3001/kurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            personID,
            fornavn,
            etternavn,
            adresse,
            postnummer,
            poststed,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Data inserted successfully", data);
        })
        .catch((error) => {
            console.error("Error inserting data", error);
        });
});


document.getElementById("login").addEventListener("click", function () {
    document.getElementById("intro").innerHTML = "Log in to acces our courses";
    document.getElementById("deltakerForm").style.display = "flex";
    document.getElementById("kursEn").style.display = "none";
    document.getElementById("kursTo").style.display = "none";
    document.getElementById("login").style.display = "none";
});


document.getElementById("sub").addEventListener("click", function () {
    document.getElementById("intro").innerHTML = "You are logged in";
    document.getElementById("deltakerForm").style.display = "none";
    document.getElementById("kursEn").style.display = "flex";
    document.getElementById("kursTo").style.display = "flex";
    document.getElementById("login").style.display = "flex";
});
