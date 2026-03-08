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