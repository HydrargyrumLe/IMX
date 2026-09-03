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

print('欢迎来到 Hg 的终端主页', 'cmd-result');
print('输入 help 查看可用命令', 'cmd-result');

//4. 提交事件
terminalForm.addEventListener('submit', function(event){
    event.preventDefault();
    const input = terminalInput.value.trim();
    if (input === '') return;    //忽略空输入
    print('Hg@lab ~ $ ' + input,'cmd-echo');//回显
    if(input==='help'){
        print('可用命令',`cmd-result`);
        print('help',`cmd-result`);
        print('about',`cmd-result`);
        print('ls',`cmd-result`);
    }
    else if(input==='ls'){
        const contacts = loadContacts();
        if(contacts.length===0)
            print('通讯录为空', 'cmd-result');
        else
            contacts.forEach(contact =>{
                print(contact.name, 'cmd-result');
            });
    }
    else if(input==='about'){
        const contacts = loadContacts();
        const me = contacts.find(contact=>contact.id===1);

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
    else{
            print('命令未找到：'+input,'cmd-error');//报错
    }
    terminalInput.value = '';//清空输入框
});
