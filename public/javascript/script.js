// Get the upload modal
var modal = document.getElementById('uploadModal');

// Get the button that opens the modal
var btn = document.getElementById('upload');

// Get the <span> element that closes the modal
var close = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Get the login modal
var login = document.getElementById('loginModal');

// Get the button that opens the modal
var btnLogin = document.getElementById('login');

// Get the logout button
const btnLogout = document.getElementById('logout');

// Get the <span> element that closes the modal
var close = document.getElementsByClassName('close')[1];

// When the user clicks on the button, open the modal
btnLogin.onclick = function () {
    login.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
    login.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == login) {
        login.style.display = 'none';
    }
};

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) {
            alert('Error: ' + err);
            console.log(err);
            return;
        },
        function complete() {
            firebase.storage().ref().child(file.name).getMetadata().then(function (metadata) {
                writeFileData(metadata);
                contactDatabase();
            });
            alert('Your file was successfully uploaded');
            fileButton.value = '';
            uploader.value = '0';
            modal.style.display = 'none';
        }
    );
});

function writeFileData(metadata) {
    const name = metadata.name;
    const type = metadata.type;
    const size = metadata.size;
    const updated = metadata.updated;
    db.collection('files').add({
        name: name,
        type: type,
        size: size,
        updated: updated
    })
    .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        })
    .catch(function (error) {
        console.error('Error adding document: ', error);
    });
};

// Login
function loginForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + '\n' + errorMessage);
    });

    if (firebase.auth().currentUser) {
        login.style.display = 'none';
        btn.style.display = 'inline';
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'inline';
        alert('You are now logged in and can upload files');
    } else {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                login.style.display = 'none';
                btn.style.display = 'inline';
                btnLogin.style.display = 'none';
                btnLogout.style.display = 'inline';
                alert('You are now logged in and can upload files');
            } else {
                return;
            }
        })
    }
};

// Logout
btnLogout.onclick = function logout() {
    firebase.auth().signOut().then(function () {
        btn.style.display = 'none';
        btnLogin.style.display = 'inline';
        btnLogout.style.display = 'none';
    }).catch(function (error) {
        alert('An error happened: ' + error);
    });
};

function download(name) {
    var storageRef = firebase.storage().ref();

    storageRef.child(name).getDownloadURL().then(function(url) {
        // `url` is the download URL for the file
        window.open(url);
    }).catch(function(error) {
        // Handle any errors
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
                alert("File doesn't exist");
                break;

            case 'storage/unauthorized':
                alert("User doesn't have permission to access the file");
                break;

            case 'storage/canceled':
                alert("User canceled the upload");
                break;

            case 'storage/unknown':
                alert("Unknown error occurred, inspect the server response");
                break;
        }
    });
};

window.onload = contactDatabase;

function contactDatabase() {
    const filesRef = db.collection('files');
    const filesContainer = document.getElementById('file-container');

    while (filesContainer.hasChildNodes()) {
        filesContainer.removeChild(filesContainer.firstChild);
    }
    
    filesRef.orderBy('updated', 'desc').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let date = new Date(doc.data().updated).toLocaleDateString();

            let split = doc.data().name.split('.');
            let splitName = split[split.length - 1];

            switch (splitName) {
                case 'pdf': icon = 'fa-file-pdf'; break;
                case 'txt': icon = 'fa-file-alt'; break;
                case 'docx': icon = 'fa-file-word'; break;
                case 'xlsx': icon = 'fa-file-excel'; break;
                case 'pptx': icon = 'fa-file-powerpoint'; break;
                default: icon = 'fa-file';
            }

            getAllFiles(filesContainer, doc, date, icon);
        });
    });
};

function getAllFiles(filesContainer, doc, date, icon) {
    filesContainer.insertAdjacentHTML('beforeend',
        "<div class='winner-container' onclick='download(\"" + doc.data().name + "\")'>\n<span class='date'>" + date + "</span>\n<span class='winner'>" + doc.data().name + "</span>\n<span class='profit'><i class='fas " + icon + " fa-2x'></i></span>\n</div>"
    );
};
