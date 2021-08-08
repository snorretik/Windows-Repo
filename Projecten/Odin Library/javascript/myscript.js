let myLibrary = [];

// var database = firebase.database();

databaseOn();

function Book({title, author, pages, read}) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, read ${this.read}`
// }

Book.prototype.toggleRead = function() {
    this.read ? this.read = false : this.read = true;

    buttons();
    databaseStuff();
}

function addBookToLibrary(boek) {
    myLibrary.push(boek)
}

const btn = document.querySelector('#addButton');
btn.addEventListener('click', () => {
    addNewBook();
});

function addNewBook() {
    addToArray();
    buttons();
    databaseStuff();
}

function addToArray() {
    let title = prompt("Please enter the title:", "");
    let author = prompt("Please enter the author:", "");
    let pages = parseInt(prompt("Please enter the number of pages", ""));
    let readStr = prompt("Have you read it yet? yes or no:");
    let read = false;
    while ((readStr !== "yes") || (readStr !== "no")) {
        if (readStr == "yes") {
            read = true;
            break
        } else if (readStr == "no") {
            read = false;
            break
        } else {
            readStr = prompt("Have you read it yet? yes or no:")
        }
    }

    // moet "new" voor Book als je classe weer gebruikt
    const boekAdd = new Book({title, author, pages, read});
    addBookToLibrary(boekAdd);
}

function databaseStuff() {
    firebase.database().ref('library').set(myLibrary);
}

function databaseOn() {
    let ref = firebase.database().ref('library');
    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
        if(Array.isArray(snapshot.val())){
            myLibrary = snapshot.val().map(data=>new Book(data))
        }else{
            myLibrary = [new Book(snapshot.val())]
        }
        buttons();
    })
}

function buttons() {
    const containerDiv = document.querySelector('#container')
    const buttonAdd = document.querySelector('#addButton')

    // const database = document.createElement('button');
    // const br = document.createElement('br');
    while ((containerDiv.firstChild) && (containerDiv.firstChild != buttonAdd)) {
        containerDiv.removeChild(containerDiv.firstChild);
    }
    // const lengLib = myLibrary.length;
    for (let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement('div');
        const pBookTitle = document.createElement('p');
        const pBookAuthor = document.createElement('p');
        const pBookPages = document.createElement('p');
        const pBookRead = document.createElement('p');
        const btn = document.createElement('button');
        const toggle = document.createElement('button');

        div.setAttribute('id', `divNmb${i}`);
        div.setAttribute('style', 'margin: 20px; background-color: purple; text-align: center; border-color: black; border-width: 2px; border-style: solid; border-radius: 20px;')
        // div.textContent = `${myLibrary[i - 1].title}`;
        pBookTitle.setAttribute('id', `p1Nmb${i}`);
        pBookTitle.setAttribute('style', 'color: white;');
        pBookTitle.textContent = `${myLibrary[i].title}`;
        pBookAuthor.setAttribute('id', `p2Nmb${i}`);
        pBookAuthor.setAttribute('style', 'color: white;');
        pBookAuthor.textContent = `${myLibrary[i].author}`;
        pBookPages.setAttribute('id', `p3Nmb${i}`);
        pBookPages.setAttribute('style', 'color: white;');
        pBookPages.textContent = `${myLibrary[i].pages}`;
        pBookRead.setAttribute('id', `p4Nmb${i}`);
        pBookRead.setAttribute('style', 'color: white;');
        pBookRead.textContent = naamFunc(`${myLibrary[i].read}`);
        btn.setAttribute('id', `delNmb${i}`);
        btn.textContent = "Delete";
        toggle.setAttribute('id', `toggleNmb${i}`);
        toggle.textContent = "Toggle read";
        // database.setAttribute('id', `databaseNmb${lengLib}`)
        // database.textContent = "database";
        // br.setAttribute('id', `brNmb${lengLib}`);
    
        div.appendChild(pBookTitle);
        div.appendChild(pBookAuthor);
        div.appendChild(pBookPages);
        div.appendChild(pBookRead);
        div.appendChild(btn);
        div.appendChild(toggle);
        // div.appendChild(database);
        containerDiv.insertBefore(div, buttonAdd);
    
        btn.addEventListener('click', () => {
            myLibrary.splice(i, 1);
    
            div.removeChild(pBookTitle);
            div.removeChild(pBookAuthor);
            div.removeChild(pBookPages);
            div.removeChild(pBookRead);
            div.removeChild(btn);
            div.removeChild(toggle);
            // div.removeChild(database);
            containerDiv.removeChild(div);
        })

        toggle.addEventListener('click', () => {
            myLibrary[i].toggleRead();
            pBookRead.textContent = naamFunc(`${myLibrary[i].read}`);
        })

        function naamFunc(stringRead) {
            if (stringRead == "true") {
                return "Have Read";
            } else if (stringRead == "false") {
                return "Not Read";
            } else {
                console.log(stringRead);
            }
        }
    }
}