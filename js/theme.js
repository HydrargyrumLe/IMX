//主题切换
//无属性=深色（默认），data-theme="light"=浅色

const THEME_KEY = 'personal-site-theme';
const themeBtn = document.querySelector('#themeBtn');

//进入页面：读取记忆的主题并应用
if(localStorage.getItem(THEME_KEY)==='light'){
    document.documentElement.setAttribute('data-theme','light');
    themeBtn.textContent = '☀';
}

//点击切换主题并记忆
themeBtn.addEventListener('click',function(){
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if(isLight){
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY,'dark');
        themeBtn.textContent = '🌙';
    }
    else{
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem(THEME_KEY,'light');
        themeBtn.textContent = '☀';
    }
});