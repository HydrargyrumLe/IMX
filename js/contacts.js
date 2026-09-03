function renderContacts(){
    const listEl = document.querySelector('#contactList');
    listEl.innerHTML = '';
    const contacts = loadContacts();

    if(contacts.length === 0){
        listEl.innerHTML = '<li class="empty-tip">通讯录为空，点击右上角添加</li>';
    }
    else {
        contacts.forEach(contact => {
            listEl.innerHTML += `
                <li class="contact-item">
                    <div class="ci-avatar">${contact.name[0]}</div>
                    <div>
                        <div class="ci-name">${contact.name}</div>
                        <div class="ci-major">${contact.major}</div>
                    </div>
                </li>`;
        })
    }
}
renderContacts();

const addBtn = document.querySelector('#addBtn');
const formModal = document.querySelector('#formModal');
const contactForm = document.querySelector('#contactForm');
const cancelBtn = document.querySelector('#cancelBtn');

//打开弹窗
addBtn.addEventListener('click',function(){
    formModal.hidden = false;
});
//取消
cancelBtn.addEventListener('click',function(){
    formModal.hidden = true;
});
//提交
contactForm.addEventListener('submit',function(event){
    event.preventDefault();
    const fd = new FormData(contactForm);

    const newContact = {
        id: Date.now(),
        name: fd.get('name'),
        major: fd.get('major'),
        direction: fd.get('direction'),
        intro: fd.get('intro'),
        skills: fd.get('skills').split(',').map(s => s.trim()).filter(s => s !== ''),
        github: fd.get('github'),
        email: fd.get('email')
    };

    const contacts = loadContacts();
    contacts.push(newContact);
    saveContacts(contacts);

    renderContacts();
    contactForm.reset();
    formModal.hidden = true;
});