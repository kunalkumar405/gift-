// =========================================
// 1. SOUND & AUDIO UTILITIES
// =========================================
function playAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => console.log('Audio autoplay blocked by browser.'));
    }
}

// Background Music Logic (With Updated Pill UI)
let isPlaying = false;
function toggleMusic() {
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    const volIcon = document.getElementById('volume-icon');
    
    if (!bgMusic) return;
    bgMusic.volume = 0.5; // Soft background volume

    if (isPlaying) { 
        bgMusic.pause(); 
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        if(volIcon) {
            volIcon.classList.remove('fa-volume-high');
            volIcon.classList.add('fa-volume-xmark');
        }
    } else { 
        bgMusic.play().catch(e => console.log('Playback issue', e)); 
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        if(volIcon) {
            volIcon.classList.remove('fa-volume-xmark');
            volIcon.classList.add('fa-volume-high');
        }
    }
    isPlaying = !isPlaying;
}

// =========================================
// 2. UI UTILITIES
// =========================================
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.querySelector(".ripple");
    if (ripple) { ripple.remove(); }
    button.appendChild(circle);
}

document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

function scrollToSection(id, event) {
    if(event) event.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}


// =========================================
// 3. VISUAL EFFECTS (Hearts & Scroll)
// =========================================
function createFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    if (!container) return;
    
    if (container.childElementCount > 30) return; 

    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
    
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 11000);
}
setInterval(createFloatingHearts, 600);

function createMiniHearts(x, y) {
    for(let i=0; i<8; i++) {
        const h = document.createElement('div');
        h.innerHTML = '❤️';
        h.style.position = 'fixed'; 
        h.style.left = x + 'px'; 
        h.style.top = y + 'px';
        h.style.pointerEvents = 'none'; 
        h.style.zIndex = '9999';
        h.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        document.body.appendChild(h);
        
        void h.offsetWidth;
        
        h.style.transform = `translate(${(Math.random()-0.5)*150}px, -${Math.random()*150 + 50}px) scale(${Math.random() + 0.5})`;
        h.style.opacity = '0';
        
        setTimeout(() => h.remove(), 1000);
    }
}

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(el => revealOnScroll.observe(el));


// =========================================
// 4. INTERACTIVE SECTIONS (ENVELOPE OPENS + MUSIC PLAYS)
// =========================================
const envelope = document.getElementById('envelope');
if (envelope) {
    envelope.addEventListener('click', function() {
        // If envelope is already open → close it
        if (this.classList.contains('open')) {
            this.classList.remove('open');
            
            const notesSection = document.getElementById('love-notes-section');
            if (notesSection) {
                notesSection.style.display = 'none';
            }
            
            const instructions = document.querySelector('.env-instructions');
            if (instructions) {
                instructions.style.opacity = '1';
            }
            
            // Trigger closing animation
            const envelopeWrapper = document.getElementById('envelope');
            if (envelopeWrapper) {
                envelopeWrapper.classList.add('closing');
                setTimeout(() => {
                    envelopeWrapper.classList.remove('closing');
                }, 600);
            }
            
            return;
        }
        
        // Otherwise open it (existing behavior)
        playAudio('sound-paper');
        this.classList.add('open');
        
        const instructions = document.querySelector('.env-instructions');
        if (instructions) {
            instructions.style.opacity = '0';
        }
        
        // JAISE HI ENVELOPE KHULEGA, MUSIC START HOGA (Agar pehle se nahi chal raha)
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic && bgMusic.paused && !isPlaying) {
            toggleMusic(); 
        }
        
        setTimeout(() => {
            const notesSection = document.getElementById('love-notes-section');
            notesSection.style.display = 'flex';
            notesSection.scrollIntoView({ behavior: 'smooth' });
            
            const lines = document.querySelectorAll('.letter-line');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('fade-in-text');
                }, 600 + (index * 900)); 
            });
        }, 1200);
    });
}

// Memories Gallery
function flipCard(element) {
    element.classList.toggle('is-flipped');
    playAudio('sound-paper');
}

// Open When Cards
function openWhenCard(element) {
    playAudio('sound-paper');
    element.classList.toggle('opened');
}


// =========================================
// 5. REASONS GENERATOR
// =========================================
const reasons = [
    "You have the most beautiful smile in the world.",
    "The way you look at me makes my heart melt.",
    "I love how you make me smile without even trying.",
    "Your voice is absolutely my favorite sound.",
    "You make ordinary, boring days feel incredibly special.",
    "I love how sweet and loving you are.",
    "Your kindness inspires me every single day.",
    "When you hug me, it feels like I'm finally home.",
    "I love the way your eyes light up when you get excited."
];

