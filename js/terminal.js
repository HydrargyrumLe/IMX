//terminal.js
//1. 获取元素
const terminalForm = document.querySelector('#terminalForm');
const terminalInput = document.querySelector('#terminalInput');
const terminalOutput = document.querySelector('#terminalOutput');

//2. 输出辅助函数：往输出区追加一行
//line：要显示的文字    className：颜色类（cmd-echo 回显 / cmd-result 结果 / cmd-error 错误）
function print(line, className){
    terminalOutput.innerHTML += `<div class="${className}">${line}</div>`;
}

let welcomeShow = true;
function showWelcome(){
    print('欢迎来到 Hg 的终端主页', 'cmd-result');
    print('输入 help 查看可用命令', 'cmd-result');
}

showWelcome();

//4. 提交事件
terminalForm.addEventListener('submit', function(event){
    event.preventDefault();
    const input = terminalInput.value.trim();
    if (input === '') 
        return;    //忽略空输入
    if(welcomeShow){
        terminalOutput.innerHTML = '';
        welcomeShow = false;
    }
    print('Hg@lab ~ $ ' + input,'cmd-echo');//回显

    const parts = input.split(' ').filter(s=>s!=='');

    if(parts[0]==='help'){
        print('可用命令',`cmd-result`);
        print('help',`cmd-result`);
        print('about',`cmd-result`);
        print('ls',`cmd-result`);
        print('contact 按名字查看联系人', 'cmd-result');
        print('clear', `cmd-result`);
    }
    else if(parts[0]==='ls'){
        const contacts = loadContacts();
        if(contacts.length===0)
            print('通讯录为空', 'cmd-result');
        else
            contacts.forEach(contact =>{
                print(contact.name, 'cmd-result');
            });
    }
    else if(parts[0]==='about'){
        const contacts = loadContacts();
        const me = contacts.find(contact=>contact.name==='Hg');

        if(me){
        print(me.name, 'cmd-result');
        print('专业：' + me.major, 'cmd-result');
        print('方向：' + me.direction, 'cmd-result');
        print('简介：' + me.intro, 'cmd-result');
        print('技能：' + me.skills.join(' / '), 'cmd-result');
        print('GitHub：' + me.github, 'cmd-result');
        print('邮箱：' + me.email, 'cmd-result');
        }
        else{
            print('未找到个人信息', 'cmd-error');
        }
    }
    else if(parts[0]==='contact'){
        const name = parts[1];
        if(!name){
            print('用法: contact <名字>', 'cmd-error');
        }
        else{
            const target = loadContacts().find(c => c.name === name);
            if(target){
            print(target.name, 'cmd-result');
            print('专业：' + target.major, 'cmd-result');
            print('方向：' + target.direction, 'cmd-result');
            print('简介：' + target.intro, 'cmd-result');
            print('技能：' + target.skills.join(' / '), 'cmd-result');
            print('GitHub：' + target.github, 'cmd-result');
            print('邮箱：' + target.email, 'cmd-result');
            } 
            else {
            print('未找到: ' + name, 'cmd-error');
            }
        }
    }
    else if(parts[0]==='clear'){
        terminalOutput.innerHTML = '';
        showWelcome();
        welcomeShow = true;
    }
    else{
            print('命令未找到：'+input,'cmd-error');    //报错
    }
    terminalInput.value = '';//清空输入框
});

//欢迎动画
const welcome = document.querySelector('#welcome');
let welcomeGone = false;

function dismissWelcome(){
    if(welcomeGone) return;
    welcomeGone = true;
    welcome.classList.add('hide');
    setTimeout(function(){
        welcome.remove();
    },400);
}

if(document.referrer.includes('contacts.html'))
    welcome.remove();
else{
    welcome.addEventListener('click',dismissWelcome);
    document.addEventListener('keydown',function(event){
        if(event.key===' '&&!welcomeGone){
            event.preventDefault();
            dismissWelcome();
        }
    });
}
    

/*welcome.addEventListener('click',dismissWelcome);
document.addEventListener('keydown',function(event){
    if(event.key===' '&&!welcomeGone){
        event.preventDefault();
        dismissWelcome();
    }
});*/
