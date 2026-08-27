// psSpy.js - High-Speed Memory Sniffer with Live Timer & Tracker

let timerInterval;
let secondsElapsed = 0;
let attempts = 0;

function startFastExploit() {
    const statusDiv = document.getElementById("status");
    const timerSpan = document.getElementById("timer");
    const attemptsSpan = document.getElementById("attemptsCount");

    // إعادة تعيين العدادات عند البدء
    secondsElapsed = 0;
    attempts = 0;
    clearInterval(timerInterval);

    statusDiv.innerText = "Status: Spraying memory & hunting offsets...";
    statusDiv.style.color = "#f0883e";

    // تشغيل عداد الوقت الحقيقي (بالثواني)
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
        let mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        let secs = (secondsElapsed % 60).toString().padStart(2, '0');
        timerSpan.innerText = `${mins}:${secs}`;
    }, 1000);

    // عملية الفحص والمراقبة السريعة
    const quickScan = setInterval(() => {
        attempts++;
        attemptsSpan.innerText = attempts;

        try {
            // فحص هل تم العثور على العنوان أو المتغير الأساسي من ملفات سونيك
            if (typeof pwn !== 'undefined' || attempts > 500) {
                clearInterval(quickScan);
                clearInterval(timerInterval);
                
                if (attempts > 500) {
                    statusDiv.innerText = "Status: Max attempts reached. Please restart browser/console.";
                    statusDiv.style.color = "#f85149";
                } else {
                    statusDiv.innerText = `Status: Success! Address acquired in ${secondsElapsed} seconds (${attempts} attempts).`;
                    statusDiv.style.color = "#3fb950";
                }
            }
        } catch (e) {
            console.error("psSpy scan error:", e);
        }
    }, 100); // فحص كل 100 ملي ثانية لتوازن السرعة وعدم تعليق المتصفح
}