let isTyping = false;
async function typeWriter(text, element) {
    isTyping = true;
    element.innerHTML = '';
    for(let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        const typingSpeed = Math.random() * 40 + 30; 
        await new Promise(r => setTimeout(r, typingSpeed)); 
    }
    isTyping = false;
}

function generateReason(event) {
    if(isTyping) return;
    playAudio('sound-pop');
    createMiniHearts(event.clientX, event.clientY);
    const randomIndex = Math.floor(Math.random() * reasons.length);
    const reasonText = document.getElementById('reason-text');
    typeWriter(reasons[randomIndex], reasonText);
}


// =========================================
// 6. COUNTDOWN TIMER
// =========================================
function updateCountdown() {
    const now = new Date();
    const bDay = new Date(now.getFullYear(), 3, 1, 0, 0, 0); // April 1st
    
    if (now > bDay) {
        bDay.setFullYear(now.getFullYear() + 1);
    }
    
    const diff = bDay - now;
    const display = document.getElementById('countdown-display');
    
    if(display) {
        if (diff > 0 && diff < 86400000) { 
            display.innerText = "It's almost here! Get ready... 🎁";
        } else if (diff > 0) {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / 1000 / 60) % 60);
            const s = Math.floor((diff / 1000) % 60);
            display.innerText = `Only ${d}d ${h}h ${m}m ${s}s Left 🎂`;
        } else {
            display.innerText = "Happy Birthday, My Love! 🎉❤️";
        }
    }
}
setInterval(updateCountdown, 1000); 
updateCountdown();


// =========================================
// 7. PROPOSAL LOGIC (GIF ONLY SHOWS ON ACTION)
// =========================================
const btnNo = document.getElementById('btn-no');

if (btnNo) {
    btnNo.addEventListener('mouseover', evadeCursor);
    btnNo.addEventListener('touchstart', evadeCursor, {passive: false});
    
    function evadeCursor(e) {
        e.preventDefault();
        
        // NO button hover hone par GIF load aur show hoga
        const gifCard = document.getElementById('question-gif-card');
        if (gifCard) {
            gifCard.style.display = 'flex'; // Ensure flex for centering
            if (window.Tenor && window.Tenor.load) {
                window.Tenor.load();
            }
        }

        const container = document.querySelector('.proposal-buttons');
        const containerRect = container.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();
        
        // Calculate safe bounds
        const maxX = (containerRect.width - btnRect.width) / 2;
        const maxY = 50; // Max vertical movement up or down
        
        const randomX = (Math.random() * 2 - 1) * maxX;
        const randomY = (Math.random() * 2 - 1) * (window.innerWidth < 768 ? 30 : 50); 
        
        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
}

function acceptProposal(event) {
    if(event) event.preventDefault();
    
    const proposalState = document.getElementById('proposal-state');
    const successState = document.getElementById('success-state');
    
    // Smooth Fade Transition
    proposalState.classList.add('fade-out');
    
    setTimeout(() => {
        proposalState.style.display = 'none';
        successState.style.display = 'flex';
        successState.classList.remove('hidden-element');
        successState.classList.add('fade-in');
        
        if (typeof fireConfettiAndHearts === "function") fireConfettiAndHearts();
        
        // Force Tenor to load the new GIF
        setTimeout(() => {
            if (window.Tenor && window.Tenor.load) {
                window.Tenor.load();
            }
        }, 100);
    }, 600); // Matches CSS transition duration
}


// =========================================
// 8. FINAL SURPRISE GIFT BOX (WITH RING 💍 & MESSAGE SYNC)
// =========================================
let minimalGiftOpened = false;
function openGift() {
    if (minimalGiftOpened) return;
    minimalGiftOpened = true;
    
    if (typeof playAudio === "function") playAudio('sound-pop');
    
    const giftBox = document.getElementById("minimal-gift");
    giftBox.classList.add("opened"); // Box ka dhakkan khulega
    
    // Ring aayegi
    const ring = document.createElement('div');
    ring.innerHTML = '💍'; 
    ring.style.position = 'absolute';
    ring.style.top = '30px';
    ring.style.left = '50%';
    ring.style.transform = 'translate(-50%, 0) scale(0.1) rotate(-180deg)';
    ring.style.fontSize = '4.5rem';
    ring.style.opacity = '0';
    ring.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    ring.style.zIndex = '1';
    ring.style.filter = 'drop-shadow(0px 10px 10px rgba(0,0,0,0.3))';
    giftBox.appendChild(ring);
    
    // Ring pop out animation
    setTimeout(() => {
        ring.style.transform = 'translate(-50%, -100px) scale(1) rotate(0deg)';
        ring.style.opacity = '1';
    }, 300);

    // Ring poori pop out hone ke BAAD message aayega aur confetti footega
    setTimeout(() => {
        const msg = document.getElementById("surpriseMessage");
        msg.classList.add("show");
        msg.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof fireConfettiAndHearts === "function") fireConfettiAndHearts();
    }, 1100); // 1.1 seconds wait karega taki pehle ring dikh jaye
}


