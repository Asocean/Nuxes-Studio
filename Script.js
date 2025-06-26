// Tool Switching
document.querySelectorAll('.tool-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        document.querySelectorAll('.tool-icon').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.tool-container').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const tool = this.getAttribute('data-tool');
        document.getElementById(`${tool}-tool`).classList.add('active');
    });
});

// Instrument Selection
document.querySelectorAll('.instrument-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.instrument-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Recording Button
const recordButton = document.getElementById('record-button');
recordButton.addEventListener('click', function() {
    this.classList.toggle('recording');
    const isRecording = this.classList.contains('recording');
    
    if(isRecording) {
        this.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
        document.getElementById('waveform').style.display = 'block';
    } else {
        this.innerHTML = '<i class="fas fa-microphone"></i> Start Humming or Beatboxing';
        document.getElementById('waveform').style.display = 'none';
        document.querySelector('.preview-area').style.display = 'block';
    }
});

// Voice Assistant
const micButton = document.getElementById('mic-button');
const commandDisplay = document.getElementById('command-display');

micButton.addEventListener('click', function() {
    this.classList.toggle('listening');
    const isListening = this.classList.contains('listening');
    commandDisplay.classList.toggle('active', isListening);
    
    if(isListening) {
        simulateVoiceCommand();
    }
});

function simulateVoiceCommand() {
    const commands = [
        "Create an email responder agent",
        "Generate a piano track from my humming",
        "Make a mind map for my project plan",
        "Add drums to my board",
        "Schedule a meeting for tomorrow at 2 PM"
    ];
    
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    document.getElementById('command-text').textContent = randomCommand;
    
    setTimeout(() => {
        micButton.classList.remove('listening');
        commandDisplay.classList.remove('active');
    }, 5000);
}

// MindBoard Canvas
function initMindBoard() {
    const canvas = document.getElementById('mindboard-canvas');
    const ctx = canvas.getContext('2d');
    
    function setCanvasSize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawMindMap();
    }
    
    function drawMindMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw center node
        drawNode(centerX, centerY, "Nexus Studio", true);
        
        // Draw child nodes
        const nodes = [
            { x: centerX - 200, y: centerY - 150, text: "AI Agents" },
            { x: centerX + 200, y: centerY - 150, text: "Sound Tools" },
            { x: centerX - 200, y: centerY + 150, text: "Mind Mapping" },
            { x: centerX + 200, y: centerY + 150, text: "Voice Control" }
        ];
        
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = 'rgba(46, 196, 182, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
            drawNode(node.x, node.y, node.text);
        });
    }
    
    function drawNode(x, y, text, isCenter = false) {
        ctx.beginPath();
        ctx.arc(x, y, isCenter ? 40 : 30, 0, Math.PI * 2);
        ctx.fillStyle = isCenter ? 'rgba(46, 196, 182, 0.3)' : 'rgba(46, 196, 182, 0.2)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(46, 196, 182, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = 'white';
        ctx.font = isCenter ? '16px Inter' : '14px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    }
    
    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMindBoard);
