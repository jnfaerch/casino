# Public file downloads

This app is deliberately kept as small as possible without too many big frameworks and the like.

## Firebase
You need Firebase https://firebase.google.com Hosting, Storage, Firestore database and Authentication.
The files 'storage.rules' and 'firestore.rules' are in this repository just to aid you in:
- Private upload (write) only when logged in and the file doesn't exist.
- Public download (read) from your FireBase Storage and database.

Google has no API to iterate over the files in storage so you need to place file information in the database (firestore) and use this for iteration.

- Setup your own Firebase instance
- Install Firebase locally
- Switch the information in the `Initialize Firebase` script in the index.html file (this is public information useless without backend access to the Firebase instance)
- Firestore collection is called 'files'. If you change this you need to change it in the code as well.
- Once ready run `$firebase deploy` in terminal to setup on your Firebase instance

Changes to files and information has to be handled via the Firebase GUI.
Remember if you delete a file in the Storage you have to delete the corresponding database 'document'.

## Fontawesome
The icons are from FontAwesome https://fontawesome.com/start

## Settings
You can easily change icons, fonts, colors and hero image to your own choices.

## NPM
I have not been able to make things work with Yarn so NPM is used according to Googles documentation.
Also see the gitignore file as there's a lot of stuff you don't necessarily want in your Git repo.

## Use case
The app is for businesses or persons needing secure upload and public download of files.

## FOSS / Copyleft
Feel free to use and alter to your heart's content - Credit me if you want to but you don't have to :)
