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
                <li class="contact-item" data-id="${contact.id}">
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

function renderDetail(contact){
    const skillsHtml = contact.skills.map(skill => `<span>${skill}</span>`).join('');
    detailPanel.innerHTML = `
    <div class="detail-avatar">${contact.name[0]}</div>
    <div class="detail-name">${contact.name}</div>
    <div class="detail-major">${contact.major}</div>
        <div class="detail-block">
            <div class="k">方向</div>
            <div class="v">${contact.direction}</div>
        </div>
        <div class="detail-block">
            <div class="k">简介</div>
            <div class="v">${contact.intro}</div>
        </div>
        <div class="detail-block">
            <div class="k">技能</div>
            <div class="detail-skills">${skillsHtml}</div>
        </div>
        <div class="detail-block">
            <div class="k">GitHub</div>
            <div class="v"><a href="${contact.github}" target="_blank">${contact.github}</a></div>
        </div>
        <div class="detail-block">
            <div class="k">邮箱</div>
            <div class="v">${contact.email}</div>
        </div>
        <div class="detail-actions">
            <button class="btn" id="editBtn">编辑</button>
            <button class="btn btn-danger" id="deleteBtn">删除</button>
        </div>`;
}

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

//详情弹窗
const contactListEl = document.querySelector('#contactList');
const detailModal = document.querySelector('#detailModal');
const detailPanel = document.querySelector('#detailPanel');

let currentContactId = null;        //当前正在看谁——第 8、9 项编辑/删除时要用

contactListEl.addEventListener('click',function(event){
    const itemEl = event.target.closest('.contact-item');
    if(itemEl===null)       //点到列表空白处
        return;
    const id = Number(itemEl.dataset.id);       //字符串 → 数字
    const contact = loadContacts().find(c=>c.id===id);
    if(!contact)
        return;
    currentContactId = contact.id;
    renderDetail(contact);
    detailModal.hidden = false;
});

//删除
detailPanel.addEventListener('click',function(event){
    const deleteBtn = event.target.closest('#deleteBtn');
    if(deleteBtn===null)
        return;

    const ok = confirm('确定删除这个联系人吗？');
    if(!ok)
        return;

    const contacts = loadContacts();
    const newList = contacts.filter(c=>c.id!==currentContactId);
    saveContacts(newList);

    renderContacts();
    detailModal.hidden = true;
});

//点击弹窗背景关闭
detailModal.addEventListener('click', function(event){
    if (event.target === detailModal) detailModal.hidden = true;
});

//按Esc关闭所有弹窗
document.addEventListener('keydown', function(event){
    if (event.key === 'Escape'){
        detailModal.hidden = true;
        formModal.hidden = true;
    }
});
