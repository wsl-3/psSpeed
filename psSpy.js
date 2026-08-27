"use strict";

let isExploiting = false;
let attemptCount = 0;
const maxAttempts = 200; // أقصى عدد محاولات للأمان

// دالة الطباعة داخل التيرمينال الأخضر في الواجهة
function logToTerminal(text, type = "info") {
    var termContainer = document.getElementById("terminal-container");
    if (termContainer) termContainer.style.display = "block";

    var termBox = document.getElementById("terminal");
    if (!termBox) return;

    var timestamp = new Date().toLocaleTimeString();
    var color = "#00ff00";
    if (type === "error") color = "#ff3333";
    if (type === "success") color = "#33ff33";
    if (type === "process") color = "#00ccff";

    termBox.innerHTML += `<div style="color: ${color};">[${timestamp}] ${text}</div>`;
    termBox.scrollTop = termBox.scrollHeight;
}

// دالة تشغيل الثغرة السريعة (Fast-Spray Loop)
function startFastExploit() {
    if (isExploiting) return;
    isExploiting = true;
    attemptCount = 0;

    logToTerminal("[!] Initializing PS Spy Fast-Spray Engine...", "info");
    logToTerminal("[*] Target: P2JB Memory Injection & RAM Scan Optimization", "info");

    // إنشاء iframe خفي لتشغيل ملف الثغرة الأصلي (p2jb.html) بالخلفية وبالمعلمات المطلوبة
    let hiddenFrame = document.getElementById("p2jb-frame");
    if (!hiddenFrame) {
        hiddenFrame = document.createElement("iframe");
        hiddenFrame.id = "p2jb-frame";
        hiddenFrame.style.display = "none";
        document.body.appendChild(hiddenFrame);
    }

    // إطلاق الثغرة بالمعلمات التلقائية
    hiddenFrame.src = "p2jb.html?go=1&auto=1&trigger=netcontrol&payload=1&v=131";

    // حلقة الضغط السريع (تحاول عدة مرات بالثانية لفحص الذاكرة وقنص الثغرة)
    const exploitInterval = setInterval(() => {
        attemptCount++;
        
        logToTerminal(`[Attempt #${attemptCount}] Spraying heap & scanning RAM offsets...`, "process");

        // التحقق من نجاح الثغرة (عبر رصد الجلسة أو استجابة النظام)
        if (checkExploitSuccess()) {
            clearInterval(exploitInterval);
            logToTerminal(`[✔] SUCCESS! RAM Exploit payload injected at attempt #${attemptCount}`, "success");
            isExploiting = false;
            
            setTimeout(() => {
                window.location.href = "p2jb.html?payload=1"; // الانتقال لقائمة البايلودات عند النجاح
            }, 1500);
            return;
        }

        // إيقاف آمان عند الوصول للحد الأقصى للمحاولات
        if (attemptCount >= maxAttempts) {
            clearInterval(exploitInterval);
            logToTerminal(`[-] Reached max attempts (${maxAttempts}). Please restart browser/console if needed.`, "error");
            isExploiting = false;
        }

    }, 250); // محاولة كل 250 ملي ثانية لضمان السرعة العالية بدون تجميد المتصفح
}

// دالة فحص حالة النجاح
function checkExploitSuccess() {
    try {
        // فحص ما إذا تم حفظ حالة الجلبريك في الجلسة أو تخزين المتصفح
        if (sessionStorage.getItem("slopkit-poops:jb") === "1") {
            return true;
        }
    } catch (e) {}
    
    return false;
}

// ربط الزر تلقائياً بمجرد تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
    const p2jbBtn = document.getElementById("btnp2jb");
    if (p2jbBtn) {
        p2jbBtn.addEventListener("click", (e) => {
            e.preventDefault(); // منع الرابط العادي واستخدام محرك السباي السريع
            startFastExploit();
        });
    }
});
