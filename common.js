(function () {
    var path = window.location.pathname || '';
    var isAuth = path.indexOf('chicks-auth') !== -1;
    var isChat = path.indexOf('chicks-chat') !== -1;
    var isHome = !isAuth && !isChat && (path === '' || path === '/' || path.endsWith('index.html'));

    var header = document.getElementById('site-header');
    if (header) {
        header.innerHTML =
            '<a href="index.html" class="site-logo">Chicks</a>' +
            '<nav class="site-nav">' +
            '<a href="index.html"' + (isHome ? ' class="active"' : '') + '>Главная</a>' +
            '<a href="index.html#wardrobe"' + (isHome ? '' : '') + '>Гардероб</a>' +
            '<a href="chicks-chat.html"' + (isChat ? ' class="active"' : '') + '>Чат</a>' +
            '<a href="chicks-auth.html"' + (isAuth ? ' class="active"' : '') + '>Вход</a>' +
            '</nav>';
    }

    var footer = document.getElementById('site-footer');
    if (footer) {
        footer.innerHTML =
            '<div class="footer-tagline">Стиль, который говорит о тебе 💗</div>' +
            '<div class="footer-links">' +
            '<a href="index.html">Главная</a>' +
            '<a href="chicks-chat.html">Чат</a>' +
            '<a href="chicks-auth.html">Вход</a>' +
            '</div>' +
            '<div>&copy; ' + new Date().getFullYear() + ' Chicks</div>';
    }
})();
