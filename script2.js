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
        if (target) target.src = e.target.result;
        if (targetId === 'avatarPreview') {
            const headerAvatar = document.getElementById('headerAvatar');
            if (headerAvatar) headerAvatar.src = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

// ——— Тест цветотипа / стиля ———
(function () {
    var VIBE_RESULTS = {
        soft: {
            title: 'Мягкий вайб',
            desc: 'Ты — эстетика, чувство и спокойствие. В твоём стиле много воздуха и настроения. С тобой легко и тепло.',
            img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80'
        },
        dark: {
            title: 'Тёмный вайб',
            desc: 'Глубина и характер. Ты не боишься контрастов и смелых образов. Твой стиль запоминается.',
            img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80'
        },
        minimal: {
            title: 'Минимал',
            desc: 'Чистые линии, лаконичность и уверенность. Меньше — больше. Ты знаешь, что тебе идёт.',
            img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'
        },
        chaos: {
            title: 'Хаотичный вайб',
            desc: 'Креатив и смешение стилей. Ты создаёшь правила сама. Ярко и непредсказуемо.',
            img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80'
        }
    };

    var steps = document.querySelectorAll('.quiz-step');
    var progressBar = document.getElementById('quiz-progress-bar');
    var quizSteps = document.getElementById('quiz-steps');
    var quizResult = document.getElementById('quiz-result');
    var btnPrev = document.getElementById('quiz-prev');
    var btnNext = document.getElementById('quiz-next');
    var btnFinish = document.getElementById('quiz-finish');
    var btnRetry = document.getElementById('quiz-retry');

    var currentStep = 1;
    var totalSteps = steps.length;

    function updateUI() {
        steps.forEach(function (el, i) {
            el.classList.toggle('active', i + 1 === currentStep);
        });
        if (progressBar) {
            progressBar.style.width = (currentStep / totalSteps) * 100 + '%';
        }
        if (btnPrev) btnPrev.style.display = currentStep === 1 ? 'none' : 'inline-block';
        if (btnNext) btnNext.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
        if (btnFinish) btnFinish.style.display = currentStep === totalSteps ? 'inline-block' : 'none';
    }

    function getSelectedVibe() {
        var vibe = document.querySelector('input[name="vibe"]:checked');
        return vibe ? vibe.value : 'soft';
    }

    function showResult() {
        var vibe = getSelectedVibe();
        var result = VIBE_RESULTS[vibe] || VIBE_RESULTS.soft;
        quizSteps.style.display = 'none';
        document.querySelector('.quiz-actions') && (document.querySelector('.quiz-actions').style.display = 'none');
        quizResult.classList.add('visible');
        var img = document.getElementById('vibe-result-img');
        var title = document.getElementById('vibe-result-title');
        var desc = document.getElementById('vibe-result-desc');
        if (img) img.src = result.img;
        if (img) img.alt = result.title;
        if (title) title.textContent = result.title;
        if (desc) desc.textContent = result.desc;
    }

    function resetQuiz() {
        currentStep = 1;
        quizResult.classList.remove('visible');
        quizSteps.style.display = 'block';
        var actions = document.querySelector('.quiz-actions');
        if (actions) actions.style.display = 'flex';
        document.querySelectorAll('.quiz-option input').forEach(function (input) {
            input.checked = false;
        });
        updateUI();
    }

    if (btnPrev) btnPrev.addEventListener('click', function () {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });
    if (btnNext) btnNext.addEventListener('click', function () {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        }
    });
    if (btnFinish) btnFinish.addEventListener('click', showResult);
    if (btnRetry) btnRetry.addEventListener('click', resetQuiz);

    updateUI();
})();
