// --- 1. ОПРОС И ПРОГРЕСС ---
const steps = document.querySelectorAll('.question-step');
const progressBar = document.getElementById('progressBar');
const submitBtn = document.getElementById('submitBtn');
let currentStep = 0;

function updateProgress() {
    // Рассчитываем процент заполнения
    const percent = (currentStep / steps.length) * 100;
    if (progressBar) progressBar.style.width = percent + '%';
}

steps.forEach((step, index) => {
    const inputs = step.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            if (index < steps.length - 1) {
                // Плавный переход к следующему вопросу
                setTimeout(() => {
                    step.style.display = 'none';
                    steps[index + 1].style.display = 'block';
                    currentStep++;
                    updateProgress();
                }, 400);
            } else {
                // Финальный шаг
                currentStep = steps.length;
                updateProgress();
                if (submitBtn) submitBtn.style.display = 'block';
            }
        });
    });
});

// Обработка формы опроса
const vibeForm = document.getElementById('vibeForm');
if (vibeForm) {
    vibeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Считаем ответы для определения результата
        const answers = document.querySelectorAll('input[type="radio"]:checked');
        let darkScore = 0;
        answers.forEach(a => {
            if (['dark', 'black', 'power'].includes(a.value)) darkScore++;
        });

        // Сохраняем результат: если "темных" ответов больше половины — dark, иначе soft
        localStorage.setItem('vibeResult', darkScore >= 2 ? 'dark' : 'soft');
        
        alert('Твой вайб сохранен! Переходим к результатам.');
        window.location.href = 'result.html';
    });
}

// --- 2. ЧАТ И AI ---
async function handleInput() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    if (text.toLowerCase().includes('нарисуй')) {
        generateImage(text);
    } else {
        generateText(text);
    }
}

function addMessage(text, side) {
    const chat = document.getElementById('chatWindow');
    if (!chat) return;
    const div = document.createElement('div');
    div.className = `message ${side}`;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function generateText(text) {
    addMessage("Думаю...", "bot");
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: `User: ${text}\nAssistant: ` }),
        });
        const result = await response.json();
        const chat = document.getElementById('chatWindow');
        // Очищаем "Думаю..." и вставляем ответ
        chat.lastChild.innerText = result[0].generated_text.split("Assistant: ").pop() || "Я призадумалась...";
    } catch (e) { 
        const chat = document.getElementById('chatWindow');
        if (chat) chat.lastChild.innerText = "Ошибка API. Попробуй позже."; 
    }
}

async function generateImage(text) {
    addMessage("Рисую...", "bot");
    const seed = Math.floor(Math.random() * 1000000);
    const imgOutput = document.getElementById('imageOutput');
    if (imgOutput) {
        imgOutput.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(text)}?seed=${seed}&nologo=true`;
    }
}

const inputForm = document.getElementById('inputForm');
if (inputForm) {
    inputForm.addEventListener('submit', (e) => { e.preventDefault(); handleInput(); });
}

// --- 3. СЕРДЕЧКИ ---
document.addEventListener('click', (e) => {
    // Не спамим сердечками при нажатии на кнопки и поля ввода
    if (e.target.closest('button, input, label')) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart'; 
    heart.innerText = '❤️';
    heart.style.left = (e.pageX - 10) + 'px';
    heart.style.top = (e.pageY - 10) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
});

// --- 4. ТЕМА ---
const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.onclick = toggleTheme;
    }
});
// Находим все радио-кнопки
document.querySelectorAll('.question-step input').forEach(input => {
    input.addEventListener('change', () => {
        const currentStep = input.closest('.question-step');
        const stepNum = parseInt(currentStep.dataset.step);
        
        // 1. Двигаем линию (всего 7 вопросов)
        const progress = (stepNum / 7) * 100;
        document.getElementById('progressBar').style.width = progress + '%';

        // 2. Переключаем вопрос
        setTimeout(() => {
            currentStep.style.display = 'none';
            const nextStep = document.querySelector(`.question-step[data-step="${stepNum + 1}"]`);
            
            if (nextStep) {
                nextStep.style.display = 'block';
            } else {
                document.getElementById('submitBtn').style.display = 'block';
            }
        }, 300);
    });
});