# Public file downloads

https://casino-files.firebaseapp.com/

This app is deliberately kept as small as possible without too many big frameworks and the like.

## Clone the project
```
git clone https://github.com/jnfaerch/casino.git
cd casino
npm install
```

## Firebase
You need Firebase https://firebase.google.com Hosting, Storage, Cloud Firestore database and Authentication.
The files 'storage.rules' and 'firestore.rules' are in this repository just to aid you in:
- Private upload (write) only when logged in and the file doesn't exist.
- Public download (read) from your FireBase Storage and database.

Google has no API to iterate over the files in storage so you need to place file information in the database (Firestore) and use this for iteration.

- Setup your own Firebase instance https://firebase.google.com/docs/web/setup
- Install Firebase CLI locally https://firebase.google.com/docs/cli
- Update `.firebaserc` with your information
- Switch the information in the `Initialize Firebase` script in the index.html file (this is public information useless without backend access to the Firebase instance)
- Firestore collection is called 'files'. If you change this you need to change it in the code as well (to ease working with the collection add a 'Dummy' document with one 'Dummy' field containing whatever text and keep it in there. This is to prevent the 'files' collection being deleted when/if you delete all the "real" documents (the file information) during setup and testing).
You easily upload your files via the website as this populates the storage and the database alike.
- Run your website locally with `$firebase serve`
- Once ready run `$firebase deploy` in terminal to setup on your Firebase instance

**Changes** to files and information has to be handled via the Firebase GUI.
**Remember** if you delete a file in the Storage you have to delete the corresponding database 'document'.

## Fontawesome
The icons are from FontAwesome https://fontawesome.com/start

## Settings
You can easily change icons, fonts, colors and hero image to your own choices.
Color: Just change the CSS `--main-color` to the color of choice.

## NPM
I have not been able to make things work with Yarn so NPM is used according to Googles documentation.
Also see the gitignore file as there's a lot of stuff you don't necessarily want in your Git repo.

## Use case
The app is for businesses or persons who need secure upload and public download of files.

## FOSS / Copyleft
Feel free to use and alter to your heart's content - Credit me if you want to but you don't have to :)
