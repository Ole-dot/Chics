
function setTheme(theme) {
    document.body.classList.remove('theme-girl', 'theme-boy');
    document.body.classList.add('theme-' + theme);
}


function loadImage(event, targetId) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
       
        const target = document.getElementById(targetId);
        if (target) {
            target.src = e.target.result;
        }

      
        if (targetId === 'avatarPreview') {
            const headerAvatar = document.getElementById('headerAvatar');
            if (headerAvatar) {
                headerAvatar.src = e.target.result;
            }
        }
    };

    reader.readAsDataURL(file);
}

