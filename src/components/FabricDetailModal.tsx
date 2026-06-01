/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FabricItem } from "../types";
import { X, Sun, Moon, Sparkles, Send, ShieldCheck, Ruler, Scale } from "lucide-react";
import { motion } from "motion/react";

interface FabricDetailModalProps {
  fabric: FabricItem;
  onClose: () => void;
}

export default function FabricDetailModal({ fabric, onClose }: FabricDetailModalProps) {
  const [lightMode, setLightMode] = useState<"day" | "evening" | "chandelier">("day");

  // Localized Arabic microcopy explaining how the weave reacts to this lighting
  const getMicrocopy = () => {
    switch (lightMode) {
      case "day":
        return `المحاكاة الطبيعية (نهار طبيعي): تحت أشعة الشمس المباشرة، تعبر خيوط البنية الفريدة لـ (${fabric.nameAr}) عن ألوانها الحقيقية بدقة متناهية. تظهر الفراغات الميكروية للغزل لتؤكد جودة التنفس العضوي ولمعانه المحايد المبهج.`;
      case "evening":
        return `محاكاة المحفل الملكي (سهرة دافئة): تنسدل موجات الضوء الخافتة على وجه القماش لتستثير لمعانه الراقي الغامض. تنعكس إضاءة الفوانيس الصفراء لتعطي عمقاً دافئاً يبين تفاصيل التضاريس المخملية الرطبة ويبعث على الهيبة.`;
      case "chandelier":
        return `شروق الكريستال (ثريا كريستال): ينعكس الوميض المكثف لثريات الصالات الملكية على خيوط النسيج المنسوجة بلمسات ذهبية وفضية عاكسة، لتولد وهجاً ثلاثي الأبعاد لا يخبو، وكأنك نجم الحفل الأوحد في الساحات المخملية.`;
    }
  };

  // Get image filter classes according to lighting simulator selection
  const getFilterStyle = () => {
    switch (lightMode) {
      case "day":
        return "brightness-[1.04] contrast-[1.02] saturate-100 transition-all duration-500 ease-in-out";
      case "evening":
        return "sepia-[0.35] brightness-[0.88] contrast-[0.96] saturate-[1.12] hue-rotate-[-8deg] transition-all duration-500 ease-in-out";
      case "chandelier":
        return "brightness-[1.16] contrast-[1.18] saturate-[1.22] drop-shadow-[0_10px_20px_rgba(217,119,6,0.25)] transition-all duration-500 ease-in-out";
    }
  };

  const getWhatsAppLink = () => {
    const defaultPhone = "+966500000000";
    const text = `مرحباً دار تكس،
أود الاستفسار وحجز كمية من قماش الكوتور الراقي:
- الاسم: *${fabric.nameAr} - ${fabric.nameEn}*
- المنشأ: ${fabric.originAr}
- الوزن: ${fabric.weightGsm} GSM
- التركيب: ${fabric.compositionAr}
الرجاء تنسيق موعد لزيارتي في صالوني الخاص ممسكاً بالعينات.`;
    return `https://api.whatsapp.com/send?phone=${defaultPhone}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="fabric_detail_modal">
      {/* Dark luxury backdrop blur */}
      <div 
        className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div 
          className="relative w-full max-w-5xl bg-[#FCFCF9] border border-[#E7E2D8] rounded-lg shadow-2xl flex flex-col md:grid md:grid-cols-12 overflow-hidden text-right"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4 }}
        >
          {/* Close trigger button absolute */}
          <button 
            id="close_modal_button"
            onClick={onClose}
            className="absolute top-4 left-4 z-30 bg-[#FCFCF9] border border-stone-200 text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Interactive LIGHT Simulator Panel (Left / Top column) */}
          <div className="md:col-span-6 bg-[#FAF6EC] p-6 lg:p-8 flex flex-col justify-between border-l border-[#E7E2D8]">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#D97706] font-mono block">FABRIC LIGHT REFRACTION SIMULATOR</span>
              <h4 className="text-xl font-serif text-[#1C1917]">محاكي انعكاس وحرية البريق الضوئي</h4>
              <p className="text-xs text-[#78716C]">اضغط على أنماط الإضاءة أدناه لمشاهدة استجابة خامات الغزل الطبيعي وتحفيز الأتيليه:</p>

              {/* Lighting buttons row */}
              <div className="grid grid-cols-3 gap-2 bg-stone-200/50 p-1 rounded-lg">
                <button
                  id="simulator_btn_day"
                  onClick={() => setLightMode("day")}
                  className={`py-2 px-3 rounded flex items-center justify-center gap-1.5 text-xs font-sans transition-all duration-300 ${lightMode === "day" ? "bg-white text-[#B45309] shadow-sm font-semibold" : "text-stone-600 hover:text-stone-900"}`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>نهار طبيعي</span>
                </button>
                <button
                  id="simulator_btn_evening"
                  onClick={() => setLightMode("evening")}
                  className={`py-2 px-3 rounded flex items-center justify-center gap-1.5 text-xs font-sans transition-all duration-300 ${lightMode === "evening" ? "bg-[#1C1917] text-white shadow-sm font-semibold" : "text-stone-600 hover:text-stone-900"}`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>سهرة دافئة</span>
                </button>
                <button
                  id="simulator_btn_chandelier"
                  onClick={() => setLightMode("chandelier")}
                  className={`py-2 px-3 rounded flex items-center justify-center gap-1.5 text-xs font-sans transition-all duration-300 ${lightMode === "chandelier" ? "bg-[#D97706] text-white shadow-sm font-semibold" : "text-stone-600 hover:text-stone-900"}`}
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>ثريا كريستال</span>
                </button>
              </div>
            </div>

            {/* Immersive Image Canvas and Overlay with filter */}
            <div className="relative my-6 aspect-video md:aspect-square overflow-hidden rounded-lg border border-[#E7E2D8] bg-stone-800">
              {/* Optional glow ring for chandelier mode */}
              {lightMode === "chandelier" && (
                <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none z-10 animate-pulse mix-blend-overlay"></div>
              )}
              {lightMode === "evening" && (
                <div className="absolute inset-0 bg-amber-900/10 pointer-events-none z-10 mix-blend-multiply"></div>
              )}
              <img 
                referrerPolicy="no-referrer"
                src={fabric.unsplashUrl} 
                alt={`${fabric.nameAr} - Weave refraction test`} 
                className={`w-full h-full object-cover ${getFilterStyle()}`}
              />
              <div className="absolute bottom-3 left-3 bg-[#1C1917]/85 text-white/90 py-1.5 px-3 rounded font-mono text-[9px] uppercase tracking-widest z-15 select-none animate-fade-in">
                MODE: {lightMode.toUpperCase()} | WEAVE ACTIVE
              </div>
            </div>

            {/* Microcopy describing reflection details */}
            <div className="bg-[#FCFCF9] border border-[#E7E2D8] p-4 rounded text-xs text-stone-800 leading-relaxed font-sans shadow-sm">
              {getMicrocopy()}
            </div>
          </div>

          {/* Catalog Information Fields (Right / Bottom column) */}
          <div className="md:col-span-6 p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category tag */}
              <div className="flex justify-between items-center flex-row-reverse">
                <span className="text-[#B45309] font-semibold text-xs border border-[#D97706]/40 px-3 py-1 rounded bg-[#FAF6EC]">
                  {fabric.categoryAr}
                </span>
                <span className="text-stone-500 font-mono text-[10px]">
                  ID: #{fabric.id}
                </span>
              </div>

              {/* Fabric Names */}
              <div>
                <h3 className="text-3xl font-serif text-[#1C1917] font-semibold leading-tight">{fabric.nameAr}</h3>
                <h5 className="text-[#78716C] font-serif text-sm mt-1">{fabric.nameEn}</h5>
              </div>

              {/* Price display block with ivory framing */}
              <div className="p-4 bg-stone-50 rounded border border-stone-200 text-stone-900 flex justify-between items-center flex-row-reverse">
                <span className="text-xs text-stone-500 font-sans">عرض سعر المتر للتفصيل</span>
                <div className="text-right">
                  <span className="text-2xl font-serif font-semibold text-[#B45309]">{fabric.pricePerMeterAr}</span>
                  <span className="text-xs text-stone-400 font-mono block">({fabric.pricePerMeterEn})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {fabric.descriptionAr}
              </p>
              <p className="text-stone-400 italic text-xs leading-relaxed font-serif border-t border-stone-100 pt-3">
                {fabric.descriptionEn}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-stone-50 p-2.5 rounded border border-stone-100 flex items-center justify-between flex-row-reverse">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-sans">المنشأ الأصلي</span>
                    <span className="text-xs text-stone-800 font-semibold">{fabric.originAr}</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                </div>
                <div className="bg-stone-50 p-2.5 rounded border border-stone-100 flex items-center justify-between flex-row-reverse">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-sans">الوزن التقريبي</span>
                    <span className="text-xs text-stone-800 font-semibold font-mono">{fabric.weightGsm} GSM</span>
                  </div>
                  <Scale className="w-4 h-4 text-[#D97706]" />
                </div>
                <div className="bg-stone-50 p-2.5 rounded border border-stone-100 flex items-center justify-between flex-row-reverse">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-sans">انسياب القماش</span>
                    <span className="text-xs text-stone-800 font-semibold">{fabric.drapeAr || "منساب كامل وناعم"}</span>
                  </div>
                  <Ruler className="w-4 h-4 text-[#D97706]" />
                </div>
                <div className="bg-stone-50 p-2.5 rounded border border-stone-100 flex items-center justify-between flex-row-reverse">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-sans">بريق النسيج</span>
                    <span className="text-xs text-stone-800 font-semibold">{fabric.lustreRatingAr || "لمعان ملوكي خافت"}</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                </div>
              </div>

              {/* Composition Detail */}
              <div className="pt-2">
                <span className="text-[11px] font-sans text-stone-400 block mb-1">التركيبة النسيجية بالكامل:</span>
                <span className="text-xs font-sans text-stone-700 bg-stone-100 py-1.5 px-3 rounded block border border-stone-200">
                  {fabric.compositionAr} | <span className="text-stone-500 font-mono text-[11px]">{fabric.compositionEn}</span>
                </span>
              </div>
            </div>

            {/* Ordering and closing actions */}
            <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                id="modal_close_btn_bottom"
                onClick={onClose}
                className="px-5 py-3 border border-stone-300 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors rounded text-xs font-sans"
              >
                العودة للكتالوج
              </button>
              <a
                id="modal_order_btn_whatsapp"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 rounded text-xs font-sans font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                <span>طلب حياكة ومعاينة خاصة (واتساب)</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
