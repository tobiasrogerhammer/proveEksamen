function kursEn() {
    document.getElementById('en').style.display = "block";
    fetch('http://172.16.1.11:3001/kurs')
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
            dateDiv.innerHTML = 'Dato: ' + kursItems[0].Dato;
            enDiv.appendChild(dateDiv);
            const timeDiv = document.createElement('div');
            timeDiv.innerHTML = 'Tid: ' + kursItems[0].Tid;
            enDiv.appendChild(timeDiv);
            const addressDiv = document.createElement('div');
            addressDiv.innerHTML = 'Adresse:  ' + kursItems[0].Adresse;
            enDiv.appendChild(addressDiv);
            const postnummer = document.createElement('div');
            postnummer.innerHTML = 'Postnummer:  ' + kursItems[0].Postnummer;
            enDiv.appendChild(postnummer);
            const poststed = document.createElement('div');
            poststed.innerHTML = 'Poststed:  ' + kursItems[0].Poststed;
            enDiv.appendChild(poststed);
        })
        .catch(error => console.error('Error:', error));
}


function kursTo() {
    document.getElementById('to').style.display = "block";
    fetch('http://172.16.1.11:3001/kurs')
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
            const postnummer = document.createElement('div');
            postnummer.innerHTML = 'Postnummer:  ' + kursItems[1].Postnummer;
            toDiv.appendChild(postnummer);
            const poststed = document.createElement('div');
            poststed.innerHTML = 'Poststed:  ' + kursItems[1].Poststed;
            toDiv.appendChild(poststed);
        })
        .catch(error => console.error('Error:', error));
}


const form = document.getElementById("deltakerForm");
form.addEventListener("submit", (event) => {

    document.getElementById("en").style.display = "none";
    document.getElementById("to").style.display = "none";

    event.preventDefault();

    const personID = form.elements.personID.value;
    const fornavn = form.elements.fornavn.value;
    const etternavn = form.elements.etternavn.value;
    const adresse = form.elements.adresse.value;
    const postnummer = form.elements.postnummer.value;
    const poststed = form.elements.poststed.value;

    fetch("http://172.16.1.11:3001/kurs", {
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

const deltakelseForm = document.getElementById("deltakelse");
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const personID = deltakelseForm.elements.personID.value;

    fetch("http://172.16.1.11:3001/deltakelse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            personID
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Meldt på kurs!", data);
        })
        .catch((error) => {
            console.error("Error inserting data", error);
        });
});


const deleteUserBtn = document.getElementById("deleteUserBtn");
const fornavnInput = document.getElementById("fornavnInput");

document.getElementById("logout").addEventListener("click", function () {
    document.getElementById("deletePerson").style.display = "flex";
});

deleteUserBtn.addEventListener("click", function () {

    document.getElementById('intro').innerHTML = 'User succesfully deleted';
    document.getElementById('logout').style.display = "none";
    document.getElementById('login').style.display = "flex";



    const fornavn = fornavnInput.value;

    // Make a DELETE request to the API, passing the first name as a parameter
    fetch(`http://172.16.1.11:3001/deltaker?fornavn=${fornavn}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error deleting user with first name ${fornavn}`);
            }
            console.log(`Successfully deleted user with first name ${fornavn}`);
        })
        .catch(error => {
            console.error(error);
        });
});

document.getElementById("login").addEventListener("click", function () {
    document.getElementById("intro").innerHTML = "Log in to acces our courses";
    document.getElementById("deltakerForm").style.display = "flex";
    document.getElementById("en").style.display = "none";
    document.getElementById("to").style.display = "none";
    document.getElementById("kursEn").style.display = "none";
    document.getElementById("kursTo").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("loginA").style.display = "none";    
});

document.getElementById("sub").addEventListener("click", function () {
    document.getElementById("intro").innerHTML = "You are logged in";
    document.getElementById("deltakerForm").style.display = "none";
    document.getElementById("en").style.display = "block";
    document.getElementById("to").style.display = "block";
    document.getElementById("kursEn").style.display = "flex";
    document.getElementById("kursTo").style.display = "flex";
    document.getElementById("logout").style.display = "flex";

});