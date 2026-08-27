let isExploiting = false;
let attemptCount = 0;
const maxAttempts = 100; // تقدر تزودها أو تنقصها حسب الحاجة

async function startFastExploit() {
    if (isExploiting) return;
    isExploiting = true;
    attemptCount = 0;

    logToTerminal("[!] Initializing PS Spy Fast-Spray Engine...", "info");
    logToTerminal("[*] Target: P2JB Memory Injection (RAM Spray)", "info");

    // حلقة المحاولات السريعة (تشتغل بالخلفية بدون ما تجمد الواجهة)
    const exploitInterval = setInterval(async () => {
        attemptCount++;
        
        // طباعة حالة البحث الحالية على التيرمينال الأخضر
        logToTerminal(`[Attempt #${attemptCount}] Spraying heap & scanning RAM offsets...`, "process");

        try {
            // هنا نستدعي دالة الثغرة الحقيقية من ملفات P2JB (مثل دالة الحقن أو الفحص)
            // تأكد إنك تربطها بالدالة الفعلية الموجودة في ملفات سوني، مثلاً:
            // let success = runP2JBSingleAttempt(); 
            
            // محاكاة للتحقق (استبدلها بالدالة الحقيقية حق الثغرة)
            let success = checkExploitSuccess(); 

            if (success) {
                clearInterval(exploitInterval);
                logToTerminal(`[✔] SUCCESS! RAM Exploit payload injected at attempt #${attemptCount}`, "success");
                isExploiting = false;
                // هنا تقدر تفتح قائمة البايلودات أو تنتقل للخطوة التالية
                return;
            }

        } catch (err) {
            logToTerminal(`[!] Warning on attempt ${attemptCount}: ${err.message}`, "error");
        }

        // إيقاف آمان لو وصلنا أقصى عدد محاولات عشان الذاكرة لا تمتلئ وتسوي Crash
        if (attemptCount >= maxAttempts) {
            clearInterval(exploitInterval);
            logToTerminal(`[-] Reached max attempts (${maxAttempts}). Please perform a Cold Boot if needed.`, "error");
            isExploiting = false;
        }

    }, 100); // 100 ملي ثانية تعني تقريباً 10 محاولات في الثانية الواحدة!
}

// دالة وهمية للتحقق - استبدلها بدالة الفحص الحقيقية من ملفات P2JB
function checkExploitSuccess() {
    // ملفات P2JB الأصلية عادة ترجع علامة نجاح أو تفحص الـ 9021 / elfldr
    return false; 
}
