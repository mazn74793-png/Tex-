/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FabricItem } from "../types";
import { CheckCircle2, Feather, HelpCircle, Scissors, ArrowLeft, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MatchmakerQuizProps {
  fabrics: FabricItem[];
  onSelectFabric: (id: string) => void;
}

export default function MatchmakerQuiz({ fabrics, onSelectFabric }: MatchmakerQuizProps) {
  const [step, setStep] = useState<number>(1);
  const [eventSelection, setEventSelection] = useState<string>("");
  const [feelSelection, setFeelSelection] = useState<string>("");
  const [styleSelection, setStyleSelection] = useState<string>("");

  // Options for Steps
  const step1Options = [
    { value: "bridal", title: "استقبال زفاف ملكي", desc: "أجواء العروس الفخمة، والمناسبات التي تخلدها الذاكرة للأبد." },
    { value: "formal_gala", title: "سهرة رسمية مهيبة", desc: "حفلات الأوبرا، المآدب الدبلوماسية، والاجتماعات رفيعة المستوى." },
    { value: "winter_coat", title: "معطف شتاء وقور", desc: "هيبة شتوية دافئة وإطلالات ملكية صامدة أمام برودة المناخ." },
    { value: "daily_luxury", title: "أناقة يومية وارفة", desc: "تفصيل مريح للمكاتب الفخمة واللقاءات الصباحية الراقية." },
  ];

  const step2Options = [
    { value: "silk", title: "انسيابية ونعومة حريرية", desc: "انسدال ناعم كالموج ولمعان رقيق تحت الضوء الفطري." },
    { value: "velvet", title: "فخامة هيكلية مخملية", desc: "وبر كثيف يمتص الإضاءة ويعيد صياغة الوقار والجاذبية." },
    { value: "wool", title: "دفء صوفي ملوكي (كشمير)", desc: "خيوط دافئة خفيفة الوزن تعانق الجسد برفق لا يماثل." },
    { value: "linen", title: "برودة منعشة وتنفس مطلق", desc: "كتان خفيف منساب يقاوم طقس الصيف بأقصى راحة طبيعية." },
  ];

  const step3Options = [
    { value: "minimalist", title: "بساطة أرستقراطية وقورة", desc: "قصات نظيفة هادئة، وخامات تتحدث نيابة عن الزركشة والحشو." },
    { value: "avant_garde", title: "ابتكار جريء خارق للعادة", desc: "تصاميم لافتة تستقطب الأضواء وتعبّر عن ذوق ريادي جامح." },
    { value: "grandeur", title: "العظمة التراثية المهيبة", desc: "زخارف مذهبة من عتيق التقاليد والأقمشة الموشاة الملوكية." },
  ];

  // Matcher logic
  const getMatch = (): { matchedfabric: FabricItem; advice: string } => {
    // Rely primarily on step 2 (Feel Selection). If not found, fallback to dynamic list
    let bestMatch = fabrics[0];

    if (feelSelection === "silk") {
      bestMatch = fabrics.find(f => f.categoryEn.toLowerCase().includes("silk") || f.id === "1") || fabrics[0];
    } else if (feelSelection === "velvet") {
      bestMatch = fabrics.find(f => f.categoryEn.toLowerCase().includes("velvet") || f.id === "2") || fabrics[1] || fabrics[0];
    } else if (feelSelection === "wool") {
      bestMatch = fabrics.find(f => f.categoryEn.toLowerCase().includes("wool") || f.id === "4") || fabrics[3] || fabrics[0];
    } else if (feelSelection === "linen") {
      bestMatch = fabrics.find(f => f.categoryEn.toLowerCase().includes("linen") || f.id === "6") || fabrics[5] || fabrics[0];
    }

    if (!bestMatch) {
      bestMatch = fabrics[0];
    }

    // Generate tailored poetic Advice based on options selected
    const eventName = step1Options.find(o => o.value === eventSelection)?.title || "";
    const styleName = step3Options.find(o => o.value === styleSelection)?.title || "";

    const advice = `أيها الضيف اللامع، لتصميم مخصص لـ (${eventName})، بأسلوب قائم على (${styleName})، وقع اختيار منسقي الأزياء لدينا في دار تكس على نسيج "${bestMatch.nameAr}". 

هذا النسيج المستورد من (${bestMatch.originAr}) يتماشى مع رؤيتكم الفنية الفذة؛ إذ توفر مواصفاته بوزن ${bestMatch.weightGsm} جرام غرامة متناهية تُبرز جسد التصميم بثقة. إننا نقترح تفصيل هذا الثوب مع ترك حيز للكتف المنسدل والانسياب الحاد للذيل، ليعبّر عن روح الدار العريقة الممزوجة بوقار الحضور الملوكي الشامخ.`;

    return { matchedfabric: bestMatch, advice };
  };

  const handleNext = (val: string) => {
    if (step === 1) {
      setEventSelection(val);
      setStep(2);
    } else if (step === 2) {
      setFeelSelection(val);
      setStep(3);
    } else if (step === 3) {
      setStyleSelection(val);
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setEventSelection("");
    setFeelSelection("");
    setStyleSelection("");
  };

  const { matchedfabric, advice } = step > 3 ? getMatch() : { matchedfabric: fabrics[0], advice: "" };

  // Create WhatsApp pre-filled text
  const getWhatsAppLink = (fabric: FabricItem, textAdvice: string) => {
    const defaultPhone = "+966500000000"; // Example Saudi luxury concierge number
    const formattedText = `مرحباً دار تكس للأقمشة الفاخرة،
أنا مهتم بطلب نسيج: *${fabric.nameAr} - ${fabric.nameEn}*
بناءً على ترشيح المنسق التفاعلي:
- المناسبة: ${step1Options.find(o => o.value === eventSelection)?.title}
- الطابع الفني: ${step3Options.find(o => o.value === styleSelection)?.title}
- النصيحة: ${textAdvice.substring(0, 150)}...
الرجاء التواصل معي لتقديم عرض أسعار للطور الملوكي.`;
    
    return `https://api.whatsapp.com/send?phone=${defaultPhone}&text=${encodeURIComponent(formattedText)}`;
  };

  return (
    <div id="quiz_section_card" className="max-w-4xl mx-auto my-12 bg-white rounded-lg border border-[#E7E2D8] shadow-sm overflow-hidden text-right">
      {/* Header bar of Matchmaker */}
      <div className="bg-[#1C1917] p-6 text-white flex justify-between items-center flex-row-reverse border-b border-[#D97706]/40">
        <div>
          <h2 className="text-xl font-serif font-semibold text-[#D97706]">منسق الأناقة التفاعلي</h2>
          <p className="text-xs text-[#E7E2D8]/80 mt-1 font-sans">حدد المعطيات وسيتولى مستشار دار تكس صياغة قماشك الأمثل</p>
        </div>
        <div className="bg-[#FCFCF9]/10 px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono font-bold text-[#D97706]">
          {step <= 3 ? `الخطوة ${step} من 3` : "التوصية الملكية"}
        </div>
      </div>

      {/* Progress Bar indicator */}
      {step <= 3 && (
        <div className="w-full bg-[#FAF6EC] h-[3px]">
          <div 
            className="bg-[#D97706] h-[3px] transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Main interactive cards area wrapper */}
      <div className="p-8 sm:p-12 min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[#D97706] font-serif text-sm">أولاً: محفل الأضواء واللقاء</span>
                <h3 className="text-2xl font-serif font-medium text-[#1C1917]">ما هي طبيعة المناسبة أو الاستخدام المستهدف للثوب الفاخر؟</h3>
                <p className="text-xs text-[#78716C]">التصميم يبدأ من سحر المكان والمضيفين.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {step1Options.map((opt) => (
                  <button
                    id={`s1_opt_${opt.value}`}
                    key={opt.value}
                    onClick={() => handleNext(opt.value)}
                    className="p-5 border border-[#E7E2D8] hover:border-[#D97706] hover:bg-[#FCFCF9] transition-all duration-200 text-right group rounded relative flex items-start gap-4"
                  >
                    <div className="flex-1 text-right">
                      <h4 className="font-sans font-semibold text-stone-800 text-sm group-hover:text-[#B45309]">{opt.title}</h4>
                      <p className="text-xs text-[#78716C] mt-1 line-clamp-2">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[#D97706] font-serif text-sm">ثانياً: ملمس السحاب على البشرة</span>
                <h3 className="text-2xl font-serif font-medium text-[#1C1917]">كيف تفضل أن يشعرك ملمس القماش عند ارتدائك له؟</h3>
                <p className="text-xs text-[#78716C]">الحرية الجسدية والتناغم اللمسي هما الأهم في دار الأناقة.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {step2Options.map((opt) => (
                  <button
                    id={`s2_opt_${opt.value}`}
                    key={opt.value}
                    onClick={() => handleNext(opt.value)}
                    className="p-5 border border-[#E7E2D8] hover:border-[#D97706] hover:bg-[#FCFCF9] transition-all duration-200 text-right group rounded relative flex items-start gap-4"
                  >
                    <div className="flex-1 text-right">
                      <h4 className="font-sans font-semibold text-stone-800 text-sm group-hover:text-[#B45309]">{opt.title}</h4>
                      <p className="text-xs text-[#78716C] mt-1 line-clamp-2">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[#D97706] font-serif text-sm">ثالثاً: روح الكاريزما البصرية</span>
                <h3 className="text-2xl font-serif font-medium text-[#1C1917]">ما هي الهوية الفنية التي ترغب في تجسيدها للناظرين؟</h3>
                <p className="text-xs text-[#78716C]">الهندسة البصرية للقطع الراقية تحكي قصتك دون تفوه بكلمة.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {step3Options.map((opt) => (
                  <button
                    id={`s3_opt_${opt.value}`}
                    key={opt.value}
                    onClick={() => handleNext(opt.value)}
                    className="p-5 border border-[#E7E2D8] hover:border-[#D97706] hover:bg-[#FCFCF9] transition-all duration-200 text-center group rounded relative flex flex-col items-center gap-3"
                  >
                    <div className="text-center w-full">
                      <h4 className="font-sans font-semibold text-stone-800 text-sm group-hover:text-[#B45309]">{opt.title}</h4>
                      <p className="text-xs text-[#78716C] mt-2 line-clamp-3">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Product Match details Column */}
              <div className="md:col-span-5 relative group overflow-hidden rounded border border-[#E7E2D8] p-3 bg-stone-50">
                <img 
                  referrerPolicy="no-referrer"
                  src={matchedfabric.unsplashUrl} 
                  alt={matchedfabric.nameAr} 
                  className="w-full h-64 object-cover rounded"
                />
                <div className="mt-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#D97706] font-mono">{matchedfabric.categoryAr}</span>
                  <h4 className="text-lg font-serif font-bold text-[#1C1917]">{matchedfabric.nameAr}</h4>
                  <div className="flex justify-between items-center flex-row-reverse text-xs text-stone-600 pt-1">
                    <span>المنشأ: {matchedfabric.originAr}</span>
                    <span className="text-[#B45309] font-bold font-serif">{matchedfabric.pricePerMeterAr} / للمتر</span>
                  </div>
                </div>
              </div>

              {/* Poetic Recommendation Column */}
              <div className="md:col-span-7 space-y-5 text-right">
                <div className="flex items-center justify-end gap-2 text-stone-500">
                  <span className="text-xs font-mono">TEX DESIGN STUDIO RECO</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <h3 className="text-2xl font-serif text-[#1C1917] leading-relaxed">
                  ترشيح الدار: <span className="text-[#B45309] underline decoration-[#D97706]/40">{matchedfabric.nameAr}</span>
                </h3>

                {/* Decorative Scroll box styling */}
                <div className="p-5 bg-[#FAF6EC] border-r-4 border-[#D97706] rounded-l text-stone-800 text-sm leading-relaxed font-sans whitespace-pre-line shadow-inner max-h-[180px] overflow-y-auto">
                  {advice}
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs border border-stone-300 font-sans text-stone-600 hover:bg-stone-50 rounded transition-all duration-200"
                  >
                    إعادة تجربة منسق الأناقة
                  </button>
                  <button
                    onClick={() => onSelectFabric(matchedfabric.id)}
                    className="px-4 py-2 text-xs border border-[#1C1917] bg-[#1C1917] text-white hover:bg-[#D97706] hover:border-[#D97706] rounded transition-all duration-200"
                  >
                    عرض خصائص وتفاصيل النسيج الكاملة
                  </button>
                  <a
                    href={getWhatsAppLink(matchedfabric, advice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded text-xs font-sans font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all duration-200 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 rotate-180" />
                    اطلب فوراً عبر الكونسيرج (واتساب)
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back navigation button if step is > 1 */}
        {step > 1 && step <= 3 && (
          <div className="flex justify-start border-t border-stone-100 pt-6 mt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 transition-colors font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              <span>العودة للخطوة السابقة</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
