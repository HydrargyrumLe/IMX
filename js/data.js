const PRESET_CONTACTS = [
    {
        id: 1,
        name: 'Hg',
        major: '计算机科学与技术',
        direction: '前端开发',
        intro: '零基础起步学习前端开发，目前学习了HTML、CSS和JavaScript',
        skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
        github: 'https://github.com/HydrargyrumLe',
        email: '2823876327@qq.com'
    }
]

const STORAGE_KEY = 'personal-site-contacts';

function loadContacts(){
    const str =localStorage.getItem('personal-site-contacts');
    if (str === null){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(PRESET_CONTACTS));
        return PRESET_CONTACTS;
    }
    else {
        return JSON.parse(str);
    }
}

function saveContacts(list){
    const str = JSON.stringify(list);
    localStorage.setItem('personal-site-contacts',JSON.stringify(list));
}