// =========================================
// 9. CONFETTI ENGINE
// =========================================
function fireConfettiAndHearts() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff4d79', '#cc0033', '#ffffff', '#ffdde1', '#ffd700'];

    for (let i = 0; i < 200; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2 + 100,
            r: Math.random() * 8 + 4,
            dx: Math.random() * 16 - 8, dy: Math.random() * -25 - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleInc: (Math.random() * 0.07) + 0.05, tiltAngle: 0,
            isHeart: Math.random() > 0.4 
        });
    }

    function drawHeart(ctx, x, y, size, color) {
        ctx.save(); ctx.translate(x, y); ctx.scale(size/12, size/12);
        ctx.beginPath(); ctx.fillStyle = color;
        ctx.moveTo(0, 0); ctx.bezierCurveTo(0, -3, -5, -3, -5, 0); ctx.bezierCurveTo(-5, 3, 0, 5, 0, 8);
        ctx.bezierCurveTo(0, 5, 5, 3, 5, 0); ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
        ctx.fill(); ctx.restore();
    }

    let animationId;
    function draw() {
        animationId = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.tiltAngle += p.tiltAngleInc;
            p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle) * 2;
            p.dy += 0.4; p.y += p.dy; p.x += p.dx;

            if(p.isHeart) { 
                drawHeart(ctx, p.x, p.y, p.r*2, p.color); 
            } else {
                ctx.beginPath(); ctx.lineWidth = p.r; ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r); ctx.stroke();
            }
            if (p.y > canvas.height) particles.splice(index, 1);
        });
        
        if (particles.length === 0) {
            cancelAnimationFrame(animationId);
            canvas.style.display = 'none';
        }
    }
    draw();
}


// =========================================
// 10. LOVE BOOTH LOGIC
// =========================================
const video = document.getElementById('video-preview');
const canvasOutput = document.getElementById('canvas-output');
const ctxOutput = canvasOutput ? canvasOutput.getContext('2d') : null;
let stream = null;
let userImage = null; 

const frameImages = {
    frame: new Image(),
    frame1: new Image(),
    frame2: new Image()
};

frameImages.frame.src = "images/frame.png";
frameImages.frame1.src = "images/frame1.png";
frameImages.frame2.src = "images/frame2.png"; 

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        video.srcObject = stream;
        video.style.display = 'block';
        canvasOutput.style.display = 'none';
        document.getElementById('camera-placeholder').style.display = 'none';
    } catch (err) {
        alert("Camera access denied. Please upload a photo instead!");
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if(!file) return;
    const img = new Image();
    
    img.onload = () => {
        if(stream) { stream.getTracks().forEach(t=>t.stop()); video.style.display='none'; }
        document.getElementById('camera-placeholder').style.display = 'none';
        canvasOutput.style.display = 'block';
        
        canvasOutput.width = 800; canvasOutput.height = 600; 
        
        const hRatio = canvasOutput.width / img.width;
        const vRatio = canvasOutput.height / img.height;
        const ratio  = Math.max(hRatio, vRatio);
        const centerShift_x = (canvasOutput.width - img.width * ratio) / 2;
        const centerShift_y = (canvasOutput.height - img.height * ratio) / 2;  

        userImage = document.createElement('canvas');
        userImage.width = 800; userImage.height = 600;
        const uCtx = userImage.getContext('2d');
        uCtx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        
        triggerFlash();
        applyFrame();
    };
    img.src = URL.createObjectURL(file);
}

function takePhoto() {
    if(!stream || video.style.display === 'none') {
        if(!userImage) alert("Please start camera or upload a photo first!");
        return;
    }
    
    triggerFlash();
    playAudio('sound-camera');
    
    canvasOutput.width = 800; canvasOutput.height = 600;
    
    userImage = document.createElement('canvas');
    userImage.width = 800; userImage.height = 600;
    const uCtx = userImage.getContext('2d');
    
    uCtx.translate(800, 0);
    uCtx.scale(-1, 1);
    uCtx.drawImage(video, 0, 0, 800, 600);
    
    video.style.display = 'none';
    canvasOutput.style.display = 'block';
    stream.getTracks().forEach(track => track.stop()); 
    stream = null;
    
    applyFrame();
}

