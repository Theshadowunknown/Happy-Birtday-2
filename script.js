// =====================================================
//  1. STARS
// =====================================================
function createStars() {
    const container = document.getElementById('stars');
    if (!container) return;
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (2 + Math.random() * 3) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.width = star.style.height = (1 + Math.random() * 3) + 'px';
        container.appendChild(star);
    }
}
createStars();

// =====================================================
//  2. BALLOONS
// =====================================================
function createBalloons() {
    const container = document.getElementById('balloonContainer');
    if (!container) return;
    const emojis = ['🎈', '🎈', '🎈', '🎊', '🎉', '🌟', '⭐', '✨', '🎁', '🎀'];
    for (let i = 0; i < 12; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
        balloon.style.setProperty('--speed', (8 + Math.random() * 12) + 's');
        balloon.style.setProperty('--delay', (Math.random() * 15) + 's');
        container.appendChild(balloon);
    }
}
createBalloons();

// =====================================================
//  3. SHOW CARD with pop animation
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    var cardWrapper = document.getElementById('cardWrapper');
    if (cardWrapper) {
        setTimeout(function() {
            cardWrapper.classList.add('visible');
        }, 300);
    }
});

// =====================================================
//  4. BIRTHDAY MESSAGES
// =====================================================
const messages = [
    "Selamat ulang tahun! 🎂 Semoga hari-harimu selalu dipenuhi dengan senyuman dan kebahagiaan.",
    "Happy Birthday! 🥳 Semoga panjang umur, sehat selalu, dan sukses dalam segala hal!",
    "Semoga tahun ini penuh dengan cinta, tawa, dan petualangan indah! 🌟",
    "Selamat bertambah usia! Tetap rendah hati dan teruslah bersinar! ✨"
];

let currentMsgIndex = 0;
const messageEl = document.getElementById('birthdayMessage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const msgCounter = document.getElementById('msgCounter');

function showMessage(index) {
    if (!messageEl) return;
    if (index < 0 || index >= messages.length) return;
    currentMsgIndex = index;
    messageEl.classList.remove('message-enter');
    messageEl.classList.add('message-exit');
    setTimeout(function() {
        messageEl.textContent = messages[index];
        messageEl.classList.remove('message-exit');
        messageEl.classList.add('message-enter');
        if (msgCounter) msgCounter.textContent = (index + 1) + ' / ' + messages.length;
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === messages.length - 1;
    }, 300);
}

if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        if (currentMsgIndex < messages.length - 1) {
            showMessage(currentMsgIndex + 1);
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        if (currentMsgIndex > 0) {
            showMessage(currentMsgIndex - 1);
        }
    });
}

// Show first message
if (messageEl) {
    messageEl.textContent = messages[0];
    messageEl.classList.add('message-enter');
}
if (msgCounter) msgCounter.textContent = '1 / ' + messages.length;
if (prevBtn) prevBtn.disabled = true;

// =====================================================
//  5. SECRET BUTTON — redirect to rahasia.html
// =====================================================
const secretBtn = document.getElementById('secretBtn');
if (secretBtn) {
    secretBtn.addEventListener('click', function() {
        window.location.href = 'rahasia.html';
    });
}

// =====================================================
//  6. REGENERATE BALLOONS
// =====================================================
setInterval(function() {
    var container = document.getElementById('balloonContainer');
    if (!container) return;
    var balloons = container.querySelectorAll('.balloon');
    if (balloons.length < 10) {
        var emojis = ['🎈', '🎈', '🎈', '🎊', '🎉', '🌟', '⭐', '✨', '🎁', '🎀'];
        for (var i = 0; i < 3; i++) {
            var balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
            balloon.style.setProperty('--speed', (8 + Math.random() * 12) + 's');
            balloon.style.setProperty('--delay', '0s');
            container.appendChild(balloon);
        }
    }
}, 5000);
