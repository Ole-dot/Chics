(function () {
    function setTheme(theme) {
        document.body.classList.remove('theme-girl', 'theme-boy');
        document.body.classList.add('theme-' + theme);
    }

    var themeBtn = document.getElementById('chat-theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var isBoy = document.body.classList.contains('theme-boy');
            setTheme(isBoy ? 'girl' : 'boy');
        });
    }

    var messagesEl = document.getElementById('chat-messages');
    var inputEl = document.getElementById('chat-input');
    var sendBtn = document.getElementById('chat-send');

    function addMessage(text, isUser) {
        if (!text.trim() || !messagesEl) return;
        var div = document.createElement('div');
        div.className = 'message ' + (isUser ? 'message-user' : 'message-assistant');
        var p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function sendMessage() {
        if (!inputEl || !messagesEl) return;
        var text = inputEl.value.trim();
        if (!text) return;
        addMessage(text, true);
        inputEl.value = '';

        if (text.toLowerCase().indexOf('нарисуй') === 0) {
            setTimeout(function () {
                addMessage('Пока что картинки создаются только в воображении. Скоро добавим генерацию изображений! 💗', false);
            }, 600);
        } else {
            setTimeout(function () {
                addMessage('Получила: «' + text + '». Пока я только учусь — скоро смогу отвечать умнее! 💕', false);
            }, 500);
        }
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (inputEl) {
        inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
})();
