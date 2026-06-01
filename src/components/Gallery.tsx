/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FabricItem } from "../types";
import { MapPin, Search, Compass, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryProps {
  fabrics: FabricItem[];
  onSelectFabric: (id: string) => void;
}

export default function Gallery({ fabrics, onSelectFabric }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract dynamic categories from active fabrics list
  const categories = ["All", ...Array.from(new Set(fabrics.map((f) => f.categoryAr)))];

  // Perform filtering
  const filteredFabrics = fabrics.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.categoryAr === selectedCategory;
    const matchesSearch = 
      item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originEn.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="tex_gallery_section" className="py-16 px-6 sm:px-12 lg:px-24 bg-[#FCFCF9]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title and Intro */}
        <div className="text-center space-y-4">
          <span className="text-[#D97706] tracking-wider text-xs uppercase font-mono font-bold block">EXPERIENCE MUSEUM-GRADE COUTURE</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] font-bold">رواق المنسوجات الملوكية والتقليدية</h2>
          <div className="w-16 h-[2px] bg-[#D97706] mx-auto my-3"></div>
          <p className="text-sm text-[#78716C] max-w-2xl mx-auto font-sans leading-relaxed">
            انتقِ التصنيفات أو ابحث بمسردك لتحديد القماشة الساحرة. ينسدل كل نسيج بأسلوب مميز تحت محاكاة الضوء الطبيعي لبيان سحر الغزل اليدوي بدقة فائقة.
          </p>
        </div>

        {/* Filters and search block - RTL aligned properly */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-5 border border-[#E7E2D8] rounded-xl shadow-sm flex-row-reverse" id="gallery_filters_container">
          
          {/* Search Input right side */}
          <div className="relative w-full md:w-80">
            <input
              id="gallery_search_input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بقماشة، أو منشأ، أو تكوين غزل..."
              className="w-full bg-[#FCFCF9] border border-stone-200 focus:border-[#D97706] outline-none p-2.5 rounded text-xs text-right pr-9 text-stone-900 font-sans shadow-sm"
            />
            <Search className="w-4 h-4 text-stone-400 absolute top-3.5 right-3" />
          </div>

          {/* Catgeory pills left side */}
          <div className="flex gap-2 overflow-x-auto md:flex-wrap justify-start md:justify-center py-2 w-full md:w-auto scrollbar-thin select-none overflow-y-hidden max-w-full">
            {categories.map((cat) => (
              <button
                id={`cat_pill_${cat}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-4 rounded text-xs font-sans transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#1C1917] text-white font-medium border border-[#1C1917]"
                    : "bg-stone-50 text-stone-600 hover:text-stone-950 border border-stone-200"
                }`}
              >
                {cat === "All" ? "عرض الجميع" : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Fabrics Grid Section with micro animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="fabrics_grid">
          <AnimatePresence mode="popLayout">
            {filteredFabrics.map((item) => {
              const isHero = item.placement === "Hero";
              const isShowcase = item.placement === "Showcase";
              
              return (
                <motion.div
                  id={`fabric_card_${item.id}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onSelectFabric(item.id)}
                  className={`bg-white rounded-lg border overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between text-right relative ${
                    isHero 
                      ? "border-[#D97706]/60 ring-2 ring-[#D97706]/10" 
                      : isShowcase 
                        ? "border-stone-800/40" 
                        : "border-stone-200"
                  }`}
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-3/2 overflow-hidden bg-stone-900 border-b border-stone-100">
                    <img
                      referrerPolicy="no-referrer"
                      src={item.unsplashUrl}
                      alt={item.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Highly premium badges absolute on image */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      {isHero ? (
                        <span className="bg-[#D97706] text-white font-serif font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded shadow-md">
                          رواد الدار (Hero Reco)
                        </span>
                      ) : isShowcase ? (
                        <span className="bg-stone-900 text-[#FCFCF9] border border-stone-700 font-serif font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded shadow-md">
                          حقيبة الشوكيس (Showcase)
                        </span>
                      ) : null}
                    </div>

                    {/* Origin Badge overlay */}
                    <div className="absolute bottom-3 right-3 bg-[#FCFCF9]/95 backdrop-blur-sm border border-stone-200 py-1.5 px-3 rounded flex items-center gap-1.5 flex-row-reverse text-stone-800 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                      <span className="text-[10px] font-sans font-medium">{item.originAr}</span>
                    </div>
                  </div>

                  {/* Details Card body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center flex-row-reverse text-[10px] font-mono text-stone-500">
                        <span className="text-[#B45309] font-sans font-semibold">{item.categoryAr}</span>
                        <span>#{item.id}</span>
                      </div>
                      
                      <h3 className="text-xl font-serif text-[#1C1917] font-bold group-hover:text-[#B45309] transition-colors">
                        {item.nameAr}
                      </h3>
                      
                      <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-sans">
                        {item.descriptionAr}
                      </p>
                    </div>

                    {/* Bottom metrics section */}
                    <div className="border-t border-stone-100 pt-4 flex justify-between items-center flex-row-reverse">
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block font-sans">سعر تفصيل المتر</span>
                        <span className="text-lg font-serif font-semibold text-[#1C1917] block">{item.pricePerMeterAr}</span>
                      </div>
                      <div className="text-xs text-stone-500 flex items-center justify-center gap-1 hover:text-[#B45309] transition-colors font-sans">
                        <span>تفاصيل النسيج واللمعان</span>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty search outcome wrapper */}
          {filteredFabrics.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-3 p-8 border border-dashed border-[#E7E2D8] rounded-xl flex flex-col items-center text-stone-500">
              <Compass className="w-10 h-10 text-stone-300 animate-spin" />
              <h4 className="font-serif font-bold text-stone-700 text-base">لم نجد نسيجاً يطابق خياركم</h4>
              <p className="text-xs font-sans max-w-xs mx-auto text-stone-400">تفضل بتعديل الكلمات المدخلة أو استشر منسق الأزياء الذكي بالأسفل مجاناً لصياغة فكرتك بدقة متناهية.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-2 text-xs text-[#B45309] underline font-sans font-medium"
              >
                مسح مرشحات البحث
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
