function renderContacts(){
    const listEl = document.querySelector('#contactLisst');
    listEl.innerHTML = '';
    const contacts = loadContacts();

    if(contacts.length === 0){

    }
    else {
        contacts.forEach(contact => {

        })
    }
}