
const toggleBtn = document.getElementById("toggleBtn");
const chatWin = document.getElementById("chatWin");
const closeBtn = document.getElementById("closeBtn");
const messages = document.getElementById("messages");
const chatform = document.getElementById("chatForm");
const inputMsg = document.getElementById("inputMsg");

function appendMessage(text,sender = 'bot'){
    const el = document.createElement('div');
    el.className = 'message'+(sender === 'user' ? 'user' : 'bot');
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTo = messages.scrollHeight;
    return el;
}


function toggleChat(){
    chatWin.classList.toggle('open');
}

toggleBtn.addEventListener('click',toggleChat);
closeBtn.addEventListener('click',toggleChat);
const launcherLabel = document.getElementById('launcherLabel');


function toggleChat(){
    chatWin.classList.toggle('open');
    if(chatWin.classList.contains('open')){
        launcherLabel.style.display = 'none';
    }else{
        launcherLabel.style.display = 'block';
    }
}

toggleBtn.addEventListener('click',toggleChat);
closeBtn.addEventListener('click',toggleChat);


chatform.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const text = inputMsg.value.trim();
    if(!text)return;

    appendMessage(text,'user');
    inputMsg.value = '';

    const lastBot = Array.from(messages.getElementsByClassName('bot')).pop();
    if(lastBot && lastBot.textContent === '...')lastBot.remove();

    const typingEl = appendMessage('...','bot');

    const reply = await callGemini(text);
    typingEl.remove();
    appendMessage(reply,'bot');
})