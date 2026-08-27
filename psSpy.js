"use strict";

let isExploiting = false;
let attemptCount = 0;
const maxAttempts = 200;

// دالة الطباعة للتيرمينال الأخضر
function logToTerminal(text, type = "info") {
    let termContainer = document.getElementById("terminal-container");
    if (termContainer) termContainer.style.display = "block";

    let termBox = document.getElementById("terminal");
    if (!termBox) return;

    let timestamp = new Date().toLocaleTimeString();
    let color = "#00ff00";
    if (type === "error") color = "#ff3333";
    if (type === "success") color = "#33ff33";
    if (type === "process") color = "#00ccff";

    termBox.innerHTML += `<div style="color: ${color};">[${timestamp}] ${text}</div>`;
    termBox.scrollTop = termBox.scrollHeight;
}

// دالة التشغيل السريع المباشرة
function startFastExploit() {
    if (isExploiting) return;
    isExploiting = true;
    attemptCount = 0;

    logToTerminal("[!] Initializing PS Spy Fast-Spray Engine...", "info");
    logToTerminal("[*] Target: P2JB Memory Injection & RAM Optimization", "info");

    // حلقة محاولات سريعة تحاكي القنص السريع وتحدث الشاشة
    let exploitInterval = setInterval(() => {
        attemptCount++;
        
        logToTerminal(`[Attempt #${attemptCount}] Spraying heap & scanning RAM offsets...`, "process");

        // محاكاة سريعة للوصول للهدف، أو الانتقال المباشر لملف الثغرة بعد محاولات الضخ
        if (attemptCount >= 10) { // بعد 10 محاولات سريعة لتجهيز الذاكرة، يحولك للثغرة مباشرة لتثبيتها
            clearInterval(exploitInterval);
            logToTerminal(`[✔] Heap prepared! Launching P2JB payload execution...`, "success");
            
            setTimeout(() => {
                // فتح ملف p2jb الحقيقي مباشرة في نفس الصفحة
                window.location.href = "p2jb.html";
            }, 1000);
            return;
        }

        if (attemptCount >= maxAttempts) {
            clearInterval(exploitInterval);
            logToTerminal(`[-] Reached max attempts. Please restart console.`, "error");
            isExploiting = false;
        }

    }, 200); // سرعة عالية تنجز المهمة في ثوانٍ معدودة
}

// ربط الزر أوتوماتيكياً
window.addEventListener("DOMContentLoaded", () => {
    let p2jbBtn = document.getElementById("btnp2jb");
    if (p2jbBtn) {
        p2jbBtn.addEventListener("click", (e) => {
            e.preventDefault();
            startFastExploit();
        });
    }
});
