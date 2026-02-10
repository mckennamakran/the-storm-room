// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // ===== STORM ROOM PAGE FUNCTIONALITY =====
    // Only run storm room code if we're on the index page
    if (document.querySelector('.storm-container')) {
        console.log('Initializing Storm Room...');
        initializeStormRoom();
    }
    
    // ===== EXERCISES PAGE FUNCTIONALITY =====
    const startTimers = document.querySelectorAll('.start-timer');
    startTimers.forEach(button => {
        button.addEventListener('click', function() {
            const duration = parseInt(this.getAttribute('data-duration'));
            startExerciseTimer(duration, this);
        });
    });
});

// ===== STORM ROOM FUNCTIONS =====
function initializeStormRoom() {
    console.log('Storm Room initializing...');
    
    // DOM Elements
    const intensitySlider = document.getElementById('intensitySlider');
    const intensityValue = document.getElementById('intensityValue');
    const sky = document.querySelector('.sky');
    const rain = document.querySelector('.rain');
    const lightningContainer = document.querySelector('.lightning-container');
    const sun = document.querySelector('.sun');
    const rainbow = document.querySelector('.rainbow');
    const breathingText = document.getElementById('breathingText');
    const startBreathingBtn = document.getElementById('startBreathing');
    const stopBreathingBtn = document.getElementById('stopBreathing');
    const thoughts = document.querySelectorAll('.thought');
    const clearanceValue = document.getElementById('clearanceValue');
    const clearanceProgress = document.getElementById('clearanceProgress');
    const resetBtn = document.getElementById('resetBtn');
    const breathingCircle = document.querySelector('.circle');
    const circleBorder = document.querySelector('.circle-border');
    
    // Breathing elements
    const techniqueButtons = document.querySelectorAll('.breath-technique-btn');
    const breathingCount = document.getElementById('breathingCount');
    const breathingInstruction = document.getElementById('breathingInstruction');
    const inhaleIndicator = document.getElementById('inhaleIndicator');
    const holdIndicator = document.getElementById('holdIndicator');
    const exhaleIndicator = document.getElementById('exhaleIndicator');
    const inhaleTime = document.getElementById('inhaleTime');
    const holdTime = document.getElementById('holdTime');
    const exhaleTime = document.getElementById('exhaleTime');
    const cycleFill = document.getElementById('cycleFill');
    
    // Phase separators
    const inhaleSeparator = document.getElementById('inhaleSeparator');
    const holdSeparator = document.getElementById('holdSeparator');
    
    console.log('Elements found:', {
        sky: !!sky,
        rain: !!rain,
        sun: !!sun,
        rainbow: !!rainbow,
        intensitySlider: !!intensitySlider
    });
    
    // State variables
    let stormIntensity = parseInt(intensitySlider?.value || 60);
    let groundedThoughts = 0;
    const totalThoughts = thoughts.length;
    let isBreathingActive = false;
    let breathInterval;
    let breathCycle = 0;
    
    // Breathing technique variables
    let currentTechnique = 'belly';
    let inhaleDuration = 4;
    let holdDuration = 0;
    let exhaleDuration = 6;
    let totalBreathDuration = inhaleDuration + holdDuration + exhaleDuration;
    let currentPhase = 'inhale';
    let timeLeft = inhaleDuration;
    let breathTimer;
    let currentProgress = 0;
    
    // Initialize the storm
    updateStorm();
    updatePhaseSeparators();
    updateBreathingInstruction();
    
    // Event Listeners
    if (intensitySlider) {
        intensitySlider.addEventListener('input', function() {
            stormIntensity = parseInt(this.value);
            intensityValue.textContent = stormIntensity;
            console.log('Slider changed to:', stormIntensity);
            updateStorm();
        });
    }
    
    if (startBreathingBtn) {
        startBreathingBtn.addEventListener('click', startBreathingExercise);
    }
    
    if (stopBreathingBtn) {
        stopBreathingBtn.addEventListener('click', stopBreathingExercise);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetStorm);
    }
    
    thoughts.forEach(thought => {
        thought.addEventListener('click', function() {
            if (!this.classList.contains('grounded')) {
                groundThought(this);
            }
        });
    });
    
    // Breathing technique button listeners
    techniqueButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            techniqueButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update technique
            currentTechnique = this.getAttribute('data-technique');
            inhaleDuration = parseInt(this.getAttribute('data-inhale'));
            holdDuration = parseInt(this.getAttribute('data-hold')) || 0;
            exhaleDuration = parseInt(this.getAttribute('data-exhale'));
            
            // Update total duration
            totalBreathDuration = inhaleDuration + holdDuration + exhaleDuration;
            
            // Update display times
            inhaleTime.textContent = `${inhaleDuration}s`;
            holdTime.textContent = holdDuration > 0 ? `${holdDuration}s` : "0s";
            exhaleTime.textContent = `${exhaleDuration}s`;
            
            // Update phase separators
            updatePhaseSeparators();
            
            // Update breathing instruction based on technique
            updateBreathingInstruction();
            
            // Reset breathing state
            resetBreathingState();
            
            // If breathing is active, restart with new technique
            if (isBreathingActive) {
                stopBreathingExercise();
                startBreathingExercise();
            }
        });
    });
    
    // ===== STORM WEATHER FUNCTIONS =====
    function updateStorm() {
        console.log('Updating storm with intensity:', stormIntensity + '%');
        const intensity = stormIntensity / 100;
        const calm = 1 - intensity;
        
        // ===== 1. SKY COLOR =====
        if (sky) {
            const intensity = stormIntensity / 100;

            const lightBlueTop = [135, 206, 235];
            const mediumBlueTop = [70, 130, 180];
            const darkBlueTop = [5, 15, 30];

            let r, g, b;

            if (intensity <= 0.5) {
                // 0 → 50% : Light → Medium
                const t = intensity / 0.5;
                r = lightBlueTop[0] * (1 - t) + mediumBlueTop[0] * t;
                g = lightBlueTop[1] * (1 - t) + mediumBlueTop[1] * t;
                b = lightBlueTop[2] * (1 - t) + mediumBlueTop[2] * t;
            } else {
                // 50 → 100% : Medium → Dark
                const t = (intensity - 0.5) / 0.5;
                r = mediumBlueTop[0] * (1 - t) + darkBlueTop[0] * t;
                g = mediumBlueTop[1] * (1 - t) + darkBlueTop[1] * t;
                b = mediumBlueTop[2] * (1 - t) + darkBlueTop[2] * t;
            }

            sky.style.background = `linear-gradient(
                to bottom,
                rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}),
                rgb(${Math.floor(r - 20)}, ${Math.floor(g - 20)}, ${Math.floor(b - 20)})
            )`;
        }
        
        // ===== 2. CLOUDS =====
        const clouds = document.querySelector('.clouds');
        if (clouds) {
            clouds.style.opacity = 0.1 + (intensity * 0.9);
            console.log('Clouds opacity:', clouds.style.opacity);
        }
        
        // ===== 3. SUN =====
        if (sun) {
            sun.style.opacity = Math.max(0, calm);
            console.log('Sun opacity:', sun.style.opacity);
        }
        
        // ===== 4. RAINBOW =====
        if (rainbow) {
            const clearance = groundedThoughts / totalThoughts;
            rainbow.style.opacity = clearance * calm * 0.9;
            console.log('Rainbow opacity:', rainbow.style.opacity);
        }
        
        // ===== 5. RAIN =====
        updateRain(intensity);
        
        // ===== 6. LIGHTNING =====
        updateLightning(intensity);
    }
    
    function updateRain(intensity) {
        if (!rain) return;
        
        // Clear existing rain
        rain.innerHTML = '';
        
        // Rain starts at 30% intensity
        if (intensity < 0.3) {
            console.log('No rain - intensity below 30%');
            return;
        }
        
        // Rain intensity (0-1 scale from 30% to 100%)
        const rainIntensity = (intensity - 0.3) / 0.7;
        
        // Number of raindrops: 0 at 30%, 150 at 100%
        const dropCount = Math.floor(rainIntensity * 150);
        // Rain speed: slower for light rain, faster for heavy rain
        const dropSpeed = 0.8 + (rainIntensity * 2.2);
        
        console.log(`Rain: ${dropCount} drops at speed ${dropSpeed}s, intensity ${rainIntensity.toFixed(2)}`);
        
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            
            // Random properties
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.height = `${8 + Math.random() * 25 * rainIntensity}px`;
            drop.style.animationDelay = `${Math.random() * 3}s`;
            drop.style.animationDuration = `${dropSpeed}s`;
            drop.style.opacity = 0.1 + (Math.random() * 0.6 * rainIntensity);
            
            rain.appendChild(drop);
        }
    }
    
    function updateLightning(intensity) {
        // Clear any existing lightning interval
        clearInterval(window.lightningInterval);
        
        // Clear existing lightning
        if (lightningContainer) {
            const existing = lightningContainer.querySelectorAll('.lightning');
            existing.forEach(el => el.remove());
        }
        
        // Lightning starts at 70% intensity
        if (intensity < 0.7) {
            console.log('No lightning - intensity below 70%');
            return;
        }
        
        // Lightning chance: 0 at 70%, up to 15% chance per second at 100%
        let lightningChance;

        if (intensity < 0.8) {
            // Gentle ramp from 70% to 80%
            lightningChance = (intensity - 0.7) * 0.6;
        } else {
            // Aggressive ramp from 80% to 100%
            lightningChance = 0.06 + (intensity - 0.8) * 5.5;
        }
        
        console.log(`Lightning chance: ${(lightningChance * 100).toFixed(1)}% per second`);
        
        window.lightningInterval = setInterval(() => {
            if (Math.random() < lightningChance) {
                createLightning();
            }
        }, 1000);
    }
    
    function createLightning() {
        if (!lightningContainer) return;
        
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        // Random position and size
        const left = 20 + (Math.random() * 60); // 20-80%
        const height = 70 + (Math.random() * 100); // 70-170px
        const top = Math.random() * 40; // 0-40%
        const rotation = -20 + (Math.random() * 40); // -20 to +20 degrees
        
        lightning.style.left = `${left}%`;
        lightning.style.height = `${height}px`;
        lightning.style.top = `${top}%`;
        lightning.style.transform = `rotate(${rotation}deg)`;
        lightning.style.opacity = '0';
        lightning.style.zIndex = '20';
        
        lightningContainer.appendChild(lightning);
        
        // Flash sequence
        setTimeout(() => {
            // First flash
            lightning.style.opacity = '0.9';
            document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            
            // Quick secondary flash for realism
            setTimeout(() => {
                lightning.style.opacity = '1';
                
                // Flash branches
                createLightningBranches(left, height, top);
                
                // Fade out
                setTimeout(() => {
                    lightning.style.opacity = '0';
                    document.body.style.backgroundColor = '';
                    
                    // Remove element
                    setTimeout(() => {
                        lightning.remove();
                    }, 500);
                }, 150);
            }, 30);
        }, 10);
    }
    
    function createLightningBranches(mainLeft, mainHeight, mainTop) {
        const branchCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < branchCount; i++) {
            setTimeout(() => {
                const branch = document.createElement('div');
                branch.className = 'lightning';
                
                const left = mainLeft + (Math.random() * 10 - 5);
                const height = mainHeight * (0.2 + Math.random() * 0.3);
                const top = mainTop + (Math.random() * 10);
                const rotation = -40 + (Math.random() * 80);
                
                branch.style.left = `${left}%`;
                branch.style.height = `${height}px`;
                branch.style.top = `${top}%`;
                branch.style.transform = `rotate(${rotation}deg)`;
                branch.style.opacity = '0.7';
                branch.style.zIndex = '19';
                
                lightningContainer.appendChild(branch);
                
                setTimeout(() => {
                    branch.style.opacity = '0';
                    setTimeout(() => branch.remove(), 300);
                }, 100);
            }, i * 50);
        }
    }
    
    // ===== BREATHING EXERCISE FUNCTIONS =====
    function startBreathingExercise() {
        if (isBreathingActive) return;
        
        isBreathingActive = true;
        startBreathingBtn.disabled = true;
        stopBreathingBtn.disabled = false;
        
        // Set initial state
        currentPhase = 'inhale';
        timeLeft = inhaleDuration;
        currentProgress = 0;
        
        // Update indicators
        updateBreathingIndicators();
        
        // Start animations
        startBreathingAnimation();
        
        // Update display
        updateBreathingDisplay();
        breathingCount.textContent = `${timeLeft}s`;
        
        // Update progress
        updateBreathingProgress();
        
        // Start timer
        breathTimer = setInterval(updateBreathingTimer, 1000);
    }
    
    function stopBreathingExercise() {
        if (!isBreathingActive) return;
        
        isBreathingActive = false;
        startBreathingBtn.disabled = false;
        stopBreathingBtn.disabled = true;
        
        // Stop animations
        stopBreathingAnimation();
        
        // Clear timer
        clearInterval(breathTimer);
        
        // Update text
        breathingText.textContent = "Paused";
        breathingCount.textContent = "0s";
        breathingInstruction.textContent = "Breathing exercise paused";
        cycleFill.style.width = "0%";
        
        // Reset indicators
        inhaleIndicator.classList.remove('active');
        holdIndicator.classList.remove('active');
        exhaleIndicator.classList.remove('active');
    }
    
    function startBreathingAnimation() {
        const circle = document.querySelector('.circle');
        const circleBorder = document.querySelector('.circle-border');
        
        // Clear any existing animations
        circle.style.animation = 'none';
        circleBorder.style.animation = 'none';
        
        // Trigger reflow
        void circle.offsetWidth;
        void circleBorder.offsetWidth;
        
        // Start new animations
        const animationDuration = getCurrentPhaseDuration();
        
        switch(currentPhase) {
            case 'inhale':
                circle.style.animation = `inhale-animation ${animationDuration}s ease-in-out`;
                circleBorder.style.animation = `inhale-animation ${animationDuration}s ease-in-out`;
                break;
            case 'hold':
                circle.style.animation = `hold-animation ${animationDuration}s linear`;
                circleBorder.style.animation = `hold-animation ${animationDuration}s linear`;
                break;
            case 'exhale':
                circle.style.animation = `exhale-animation ${animationDuration}s ease-in-out`;
                circleBorder.style.animation = `exhale-animation ${animationDuration}s ease-in-out`;
                break;
        }
        
        // Update display
        updateBreathingDisplay();
    }
    
    function stopBreathingAnimation() {
        const circle = document.querySelector('.circle');
        const circleBorder = document.querySelector('.circle-border');
        
        circle.style.animation = 'none';
        circleBorder.style.animation = 'none';
    }
    
    function updateBreathingTimer() {
        timeLeft--;
        
        // Update countdown
        breathingCount.textContent = `${timeLeft}s`;
        
        // Update progress
        updateBreathingProgress();
        
        // Check if phase is complete
        if (timeLeft <= 0) {
            // Move to next phase
            switch(currentPhase) {
                case 'inhale':
                    if (holdDuration > 0) {
                        currentPhase = 'hold';
                        timeLeft = holdDuration;
                    } else {
                        currentPhase = 'exhale';
                        timeLeft = exhaleDuration;
                    }
                    break;
                case 'hold':
                    currentPhase = 'exhale';
                    timeLeft = exhaleDuration;
                    break;
                case 'exhale':
                    currentPhase = 'inhale';
                    timeLeft = inhaleDuration;
                    breathCycle++;
                    
                    // Reduce storm intensity with each full cycle
                    if (stormIntensity > 0) {
                        stormIntensity = Math.max(0, stormIntensity - 2);
                        intensitySlider.value = stormIntensity;
                        intensityValue.textContent = stormIntensity;
                        updateStorm();
                    }
                    break;
            }
            
            // Reset progress
            currentProgress = 0;
            
            // Update indicators
            updateBreathingIndicators();
            
            // Restart animation
            startBreathingAnimation();
            
            // Update display
            updateBreathingDisplay();
            
            // Update instruction
            updateBreathingInstruction();
        }
    }
    
    function updateBreathingProgress() {
        const phaseDuration = getCurrentPhaseDuration();
        const progressInPhase = (phaseDuration - timeLeft) / phaseDuration;
        
        let totalProgress = 0;
        
        switch(currentPhase) {
            case 'inhale':
                totalProgress = (progressInPhase * (inhaleDuration / totalBreathDuration)) * 100;
                break;
            case 'hold':
                const inhaleComplete = 100 * (inhaleDuration / totalBreathDuration);
                totalProgress = inhaleComplete + (progressInPhase * (holdDuration / totalBreathDuration)) * 100;
                break;
            case 'exhale':
                const inhaleHoldComplete = 100 * ((inhaleDuration + holdDuration) / totalBreathDuration);
                totalProgress = inhaleHoldComplete + (progressInPhase * (exhaleDuration / totalBreathDuration)) * 100;
                break;
        }
        
        cycleFill.style.width = `${totalProgress}%`;
    }
    
    function getCurrentPhaseDuration() {
        switch(currentPhase) {
            case 'inhale': return inhaleDuration;
            case 'hold': return holdDuration;
            case 'exhale': return exhaleDuration;
            default: return inhaleDuration;
        }
    }
    
    function updateBreathingDisplay() {
        switch(currentPhase) {
            case 'inhale':
                breathingText.textContent = "Breathe In";
                breathingText.style.color = "#4fc3f7";
                break;
            case 'hold':
                breathingText.textContent = "Hold";
                breathingText.style.color = "#ffb74d";
                break;
            case 'exhale':
                breathingText.textContent = "Breathe Out";
                breathingText.style.color = "#81c784";
                break;
        }
    }
    
    function updateBreathingIndicators() {
        // Remove active class from all indicators
        inhaleIndicator.classList.remove('active');
        holdIndicator.classList.remove('active');
        exhaleIndicator.classList.remove('active');
        
        // Add active class to current phase
        switch(currentPhase) {
            case 'inhale':
                inhaleIndicator.classList.add('active');
                break;
            case 'hold':
                holdIndicator.classList.add('active');
                break;
            case 'exhale':
                exhaleIndicator.classList.add('active');
                break;
        }
    }
    
    function updateBreathingInstruction() {
        let instruction = "";
        
        switch(currentPhase) {
            case 'inhale':
                switch(currentTechnique) {
                    case 'belly':
                        instruction = `Breathe in through your nose for ${inhaleDuration} seconds, expanding your belly`;
                        break;
                    case 'box':
                        instruction = `Inhale slowly and deeply for ${inhaleDuration} seconds`;
                        break;
                    case 'fourSevenEight':
                        instruction = `Inhale quietly through your nose for ${inhaleDuration} seconds`;
                        break;
                }
                break;
            case 'hold':
                instruction = `Hold your breath for ${holdDuration} seconds`;
                break;
            case 'exhale':
                switch(currentTechnique) {
                    case 'belly':
                        instruction = `Exhale slowly through your mouth for ${exhaleDuration} seconds, contracting your belly`;
                        break;
                    case 'box':
                        instruction = `Exhale completely for ${exhaleDuration} seconds`;
                        break;
                    case 'fourSevenEight':
                        instruction = `Exhale completely through your mouth for ${exhaleDuration} seconds`;
                        break;
                }
                break;
        }
        
        breathingInstruction.textContent = instruction;
    }
    
    function updatePhaseSeparators() {
        const inhalePercent = (inhaleDuration / totalBreathDuration) * 100;
        const holdPercent = (holdDuration / totalBreathDuration) * 100;
        
        if (inhaleSeparator) {
            inhaleSeparator.style.left = `${inhalePercent}%`;
            inhaleSeparator.style.display = inhalePercent > 0 && inhalePercent < 100 ? 'block' : 'none';
        }
        
        if (holdSeparator) {
            const holdStartPercent = inhalePercent;
            holdSeparator.style.left = `${holdStartPercent + holdPercent}%`;
            holdSeparator.style.display = holdDuration > 0 && (holdStartPercent + holdPercent) < 100 ? 'block' : 'none';
        }
    }
    
    function resetBreathingState() {
        if (isBreathingActive) {
            stopBreathingExercise();
        }
        
        currentPhase = 'inhale';
        timeLeft = inhaleDuration;
        currentProgress = 0;
        
        // Reset display
        breathingText.textContent = "Breathe In";
        breathingText.style.color = "#4fc3f7";
        breathingCount.textContent = `${inhaleDuration}s`;
        cycleFill.style.width = "0%";
        
        // Reset indicators
        updateBreathingIndicators();
        
        // Update instruction
        updateBreathingInstruction();
        
        // Stop any animations
        stopBreathingAnimation();
    }
    
    function groundThought(thoughtElement) {
        if (thoughtElement.classList.contains('grounded')) return;
        
        thoughtElement.classList.add('grounded');
        thoughtElement.textContent = "✓ " + thoughtElement.textContent;
        groundedThoughts++;
        
        // Update clearance progress
        const clearance = Math.floor((groundedThoughts / totalThoughts) * 100);
        clearanceValue.textContent = `${clearance}%`;
        clearanceProgress.style.width = `${clearance}%`;
        
        // Reduce storm intensity
        stormIntensity = Math.max(0, stormIntensity - 15);
        intensitySlider.value = stormIntensity;
        intensityValue.textContent = stormIntensity;
        
        updateStorm();
        
        // Visual feedback
        thoughtElement.style.transform = "scale(0.95)";
        setTimeout(() => thoughtElement.style.transform = "scale(1)", 300);
        
        document.body.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        setTimeout(() => document.body.style.backgroundColor = '', 300);
    }
    
    function resetStorm() {
        // Reset intensity
        stormIntensity = 60;
        intensitySlider.value = stormIntensity;
        intensityValue.textContent = stormIntensity;
        
        // Reset thoughts
        groundedThoughts = 0;
        thoughts.forEach(thought => {
            thought.classList.remove('grounded');
            if (thought.textContent.startsWith("✓ ")) {
                thought.textContent = thought.textContent.substring(2);
            }
        });
        
        // Reset clearance
        clearanceValue.textContent = "0%";
        clearanceProgress.style.width = "0%";
        
        // Reset breathing technique
        techniqueButtons.forEach(btn => btn.classList.remove('active'));
        const bellyBtn = document.querySelector('[data-technique="belly"]');
        bellyBtn.classList.add('active');
        currentTechnique = 'belly';
        inhaleDuration = parseInt(bellyBtn.getAttribute('data-inhale'));
        holdDuration = parseInt(bellyBtn.getAttribute('data-hold')) || 0;
        exhaleDuration = parseInt(bellyBtn.getAttribute('data-exhale'));
        totalBreathDuration = inhaleDuration + holdDuration + exhaleDuration;
        
        // Reset breathing state
        resetBreathingState();
        
        // Update display times
        inhaleTime.textContent = `${inhaleDuration}s`;
        holdTime.textContent = holdDuration > 0 ? `${holdDuration}s` : "0s";
        exhaleTime.textContent = `${exhaleDuration}s`;
        
        // Update phase separators
        updatePhaseSeparators();
        
        // Reset storm
        updateStorm();
        
        // Visual feedback
        document.body.style.backgroundColor = 'rgba(156, 39, 176, 0.1)';
        setTimeout(() => document.body.style.backgroundColor = '', 500);
    }
    
    // Initialize
    updateStorm();
}

// ===== EXERCISES PAGE TIMER FUNCTION =====
function startExerciseTimer(durationInSeconds, button) {
    let timeLeft = durationInSeconds;
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-clock"></i> ${formatTime(timeLeft)}`;
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        button.innerHTML = `<i class="fas fa-clock"></i> ${formatTime(timeLeft)}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-check"></i> Completed!`;
            button.style.background = 'linear-gradient(to right, #4caf50, #2e7d32)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 3000);
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}