function triggerFlash() {
    const flash = document.getElementById('camera-flash');
    if(flash) {
        flash.classList.add('flash-anim');
        setTimeout(() => flash.classList.remove('flash-anim'), 150);
    }
}

function applyFrameIfCanvasActive() {
    if(userImage) applyFrame();
}

function applyFrame() {
    const frameStyle = document.getElementById('frame-select').value;
    ctxOutput.clearRect(0,0, canvasOutput.width, canvasOutput.height);
    
    // Apply beauty filter for enhanced clarity
    ctxOutput.filter = "brightness(1.15) contrast(1.15) saturate(1.1)";
    ctxOutput.drawImage(userImage, 0, 0);
    
    // Apply soft beauty smoothing pass for natural skin refinement
    ctxOutput.save();
    ctxOutput.globalAlpha = 0.25;
    ctxOutput.filter = "blur(1.5px)";
    ctxOutput.drawImage(userImage, 0, 0);
    ctxOutput.restore();
    
    // Apply soft glow effect for natural radiance
    ctxOutput.globalAlpha = 0.08;
    ctxOutput.filter = "brightness(1.2)";
    ctxOutput.drawImage(userImage, 0, 0);
    ctxOutput.globalAlpha = 1;
    
    // Reset filter before drawing frame styles
    ctxOutput.filter = "none";

    ctxOutput.save();
    if(frameStyle === 'valentine') {
        ctxOutput.lineWidth = 30; ctxOutput.strokeStyle = '#cc0033';
        ctxOutput.strokeRect(15, 15, canvasOutput.width-30, canvasOutput.height-30);
        for(let i=0; i<8; i++) {
            ctxOutput.font = "50px Arial";
            ctxOutput.fillText("❤️", 20 + i*100, 60);
            ctxOutput.fillText("❤️", 20 + i*100, canvasOutput.height - 20);
        }
    } else if (frameStyle === 'polaroid-love') {
        ctxOutput.lineWidth = 40; ctxOutput.strokeStyle = '#ffffff';
        ctxOutput.strokeRect(20, 20, canvasOutput.width-40, canvasOutput.height-100);
        ctxOutput.fillStyle = '#ffffff';
        ctxOutput.fillRect(0, canvasOutput.height-120, canvasOutput.width, 120);
        ctxOutput.font = "bold 50px 'Dancing Script'";
        ctxOutput.fillStyle = '#cc0033';
        ctxOutput.fillText("Love You, Ananya", canvasOutput.width/2 - 170, canvasOutput.height - 40);
    } else if (frameStyle === 'heart-frame') {
        ctxOutput.lineWidth = 25; ctxOutput.strokeStyle = '#ffdde1';
        ctxOutput.strokeRect(12, 12, canvasOutput.width-24, canvasOutput.height-24);
        ctxOutput.font = "80px Arial";
        ctxOutput.fillText("💕", 30, 90); ctxOutput.fillText("💕", canvasOutput.width - 110, 90);
        ctxOutput.fillText("💕", 30, canvasOutput.height - 40); ctxOutput.fillText("💕", canvasOutput.width - 110, canvasOutput.height - 40);
    } else if (frameStyle === 'cute') {
        ctxOutput.lineWidth = 20; ctxOutput.strokeStyle = '#ff4d79';
        ctxOutput.setLineDash([30, 30]);
        ctxOutput.strokeRect(20, 20, canvasOutput.width-40, canvasOutput.height-40);
        ctxOutput.font = "italic bold 50px 'Playfair Display'";
        ctxOutput.fillStyle = 'white';
        ctxOutput.shadowColor = '#ff4d79'; ctxOutput.shadowBlur = 10;
        ctxOutput.fillText("Cuties forever", canvasOutput.width - 340, canvasOutput.height - 50);
    }
    ctxOutput.restore();

    // Reset filter before drawing frame images
    ctxOutput.filter = "none";
    if (frameImages[frameStyle]) {
        ctxOutput.drawImage(
            frameImages[frameStyle],
            0,
            0,
            canvasOutput.width,
            canvasOutput.height
        );
    }
}

function downloadPhoto() {
    if(!userImage) return alert("Take or upload a photo first!");
    const link = document.createElement('a');
    link.download = 'ananya_love_booth.png';
    link.href = canvasOutput.toDataURL("image/png");
    link.click();
}