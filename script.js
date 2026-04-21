// ==========================================
// 1. PENGATURAN MENU DROPDOWN (RESPONSIVE)
// ==========================================

function openMenu() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.style.transform = "translateY(0)";
}

function closeMenu() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.style.transform = "translateY(-100%)";
}

// ==========================================
// 2. EFEK MESIN TIK (TYPEWRITER)
// ==========================================

const texts = [
    "PUBLIC SPEAKER",
    "DESIGNER",
    "TECH ENTHUSIAST"
];

const typingSpeed = 100;   // Kecepatan mengetik (ms)
const erasingSpeed = 50;   // Kecepatan menghapus (ms)
const textElement = document.querySelector(".typewriter-text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    // Proses Mengetik
    if (characterIndex < texts[textIndex].length) {
        textElement.textContent += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Jeda 1 detik setelah kata selesai diketik, lalu mulai menghapus
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    // Proses Menghapus
    if (textElement.textContent.length > 0) {
        textElement.textContent = textElement.textContent.slice(0, -1);
        setTimeout(eraseText, erasingSpeed);
    } else {
        // Pindah ke kata berikutnya setelah terhapus habis
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        // Jeda setengah detik sebelum mengetik kata baru
        setTimeout(typeWriter, 500);
    }
}

// Jalankan efek saat elemen HTML sudah selesai dimuat di browser
document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
});


/* =========================================
LOGIKA JS UNTUK 3D NEON TILT PHOTO
   ========================================= */

const tiltCard = document.getElementById('tiltPhoto');
const neonShadow = tiltCard.querySelector('.neon-shadow');
const neonGlare = tiltCard.querySelector('.neon-glare');

tiltCard.addEventListener('mousemove', (e) => {
    // 1. Dapatkan posisi kursor di dalam kotak gambar (piksel)
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 2. Tentukan titik tengah kotak gambar
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 3. Hitung persentase posisi mouse dari titik tengah (-50% ke +50%)
    const percentX = (x / rect.width) - 0.5;
    const percentY = (y / rect.height) - 0.5;

    // 4. Hitung sudut kemiringan (Perspektif) - Maksimal 25 derajat
    const rotateY = percentX * 25; // Memiringkan horizontal (rotateY mengikuti gerakan mouse ke kiri/kanan)
    const rotateX = -percentY * 25; // Memiringkan vertikal (rotateX mengikuti gerakan mouse ke atas/bawah)

    // 5. Terapkan transformasi 3D ke container utama
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // 6. HITUNG POSISI CAHAYA NEON DYNAMIC
    // Bayangan neon di belakang bergerak berlawanan arah agar efek 3D terasa
    const shadowX = (percentX * -100) + 50; 
    const shadowY = (percentY * -100) + 50;
    neonShadow.style.background = `radial-gradient(circle at ${shadowX}% ${shadowY}%, rgba(0, 238, 255, 0.8), transparent 60%)`;

    // Pantulan cahaya (glare) di depan bergerak searah dengan mouse agar terasa mengkilap
    const glareX = (percentX * 100) + 50; 
    const glareY = (percentY * 100) + 50;
    neonGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 238, 255, 0.3), transparent 60%)`;
});

// Reset posisi gambar dan matikan cahaya dynamic saat kursor meninggalkan gambar
tiltCard.addEventListener('mouseleave', () => {
    // Kembalikan sudut ke normal (datar)
    tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
    
    // Matikan cahaya dynamic dengan mengubah opacity ke 0 (sudah diatur di CSS)
});

/* =========================================
LOGIKA SLIDER SKILLS (Tombol Panah)
   ========================================= */

function slideSkills(direction) {
    const container = document.getElementById('skillsContainer');
    // Lebar kartu + gap (sekitar 300px). Geser sejauh itu setiap kali klik.
    const scrollAmount = 310;
    
    if (direction === -1) {
        container.scrollLeft -= scrollAmount; // Geser ke kiri
    } else {
        container.scrollLeft += scrollAmount; // Geser ke kanan
    }
}

function toggleFlip() {
    const card = document.getElementById('aboutCard');
    card.classList.toggle('is-flipped');
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    // Ganti class di body
    body.classList.toggle('light-mode');
    
    // Cek apakah sekarang mode terang atau gelap
    if (body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun'); // Ganti ikon ke matahari
        localStorage.setItem('theme', 'light');      // Simpan pilihan
    } else {
        icon.classList.replace('fa-sun', 'fa-moon'); // Ganti ikon ke bulan
        localStorage.setItem('theme', 'dark');
    }
}

// ==========================================================
// LOGIKA GUESTBOOK GLOBAL (JSONBIN.IO)
// ==========================================================

const form = document.getElementById("contact-form");
const statusContainer = document.getElementById("status-container");
const submittedMessages = document.getElementById("submitted-messages");
const msgTitle = document.getElementById("msg-title");

// PENGATURAN JSONBIN
const BIN_ID = "69e7a66caaba8821972217d0";
const API_KEY = "$2a$10$LnzN4c8MsBCX042yIqFiQ.nV7y8.oxOPeLotoBcDCmt29tzXCAEL6";

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// 1. Fungsi Mengambil Komentar dari Internet (JSONBin)
async function loadComments() {
    try {
        const response = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        
        const data = await response.json();
        const comments = data.record.comments || [];
        
        if (comments.length > 0) {
            msgTitle.style.display = "block";
            submittedMessages.innerHTML = "";
            
            // Tampilkan dari yang paling baru
            comments.forEach(comment => {
                const newMsg = document.createElement("div");
                newMsg.classList.add("message-item");
                newMsg.innerHTML = `<strong>${comment.name}</strong><p>${comment.message}</p>`;
                submittedMessages.appendChild(newMsg);
            });
        }
    } catch (error) {
        console.error("Gagal memuat komentar dari server:", error);
    }
}

// Tarik data pas web pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
    loadComments();
});

// 2. Fungsi Mengirim Komentar Baru
async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const message = formData.get("message");

    statusContainer.innerHTML = "<p style='color: var(--accent-neon);'>Pesan sedang dikirim...</p>";

    try {
        // Langkah A: Ambil data lama dulu dari server
        const getResponse = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        const getData = await getResponse.json();
        const commentsLama = getData.record.comments || [];

        // Langkah B: Tambahkan pesan baru di urutan paling atas
        commentsLama.unshift({ name: name, message: message });

        // Langkah C: Update (PUT) data gabungan ke JSONBin
        const putResponse = await fetch(JSONBIN_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ comments: commentsLama })
        });

        if (putResponse.ok) {
            statusContainer.innerHTML = "<p style='color: #00ff88;'>Berhasil! Pesanmu telah terkirim.</p>";
            
            // Render ulang tampilan agar pesan baru langsung muncul
            loadComments();
            form.reset();

            setTimeout(() => { statusContainer.innerHTML = ""; }, 3000);
        } else {
            throw new Error("Gagal update data di JSONBin");
        }
        
        // (Opsional) Tetap kirim ke Formspree agar masuk ke email pribadi kamu
        fetch(event.target.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

    } catch (error) {
        console.error(error);
        statusContainer.innerHTML = "<p style='color: #ff4444;'>Oops! Ada masalah koneksi ke server.</p>";
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}
