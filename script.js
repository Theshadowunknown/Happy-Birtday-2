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
/* ========================================================
   LOGIKA NAVIGASI TAB & MINIGAME (DIPINDAH DARI HTML)
   ======================================================== */

// 1. Fungsi Perpindahan Tab Dashboard
/* ==========================================
   PROTEKSI STRICT HALAMAN UTAMA (ULTAH.HTML)
   ========================================== */
(function enforceAuthentication() {
    var isAuth = sessionStorage.getItem('isBirthdayLoggedIn');

    // Jika BELUM login, lempar paksa kembali ke index.html (Halaman Amplop / Login)
    if (isAuth !== 'true') {
        window.location.replace('index.html');
    }
})();
function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-panel').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    btnElement.classList.add('active');

    if (tabId === 'tab-minigame') {
        startMiniGame();
    }
}

// 2. Fungsi Mini Game Balon
let score = 0;

function startMiniGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    if (gameInterval) clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        const minigameTab = document.getElementById('tab-minigame');
        if (!minigameTab || !minigameTab.classList.contains('active')) return;
        
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.position = 'absolute';
        balloon.style.width = '30px';
        balloon.style.height = '40px';
        balloon.style.borderRadius = '50%';
        balloon.style.cursor = 'pointer';
        balloon.style.bottom = '0px';
        
        const colors = ['#ff5e97', '#00f2fe', '#ffcf40', '#a05eff', '#4cd964'];
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';

        balloon.onclick = function() {
            score += 10;
            const scoreDisplay = document.getElementById('scoreVal');
            if(scoreDisplay) scoreDisplay.innerText = score;
            if (typeof triggerConfetti === 'function') triggerConfetti();
            balloon.remove();
        };

        gameArea.appendChild(balloon);
        setTimeout(() => balloon.remove(), 4000);
    }, 1000);
}

// 3. Fungsi Buka Hadiah
function openGift() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
    const giftMsg = document.getElementById('giftMsg');
    if(giftMsg) {
        giftMsg.innerHTML = `
            <strong style="color: var(--accent-pink); font-size: 18px;">Selamat! 🎂✨</strong><br>
            Hadiah terbaikmu adalah kebahagiaan & cinta dari orang-orang tersayang! Semoga selalu bahagia & sehat selalu Rara!
        `;
    }
}

/* ==========================================
   LOGIC MINI GAME BALON (MULAI, PAUSE, TERBANG)
   ========================================== */
let gameInterval = null;
let timerInterval = null;
let gameScore = 0;
let gameTimeLeft = 30;
let isGameRunning = false;

function toggleMiniGame() {
    const startBtn = document.getElementById('startPauseBtn');
    const overlay = document.getElementById('gameOverlay');

    if (!isGameRunning) {
        // MULAI / RESUME GAME
        isGameRunning = true;
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
        startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        
        // Jalan interval spawn balon & waktu
        gameInterval = setInterval(spawnBalloon, 800);
        timerInterval = setInterval(updateGameTimer, 1000);
    } else {
        // PAUSE GAME
        pauseMiniGame();
    }
}

function pauseMiniGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById('startPauseBtn').innerHTML = '<i class="fa-solid fa-play"></i> Lanjut';
}

function updateGameTimer() {
    gameTimeLeft--;
    document.getElementById('gameTimer').innerText = gameTimeLeft;
    
    if (gameTimeLeft <= 0) {
        pauseMiniGame();
        alert(`Waktu Habis! 🎉 Skor Akhir Kamu: ${gameScore}`);
        resetMiniGame();
    }
}

function resetMiniGame() {
    pauseMiniGame();
    gameScore = 0;
    gameTimeLeft = 30;
    document.getElementById('gameScore').innerText = '0';
    document.getElementById('gameTimer').innerText = '30';
    document.getElementById('startPauseBtn').innerHTML = '<i class="fa-solid fa-play"></i> Mulai';
    
    const area = document.getElementById('balloonGameArea');
    area.querySelectorAll('.game-balloon').forEach(b => b.remove());
    
    const overlay = document.getElementById('gameOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => overlay.style.opacity = '1', 10);
}

function spawnBalloon() {
    const area = document.getElementById('balloonGameArea');
    if (!area) return;

    const balloon = document.createElement('div');
    balloon.className = 'game-balloon';
    
    // Warna & Ukuran acak
    const colors = ['#ff5e97', '#00f2fe', '#ffcf40', '#a05eff', '#4cd964'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * (area.clientWidth - 50);
    const randomSpeed = Math.random() * 2 + 3; // 3 - 5 detik penerbangan

    balloon.style.background = randomColor;
    balloon.style.left = `${randomLeft}px`;
    balloon.style.animationDuration = `${randomSpeed}s`;

    // Klik Balon (Pecahkan)
    balloon.onclick = function() {
        if (!isGameRunning) return;
        gameScore += 10;
        document.getElementById('gameScore').innerText = gameScore;
        
        // Efek Confetti Kecil saat Balon Pecah
        if (typeof confetti === 'function') {
            confetti({ particleCount: 15, spread: 40, origin: { y: 0.6 } });
        }
        balloon.remove();
    };

    area.appendChild(balloon);

    // Hapus balon otomatis jika sudah sampai atas
    setTimeout(() => {
        if (balloon.parentNode) balloon.remove();
    }, randomSpeed * 1000);
}
