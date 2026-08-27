// psSpy.js - Unlimited High-Speed Memory Sniffer with Live Matrix Logs

let timerInterval;
let secondsElapsed = 0;
let attempts = 0;

function logToTerminal(message, color = "#3fb950") {
    const terminal = document.getElementById("terminal");
    const timestamp = new Date().toLocaleTimeString();
    terminal.innerHTML += `<span style="color: ${color};">[${timestamp}] ${message}</span><br>`;
    // التمرير التلقائي لأسفل عشان يشوف أحدث العمليات تنزل تحت
    terminal.scrollTop = terminal.scrollHeight;
}

function startFastExploit() {
    const statusDiv = document.getElementById("status");
    const timerSpan = document.getElementById("timer");
    const attemptsSpan = document.getElementById("attemptsCount");
    const terminal = document.getElementById("terminal");

    // تصفير العدادات واللوحة
    secondsElapsed = 0;
    attempts = 0;
    terminal.innerHTML = "";
    clearInterval(timerInterval);

    statusDiv.innerText = "Status: Spraying memory & hunting target (Unlimited Mode)...";
    statusDiv.style.color = "#f0883e";
    
    logToTerminal("Initializing memory spray heap...", "#f0883e");
    logToTerminal("Target listener active. Scanning addresses...", "#58a6ff");

    // تشغيل العداد الزمني المفتوح
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
        let hrs = Math.floor(secondsElapsed / 3600);
        let mins = Math.floor((secondsElapsed % 3600) / 60).toString().padStart(2, '0');
        let secs = (secondsElapsed % 60).toString().padStart(2, '0');
        
        if (hrs > 0) {
            timerSpan.innerText = `${hrs}:${mins}:${secs}`;
        } else {
            timerSpan.innerText = `${mins}:${secs}`;
        }
    }, 1000);

    // عملية الفحص بلا حدود مع طباعة تفاصيل كل دفعة في الشاشة الخضراء
    const quickScan = setInterval(() => {
        attempts++;
        attemptsSpan.innerText = attempts;

        // طباعة سجل حي لكل عدد معين من المحاولات أو كل محاولة
        if (attempts % 5 === 0) {
            let fakeHexOffset = "0x" + (0x7ffe00000000 + attempts * 0x1000).toString(16);
            logToTerminal(`Attempt #${attempts} -> Spraying Heap @ Offset: ${fakeHexOffset}`);
        }

        try {
            // فحص هل تحقق النجاح
            if (typeof pwn !== 'undefined') {
                clearInterval(quickScan);
                clearInterval(timerInterval);
                
                statusDiv.innerText = `Status: Success! Target acquired in ${timerSpan.innerText} (${attempts} attempts).`;
                statusDiv.style.color = "#3fb950";
                logToTerminal(`SUCCESS! Exploit payload injected successfully at attempt #${attempts}`, "#ff007f");
            }
        } catch (e) {
            console.error("psSpy scan error:", e);
            logToTerminal(`Error in memory read: ${e.message}`, "#f85149");
        }
    }, 100); // 10 محاولات في الثانية
}
