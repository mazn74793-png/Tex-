/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { FabricItem } from "./types";
import { loadFabrics, saveFabrics } from "./data/fabrics";

// Import Modular Components
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import MatchmakerQuiz from "./components/MatchmakerQuiz";
import FabricDetailModal from "./components/FabricDetailModal";
import AdminDrawer from "./components/AdminDrawer";

import { Crown, Sparkles, Scissors, Lock, Globe, HelpCircle, PhoneCall, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [fabrics, setFabrics] = useState<FabricItem[]>([]);
  const [selectedFabricId, setSelectedFabricId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Initialize and load dynamic list of fabrics from our persistent localStorage module
  useEffect(() => {
    const list = loadFabrics();
    setFabrics(list);
  }, []);

  // Sync to local storage and update app state
  const handleSaveFabrics = (updatedList: FabricItem[]) => {
    saveFabrics(updatedList);
    setFabrics(updatedList);
  };

  const activeSelectedFabric = fabrics.find((f) => f.id === selectedFabricId);

  const handleSelectFabric = (id: string) => {
    setSelectedFabricId(id);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Extract Hero & Showcase items for the Bento Showcase Row
  const heroFabrics = fabrics.filter((f) => f.placement === "Hero" || f.placement === "Showcase");

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#D97706]/20 selection:text-[#B45309]" id="tex_root_layout">
      
      {/* 1. Luxurious Header (شريط الصالة الملكية) */}
      <header className="sticky top-0 z-30 bg-[#FCFCF9]/90 backdrop-blur-md border-b border-[#E7E2D8] py-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-row-reverse">
          
          {/* Logo Brand Right aligned */}
          <div className="flex items-center gap-3 flex-row-reverse cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-10 h-10 rounded-full bg-[#1C1917] flex items-center justify-center text-[#D97706] border border-[#D97706]/40 shadow-inner">
              <Crown className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-right">
              <span className="font-serif text-xl font-extrabold text-[#1C1917] tracking-wide block">تكس للأقمشة الفاخرة</span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-[#D97706] block">TEX | HAUTE COUTURE</span>
            </div>
          </div>

          {/* Nav links Center (RTL perspective, right to left) */}
          <nav className="hidden md:flex gap-8 flex-row-reverse text-xs font-sans font-medium text-[#57534E]">
            <button 
              onClick={() => scrollToSection("tex_gallery_section")} 
              className="hover:text-[#B45309] transition-colors relative group py-1"
            >
              رواق المنسوجات
              <span className="absolute bottom-0 right-0 w-0 h-[1.5px] bg-[#D97706] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection("quiz_section_card")} 
              className="hover:text-[#B45309] transition-colors relative group py-1"
            >
              ماتش ميكر الأناقة
              <span className="absolute bottom-0 right-0 w-0 h-[1.5px] bg-[#D97706] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection("showroom_bento")} 
              className="hover:text-[#B45309] transition-colors relative group py-1"
            >
              رواد المعرض الملكي
              <span className="absolute bottom-0 right-0 w-0 h-[1.5px] bg-[#D97706] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Quick interactive utility actions left block */}
          <div className="flex items-center gap-3">
            {/* Secret Backoffice toggle button */}
            <button
              id="admin_vault_trigger"
              onClick={() => setIsAdminOpen(true)}
              className="px-4 py-2 border border-stone-200 text-stone-700 hover:text-[#B45309] hover:border-[#D97706]/40 bg-white shadow-sm hover:bg-[#FAF6EC] rounded text-xs transition-colors flex items-center justify-center gap-1.5 font-sans"
            >
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">خزنة الإدارة والقطع</span>
            </button>
            
            <a
              href="https://api.whatsapp.com/send?phone=+966500000000&text=مرحباً دار تكس للأقمشة الفاخرة، أود الاستفسار عن تفصيل أقمشة ملكية خاصة."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 text-white rounded text-xs font-sans hover:bg-emerald-700 transition-colors shadow-sm hidden sm:inline"
            >
              الكونسيرج الهاتفي
            </a>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <Hero 
        onStartQuiz={() => scrollToSection("quiz_section_card")} 
        onExploreCatalog={() => scrollToSection("tex_gallery_section")} 
      />

      {/* 3. Luxury Bento Showcase of Hero Placements (معرض القطع الأرستقراطية الرائدة) */}
      <section id="showroom_bento" className="py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#FCFCF9] to-[#FAF8F3] border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="flex justify-between items-end flex-row-reverse border-b border-[#E7E2D8] pb-6">
            <div className="text-right">
              <span className="text-[#D97706] font-serif text-sm">صفوة روائع المعروض</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mt-1">القطع المصنفة بريادة الأناقة</h2>
            </div>
            <button
              onClick={() => scrollToSection("tex_gallery_section")}
              className="text-xs text-[#B45309] font-sans hover:underline flex items-center gap-1 flex-row-reverse"
            >
              <span>رؤية الكتالوج المعمم كاملاً</span>
            </button>
          </div>

          {/* Spotlight items showing Bento layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Main spotlight (Left/Right wide depending on items quantity) */}
            {heroFabrics.slice(0, 3).map((item, index) => {
              const gridClass = index === 0 ? "md:col-span-6" : "md:col-span-3";
              return (
                <div
                  id={`bento_item_${item.id}`}
                  key={item.id}
                  onClick={() => handleSelectFabric(item.id)}
                  className={`bg-white group overflow-hidden border border-[#E7E2D8] rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between text-right relative ${gridClass}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      referrerPolicy="no-referrer"
                      src={item.unsplashUrl} 
                      alt={item.nameAr} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Floating Info */}
                    <div className="absolute bottom-4 right-4 text-white left-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#D97706]">{item.categoryAr}</span>
                      <h4 className="text-lg font-serif font-semibold mt-0.5">{item.nameAr}</h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.descriptionAr}
                    </p>
                    <div className="flex justify-between items-center flex-row-reverse text-[11px] border-t border-stone-100 pt-3">
                      <span className="text-[#B45309] font-serif font-semibold">{item.pricePerMeterAr} / للمتر</span>
                      <span className="text-stone-400 font-sans">المنشأ: {item.originAr}</span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* 4. Elegant Stylist & Matchmaker Quiz Section (منسق الأناقة التفاعلي) */}
      <section className="py-10 px-6 bg-[#FCFCF9] border-b border-[#E7E2D8]">
        <MatchmakerQuiz fabrics={fabrics} onSelectFabric={handleSelectFabric} />
      </section>

      {/* 5. Main filterable Gallery (رواق الاستعراض الكامل والمنسوجات) */}
      <Gallery fabrics={fabrics} onSelectFabric={handleSelectFabric} />

      {/* 6. High-end Client Testimonials Panel (آراء عينة العملاء) */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-stone-900 text-white border-t border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-[#D97706] text-xs font-mono uppercase tracking-widest">TEX ELITE CLIENTELE REFRACTION</span>
            <h2 className="text-3xl font-serif">شرفات من الثقة الملوكية والخياطة الراقية</h2>
            <div className="w-12 h-[1px] bg-[#D97706] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
            <blockquote className="p-6 bg-stone-800/40 rounded border border-stone-800 space-y-4">
              <p className="text-xs leading-relaxed text-stone-300 font-sans">
                "قماشة الحرير الإيطالي الملكي من تكس حولت فستان زفاف ابنتي إلى ملحمة فنية تعبق بالتاريخ. طريقة تماهي النسيج مع أثرياء الإضاءة تحت ثريات الكريستال كانت تفوق خيالات المصممين أنفسهم. دقة متناهية وفخامة تليق بالبيوت الملكية."
              </p>
              <div className="flex justify-end items-center gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-stone-700 font-serif font-bold flex items-center justify-center text-xs text-[#D97706]">س</div>
                <div>
                  <cite className="not-italic text-xs font-semibold block text-[#FCFCF9]">صاحبة السمو الشيخة سارة آل سعود</cite>
                  <span className="text-[10px] text-stone-500 block">فندق الفورسيزنز الرياض</span>
                </div>
              </div>
            </blockquote>

            <blockquote className="p-6 bg-stone-800/40 rounded border border-stone-800 space-y-4">
              <p className="text-xs leading-relaxed text-stone-300 font-sans">
                "إن تفصيل معطف صوف الكشمير العذري الذي اقترحه عليّ منسق تكس التفاعلي كان الخيار الأوقر لرحلتي الشتوية إلى جنيف. نسيج دافئ خفيف برونق مخملي يبعث على الشموخ والهيبة في الندوات العامة."
              </p>
              <div className="flex justify-end items-center gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-stone-700 font-serif font-bold flex items-center justify-center text-xs text-[#D97706]">م</div>
                <div>
                  <cite className="not-italic text-xs font-semibold block text-[#FCFCF9]">معالي السفير محمد الخالدي</cite>
                  <span className="text-[10px] text-stone-500 block">أعمال الهوت كوتور الرجالي بلكسمبورغ</span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 7. Footer (التذييل الملوكي للدار) */}
      <footer className="bg-[#1C1917] p-12 text-white border-t border-[#D97706]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-right flex-row-reverse pb-10 border-b border-stone-850">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 justify-end flex-row-reverse">
              <Crown className="w-5 h-5 text-[#D97706]" />
              <h4 className="text-base font-serif font-bold text-white">تكس للأقمشة الفاخرة | TEX</h4>
            </div>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              منذ عام 1978 ونحن نعيش ونمتهن صياغة وإعداد أنبل الأنسجة الطبيعية المستدامة للمناسبات الراقية ومصممي الهوت كوتور في العالم العربي والغربي مع مراعاة أعلى معايير الجودة والإتقان الصائغ النسيجي.
            </p>
            <div className="flex gap-4 justify-end pt-1">
              <a href="https://unsplash.com" target="_blank" className="text-stone-500 hover:text-stone-300 text-[10px] font-mono">IMAGES: UNSPLASH</a>
              <a href="https://google.com" target="_blank" className="text-stone-500 hover:text-stone-300 text-[10px] font-mono">ADVISOR: GEMINI</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <h5 className="text-white font-serif font-bold text-xs text-[#D97706]">الصالونات الإقليمية للدار</h5>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li>ميلانو: المربع الذهبي (Quadralatero della Moda)</li>
              <li>باريس: الشانزلزيه (Rue du Faubourg Saint-Honoré)</li>
              <li>الرياض: برج الفيصلية، صالون الحجز الخاص</li>
              <li>دبي: أرجاء الكوتور بهليوبوليس</li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 font-sans text-xs">
            <h5 className="text-white font-serif font-semibold text-xs text-[#D97706]">الضمان والأصالة المطلقة</h5>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              تلتزم الدار بتوفير شهادة المنشأ وشهادات التصنيع العضوي الطبيعي 100% مختومة برمز صائغي فلاندرز وكومو مع كل قطعة يتم حياكتها وتسليمها لصالونكم الخاص مجاناً.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 flex-row-reverse">
          <p>© 2026 تكس للأقمشة الفاخرة. جميع الحقوق الفنية مرعية للهوت كوتور بالخليج العربي.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span className="bg-stone-800 border border-stone-700/60 text-stone-400 py-1 px-2.5 rounded font-mono uppercase">
              PLATFORM STATUS: LUXURY ACTIVE
            </span>
          </div>
        </div>
      </footer>

      {/* 8. Interactive Light Refraction Simulator Modal Popup */}
      <AnimatePresence>
        {activeSelectedFabric && (
          <FabricDetailModal 
            fabric={activeSelectedFabric} 
            onClose={() => setSelectedFabricId(null)} 
          />
        )}
      </AnimatePresence>

      {/* 10. Admin Backoffice CRUD drawer popup (Feature D) */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDrawer
            fabrics={fabrics}
            onSave={handleSaveFabrics}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
