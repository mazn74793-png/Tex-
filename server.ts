/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize GenAI client lazily or safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("TEX Server: Gemini API initialized successfully.");
    } catch (e) {
      console.error("TEX Server: Error initializing Gemini Client:", e);
    }
  } else {
    console.log("TEX Server: Running in fallback model mode (GEMINI_API_KEY not defined).");
  }

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "alive", timestamp: new Date().toISOString() });
  });

  // Client-Facing Chat Endpoint (Feature C: Custom interactive styling advisor)
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, catalogContext } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "تفاصيل الرسالة غير صالحة" });
      }

      const lastUserMessage = messages[messages.length - 1]?.content || "";

      if (!ai) {
        // Fallback elegant styling advice in majestic classical Arabic in case API key is missing
        const responseText = `مرحباً بكم في صالون "تكس للأقمشة الفاخرة" الملكي. نتشرف بخدمتكم يا ضيفنا المبجل. 
نظراً لأن مستشار التنسيق الذكي يعمل حالياً في وضع الطوارئ التراثي لعدم تجهيز مفاتيح التشغيل الرقمية بالكامل، يسعدني للغاية تقديم هذه المشورة المخلصة بصفتي المنسق العام للدار:

نحن نقترح دائماً ثلاثة خيارات ملوكية تفوق الخيال:
١. **الحرير الإيطالي الملكي**: للسهرات فائقة الانسيابية والعروس الحالمة بالرقي.
٢. **المخمل الفرنسي الفاخر**: للمناسبات الرسمية التي يضيء ليلها لمسات الشموع والثريات وبحاجة لقوام فخم مهيب.
٣. **دانتيل الشابيرون السويسري المذهب**: لإضافة رتوش ملوكية ساحرة تحبس الأنفاس.

كيف يمكنني مرافقتكم لتفصيل القطعة القادمة الأكثر جاذبية وسحراً؟`;

        return res.json({ text: responseText });
      }

      const systemInstruction = `أنت المصمم والمنسق الفني الأسطوري الحصري لدار "تكس | TEX" للأقمشة الفاخرة والهوت كوتور (Haute Couture) في باريس وميلانو والخليج العربي.
تتحدث باللغة العربية الفصحى الراقية واللبقة جداً، وتُظهر ترحيباً ملوكياً وكأنك تخاطب الملوك والأمراء والشخصيات المخملية الفخمة.

كتالوج الأقمشة الحالي المتاح بالدار:
${JSON.stringify(catalogContext, null, 2)}

إرشادات هامة ودستور اللباقة:
1. انصح العملاء بأرقى خيارات الأقمشة من الكتالوج المتوفر لدينا بأسمائها الحقيقية بدقة وخبرة مصمم عريق.
2. استخدم مصطلحات الفخامة الملكية مثل (يا صاحب السمو، ضيفنا المبجل، أنيس الأناقة، نتشرف بخدمتكم في محراب تكس، سحر السحابات، الهوت كوتور).
3. عندما يسأل العميل عن مناسبة، حلل طبيعتها (مثلاً استقبال زفاف، معطف وقور، سهرة بالخارج) واقترح النسيج المطابق له من الكتالوج مع تبرير فني يخص وزن القطعة (Weight in gsm)، وطريقة انسدالها (drape)، وانعكاس بريقها المميز.
4. حافظ على إيجاز الردود الفخم وتجنب الحشو الطويل أو ذكر أي تفاصيل برمجية أو فنية تكنولوجية.
5. لا تقم أبداً بكتابة كود برمجي أو التحدث بصفتك نموذجاً حاسوبياً بل أنت المصمم الإنساني الخبير المخضرم لدار "تكس".`;

      // Formulate complete context including messages
      let promptContext = "إليك سجل الحديث الأخير مع الضيف للرد عليه بوقار ملوكي:\n";
      messages.forEach((msg: any) => {
        const senderName = msg.sender === "user" ? "العميل المبجل" : "المصمم تكس";
        promptContext += `\n[${senderName}]: ${msg.content}`;
      });
      promptContext += `\n[المصمم تكس]: `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptContext,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });

      const replyText = response.text || "أعتذر يا ضيفنا الفاضل، لقد حدث وهج طفيف في تدفق الأثير. كيف يمكنني خدمتك مجدداً؟";
      return res.json({ text: replyText });

    } catch (error: any) {
      console.error("TEX API ERROR:", error);
      return res.status(500).json({
        error: "أميرنا العزيز، نعتذر عن توقف مؤقت لخدمة التنسيق السحابي بسبب عطل فني في الأثير الجوي. يمكنك دائماً التواصل معنا مباشرة عبر الواتساب لتلقي المشورة الملوكية."
      });
    }
  });

  // Serve static assets OR handle Vite HMR Development Mode via middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("TEX Server: Running in DEVELOPMENT mode with Vite middleware.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("TEX Server: Running in PRODUCTION mode serving /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TEX Premium Server listening graciously on port ${PORT}`);
  });
}

startServer();
