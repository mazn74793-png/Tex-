/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Compass, Feather } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onStartQuiz: () => void;
  onExploreCatalog: () => void;
}

export default function Hero({ onStartQuiz, onExploreCatalog }: HeroProps) {
  return (
    <div id="tex_hero_container" className="relative overflow-hidden bg-[#FCFCF9] border-b border-[#E7E2D8] py-20 px-6 sm:px-12 lg:px-24">
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3EFE6] rounded-full blur-3xl opacity-60 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EFECE1] rounded-full blur-3xl opacity-40 -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Main Content (RTL & LTR Balanced Interface) */}
        <motion.div 
          id="hero_text_column"
          className="lg:col-span-7 space-y-8 text-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <div className="flex items-center justify-end gap-2 text-[#B45309]">
            <span className="text-xs tracking-wider uppercase font-mono text-[#D97706]">COUTURE ROYAL TEXTILES</span>
            <Sparkles className="w-4 h-4" />
            <span className="w-10 h-[1px] bg-[#D97706]/40"></span>
            <span className="text-sm font-medium font-serif">نسيج الملوك والأباطرة</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1C1917] leading-tight select-none">
              تكس للأقمشة الفاخرة
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#B45309] font-sans font-extralight mt-2">
                TEX | Haute Couture Fabric Boutique
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl ml-auto font-sans">
              مرحباً بكم في المحكم الفني للأناقة الساحرة. لأكثر من ثلاثة أجيال، قمنا بجمع ورعاية أندر وأجود أقمشة الحرير الإيطالي، والقطيفة الفرنسية الكثيفة، والدانتيل السويسري المضفر بالذهب عيار 18 لتلائم كبرى بيوت الأزياء العريقة وسيدات ورجال النخبة لتدوم ملوكيتها طوال العمر.
            </p>
          </div>

          {/* Visual USP Accents */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-[#E7E2D8] py-5 my-2">
            <div className="text-center">
              <span className="block text-xl font-serif font-bold text-[#1C1917]">100%</span>
              <span className="text-xs text-[#78716C]">ألياف عضوية طبيعية</span>
            </div>
            <div className="text-center border-l border-r border-[#E7E2D8]">
              <span className="block text-xl font-serif font-bold text-[#1C1917]">سانت غالن</span>
              <span className="text-xs text-[#78716C]">منبع غزل الدانتيل</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-serif font-bold text-[#1C1917]">كومو</span>
              <span className="text-xs text-[#78716C]">عاصمة الحرير الإيطالي</span>
            </div>
          </div>

          {/* Quick Luxury Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-2">
            
            <button
              id="btn_explore_catalog"
              onClick={onExploreCatalog}
              className="px-8 py-4 border border-[#1C1917] bg-[#1C1917] text-[#FCFCF9] hover:bg-[#D97706] hover:border-[#D97706] transition-all duration-300 font-sans font-medium text-sm rounded shadow-sm tracking-wide"
            >
              استرسال الكتالوج الملوكي
            </button>
            <button
              id="btn_start_matchmaker"
              onClick={onStartQuiz}
              className="px-8 py-4 border border-[#D97706]/40 bg-[#FCFCF9] text-[#B45309] hover:bg-[#FAF6EC] transition-all duration-300 font-sans font-medium text-sm rounded flex items-center justify-center gap-2"
            >
              <Feather className="w-4 h-4 text-[#D97706]" />
              اكتشاف المُنَسّق التفاعلي (ماتش ميكر)
            </button>
          </div>
        </motion.div>

        {/* Brand Display Visual Art Column */}
        <motion.div 
          id="hero_visual_column"
          className="lg:col-span-5 relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Main Visual Image Frame with Gold Thread Border */}
          <div className="relative p-3 bg-[#FCFCF9] border border-[#E7E2D8] shadow-xl rounded-lg overflow-hidden max-w-sm w-full">
            <div className="absolute inset-0 border-[3px] border-[#D97706]/30 m-2 pointer-events-none z-10"></div>
            
            <img 
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury Silk Couture Drapery" 
              className="w-full h-96 object-cover filter brightness-95 contrast-105"
            />
            
            {/* Soft Floating Label */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#FCFCF9]/95 backdrop-blur-sm p-4 border border-[#E7E2D8] text-right z-20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#D97706] block">COUTURE FABRICS</span>
              <span className="font-serif text-sm font-semibold text-[#1C1917] block mt-0.5">زخرفة حرير كومو الطبيعي</span>
              <p className="text-[11px] text-[#78716C] mt-1 font-sans">
                ينسدل بسلاسة فائقة ليوفر تماوج ضوئي ثلاثي الأبعاد تحت ثريات الكريستال.
              </p>
            </div>
          </div>

          {/* Underlay Geometric Accent representing fabrics weaving loom lines */}
          <div className="absolute -z-10 w-full h-full border border-dashed border-[#E7E2D8] rotate-3 scale-95 pointer-events-none rounded-lg"></div>
        </motion.div>

      </div>
    </div>
  );
}
