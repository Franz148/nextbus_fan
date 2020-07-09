export default {

    //ACCEDE AI DATI DEL BROWSER E REGISTRA LO USERNAME NEL BROWSER CON LA PRIMA LETTERA MAIUSCOLA
    login(username) {
        username = username.toLowerCase();
        let newUser = username.charAt(0).toUpperCase() + username.slice(1);
        localStorage.setItem("username", newUser);
    },

    //RESTITUISCE LO USERNAME SALVATO NEL BROWSER
    getUsername() {
        return localStorage.getItem("username");
    },

    //SE L'UTENTE È HA FATTO L'ACCESSO RESTITUISCI "TRUE" ALTRIMENTI "FALSE"
    isLoggedIn() {
        return !!localStorage.getItem("username");
    },

    //ELIMINA LO USERNAME DAL BROWSER
    logout() {
        localStorage.removeItem("username");
    }
}