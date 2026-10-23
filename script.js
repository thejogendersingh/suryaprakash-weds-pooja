/**
 * Wedding Invitation Interactive Experience
 * - Smooth envelope opening motion & transitions
 * - Interactive Scratch Card to reveal Save The Date
 * - Live Active Countdown Timer to 4th July 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const introScreen = document.getElementById('introScreen');
  const introFooter = document.getElementById('introFooter');
  const heroScreen = document.getElementById('heroScreen');
  const backBtn = document.getElementById('backBtn');
  const particlesLayer = document.getElementById('particlesLayer');
  const heroScrollContainer = document.getElementById('heroScrollContainer');
  const heroScrollPrompt = document.getElementById('heroScrollPrompt');

  // Scratch Elements
  const scratchCanvas = document.getElementById('scratchCanvas');
  const scratchHint = document.getElementById('scratchHint');
  const scratchContainer = document.getElementById('scratchCardContainer');

  // Timer Elements
  const daysVal = document.getElementById('daysVal');
  const hoursVal = document.getElementById('hoursVal');
  const minsVal = document.getElementById('minsVal');
  const secsVal = document.getElementById('secsVal');

  let isOpening = false;
  let isScratched = false;

  // =========================================================================
  // 1. GENTLE SLOW FALLING FLOWERS & PETALS (EASY & PEACEFUL)
  // =========================================================================
  const flowerPetalsLayer = document.getElementById('flowerPetalsLayer');
  const gentleFlowers = ['🌸', '🌼', '🏵️', '🍃', '🌸', '✨'];

  function dropGentleFlower() {
    if (!flowerPetalsLayer) return;

    const petal = document.createElement('span');
    petal.className = 'flower-petal';
    petal.textContent = gentleFlowers[Math.floor(Math.random() * gentleFlowers.length)];

    const randomLeft = Math.random() * 90 + 5; // 5% to 95%
    const duration = Math.random() * 5 + 11; // 11s to 16s (slow, serene fall)
    const size = Math.random() * 0.3 + 0.85; // 0.85rem to 1.15rem

    petal.style.left = `${randomLeft}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.fontSize = `${size}rem`;

    flowerPetalsLayer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);
  }

  // Spawn one flower every 2.6s (calm and subtle, never crowded)
  setInterval(dropGentleFlower, 2600);
  dropGentleFlower();
  setTimeout(dropGentleFlower, 1300);

  // Sparkle burst / celebration effect
  function triggerGentleCelebration(x, y) {
    if (navigator.vibrate) {
      try { navigator.vibrate([35, 50, 40]); } catch (e) {}
    }

    const items = ['🎉', '✨', '🌸', '💛', '🎊', '🏵️', '✨'];
    const count = 24; // gentle, easy, not over

    for (let i = 0; i < count; i++) {
      const burstItem = document.createElement('span');
      burstItem.className = 'celebration-pop';
      burstItem.textContent = items[Math.floor(Math.random() * items.length)];
      burstItem.style.position = 'fixed';
      burstItem.style.left = `${x}px`;
      burstItem.style.top = `${y}px`;
      burstItem.style.fontSize = `${Math.random() * 0.5 + 0.95}rem`;
      burstItem.style.zIndex = '9999';
      burstItem.style.transition = 'all 1.25s cubic-bezier(0.12, 1, 0.28, 1)';
      burstItem.style.transform = 'translate(-50%, -50%) scale(0.6)';

      document.body.appendChild(burstItem);

      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.3 - 0.15);
      const distance = Math.random() * 140 + 50;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance - 20;

      requestAnimationFrame(() => {
        burstItem.style.transform = `translate(${destX}px, ${destY}px) scale(${Math.random() * 0.4 + 0.9}) rotate(${Math.random() * 360}deg)`;
        burstItem.style.opacity = '0';
      });

      setTimeout(() => {
        burstItem.remove();
      }, 1300);
    }
  }

  function createSparkleBurst(x, y) {
    triggerGentleCelebration(x, y);
  }

  // =========================================================================
  // 2. ENVELOPE OPENING TRANSITION
  // =========================================================================
  function openInvitation() {
    if (isOpening) return;
    isOpening = true;

    if (navigator.vibrate) {
      try { navigator.vibrate([35, 50, 70]); } catch (e) {}
    }

    const rect = envelopeWrapper.getBoundingClientRect();
    createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    introScreen.classList.add('opening');

    setTimeout(() => {
      introScreen.classList.add('closed');
      introScreen.setAttribute('aria-hidden', 'true');

      heroScreen.classList.add('active');
      heroScreen.setAttribute('aria-hidden', 'false');

      // Initialize scratch canvas once hero section is shown
      initScratchCanvas();

      isOpening = false;
    }, 1100);
  }

  function backToEnvelope() {
    heroScreen.classList.remove('active');
    heroScreen.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
      introScreen.classList.remove('closed', 'opening');
      introScreen.setAttribute('aria-hidden', 'false');
      if (heroScrollContainer) {
        heroScrollContainer.scrollTop = 0;
      }
    }, 400);
  }

  envelopeWrapper.addEventListener('click', openInvitation);
  envelopeWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openInvitation();
    }
  });

  introFooter.addEventListener('click', openInvitation);
  if (backBtn) backBtn.addEventListener('click', backToEnvelope);

  if (heroScrollPrompt) {
    heroScrollPrompt.addEventListener('click', () => {
      const target = document.getElementById('saveDateSection');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 3. INTERACTIVE SCRATCH CARD
  // =========================================================================
  function initScratchCanvas() {
    if (!scratchCanvas || !scratchContainer) return;

    const ctx = scratchCanvas.getContext('2d');
    const width = scratchContainer.offsetWidth || 345;
    const height = scratchContainer.offsetHeight || 155;
    const dpr = window.devicePixelRatio || 1;

    scratchCanvas.width = width * dpr;
    scratchCanvas.height = height * dpr;
    scratchCanvas.style.width = `${width}px`;
    scratchCanvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Draw rich crimson royal surface matching Screenshot 1
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#781014');
    grad.addColorStop(0.5, '#99191d');
    grad.addColorStop(1, '#660a0e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw subtle inner golden border
    ctx.strokeStyle = 'rgba(223, 178, 62, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Text: "✦ SCRATCH TO REVEAL ✦"
    ctx.fillStyle = '#f4d375';
    ctx.font = '600 15px "Marcellus", "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '0.22em';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2);

    let isDrawing = false;
    let scratchedPixels = 0;

    function getPos(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isDrawing || isScratched) return;
      const pos = getPos(e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels++;
      if (scratchedPixels % 12 === 0) {
        checkProgress();
      }
    }

    function checkProgress() {
      if (isScratched) return;
      try {
        const imgData = ctx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
        let transparent = 0;
        const total = imgData.data.length / 4;
        for (let i = 3; i < imgData.data.length; i += 16) {
          if (imgData.data[i] === 0) transparent++;
        }
        const ratio = transparent / (total / 4);

        if (ratio > 0.35) {
          revealScratchCard();
        }
      } catch (err) {
        // Fallback for security restriction
      }
    }

    function revealScratchCard() {
      if (isScratched) return;
      isScratched = true;
      scratchCanvas.classList.add('revealed');
      if (scratchHint) {
        scratchHint.textContent = '🎉 2nd December 2026 Auspicious Date Revealed! 🎉';
        scratchHint.style.color = '#851417';
        scratchHint.style.fontWeight = '700';
      }
      const rect = scratchContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      triggerGentleCelebration(centerX, centerY);
      setTimeout(() => {
        triggerGentleCelebration(centerX, centerY);
      }, 350);
    }

    // Touch events
    scratchCanvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      scratch(e);
    }, { passive: true });

    scratchCanvas.addEventListener('touchmove', (e) => {
      scratch(e);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDrawing = false; });

    // Mouse events
    scratchCanvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      scratch(e);
    });

    scratchCanvas.addEventListener('mousemove', (e) => {
      scratch(e);
    });

    window.addEventListener('mouseup', () => { isDrawing = false; });

    // Click/tap fallback to reveal if tapped 3 times or long pressed
    let tapCount = 0;
    scratchCanvas.addEventListener('click', (e) => {
      tapCount++;
      scratch(e);
      if (tapCount >= 3) {
        revealScratchCard();
      }
    });
  }

  // =========================================================================
  // 4. ACTIVE LIVE COUNTDOWN TIMER (4th July 2026)
  // =========================================================================
  function updateCountdown() {
    if (!daysVal || !hoursVal || !minsVal || !secsVal) return;

    // Wedding Target Date: 2nd December 2026, 7:00 PM
    let target = new Date('2026-12-02T19:00:00+05:30').getTime();
    const now = new Date().getTime();
    let diff = target - now;

    // Ensure active positive countdown if system clock is ahead
    if (diff <= 0) {
      target = new Date('2027-12-02T19:00:00+05:30').getTime();
      diff = target - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysVal.textContent = String(days).padStart(2, '0');
    hoursVal.textContent = String(hours).padStart(2, '0');
    minsVal.textContent = String(minutes).padStart(2, '0');
    secsVal.textContent = String(seconds).padStart(2, '0');
  }

  // Run immediately and tick every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =========================================================================
  // 5. BACKGROUND MUSIC (Carnatic Serenity / YouTube song: assets/bg-music.mp3)
  // =========================================================================
  const bgMusic = document.getElementById('bgMusic');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  let isPlayingSong = false;

  function playSong() {
    if (!bgMusic) return;
    bgMusic.volume = 0.65;
    bgMusic.play().then(() => {
      isPlayingSong = true;
      updateAudioUI(true);
    }).catch((err) => {
      console.log('Audio autoplay prevented, awaiting user click:', err);
    });
  }

  function pauseSong() {
    if (!bgMusic) return;
    bgMusic.pause();
    isPlayingSong = false;
    updateAudioUI(false);
  }

  function updateAudioUI(isPlaying) {
    if (!audioToggleBtn) return;
    const soundOnIcon = audioToggleBtn.querySelector('.sound-on');
    const soundOffIcon = audioToggleBtn.querySelector('.sound-off');

    if (isPlaying) {
      if (soundOnIcon) soundOnIcon.classList.remove('hidden');
      if (soundOffIcon) soundOffIcon.classList.add('hidden');
      audioToggleBtn.style.color = '#f4d375';
      audioToggleBtn.style.borderColor = '#d4af37';
    } else {
      if (soundOnIcon) soundOnIcon.classList.add('hidden');
      if (soundOffIcon) soundOffIcon.classList.remove('hidden');
      audioToggleBtn.style.color = '#a0857b';
      audioToggleBtn.style.borderColor = 'rgba(160, 133, 123, 0.3)';
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (isPlayingSong) {
        pauseSong();
      } else {
        playSong();
      }
    });
  }

  // Also auto-start music when user clicks envelope to open invitation
  envelopeWrapper.addEventListener('click', () => {
    if (!isPlayingSong) {
      playSong();
    }
  }, { once: true });
});


