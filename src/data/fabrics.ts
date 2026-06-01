/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FabricItem } from "../types";

export const DEFAULT_FABRICS: FabricItem[] = [
  {
    id: "1",
    nameAr: "الحرير الإيطالي الملكي",
    nameEn: "Royal Italian Silk",
    categoryAr: "الحرير الفاخر",
    categoryEn: "Royal Silk",
    descriptionAr: "حرير طبيعي 100% مستوحى من فخامة البلاط الإيطالي القديم. يمتاز بنعومة مفرطة وانسدال ملوكي يعكس بريق الضوء بتدرجات ساحرة.",
    descriptionEn: "100% raw premium silk imported from Como, Italy. Features a lightweight, fluid drape that commands attention with an exquisite satin finish.",
    pricePerMeterAr: "9,500 ج.م",
    pricePerMeterEn: "9,500 EGP",
    unsplashUrl: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=1200",
    originAr: "كومو، إيطاليا",
    originEn: "Como, Italy",
    weightGsm: 85,
    compositionAr: "حرير طبيعي عضوي 100%",
    compositionEn: "100% Pure Organic Silk",
    placement: "Hero",
    lustreRatingAr: "بريق ملوكي متدرج اللمعان",
    drapeAr: "انسياب كامل، ناعم كالموج",
  },
  {
    id: "2",
    nameAr: "المخمل الفرنسي الفاخر",
    nameEn: "Imperial French Velvet",
    categoryAr: "القطيفة والمخمل",
    categoryEn: "Imperial Velvet",
    descriptionAr: "مخمل ملكي مصنوع من ألياف الحرير والقطن الفاخر، يتميز بكثافة وبره وعمقه البصري الفريد الذي يمتص الضوء ويعيد نشره بروعة.",
    descriptionEn: "A high-pile premium velvet woven with fine silk and combed cotton, offering unparalleled visual depth under evening chandeliers.",
    pricePerMeterAr: "11,800 ج.م",
    pricePerMeterEn: "11,800 EGP",
    unsplashUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1200",
    originAr: "ليون، فرنسا",
    originEn: "Lyon, France",
    weightGsm: 320,
    compositionAr: "حرير 60%، قطن طويل التيلة 40%",
    compositionEn: "60% Silk, 40% Premium Long-staple Cotton",
    placement: "Showcase",
    lustreRatingAr: "بريق عميق مخملي خافض للضوء",
    drapeAr: "قوام مهيب متماسك وثقيل مناسب للهياكل الراقية",
  },
  {
    id: "3",
    nameAr: "دانتيل الشابيرون السويسري",
    nameEn: "Swiss Chaperon Lace",
    categoryAr: "الدانتيل المطرز",
    categoryEn: "Exquisite Lace",
    descriptionAr: "دانتيل يدوي مخرم بدقة سويسرية فائقة، محبوك بخيوط ذهبية ناصعة ومزين بزخارف نباتية ملكية تضفي لمسة رقي خالدة في السهرات والمناسبات.",
    descriptionEn: "Master-crafted Swiss lace with relief floral embroidery and fine metallic thread accents, designed for elite wedding receptions and high society.",
    pricePerMeterAr: "15,500 ج.م",
    pricePerMeterEn: "15,500 EGP",
    unsplashUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200",
    originAr: "سانت غالن، سويسرا",
    originEn: "St. Gallen, Switzerland",
    weightGsm: 110,
    compositionAr: "قطيفة الأورجانزا بخيوط حريرية ولمست سلكية ذهبية",
    compositionEn: "Silk organza thread work with 18k gold metallic core thread",
    placement: "Showcase",
    lustreRatingAr: "وهج متلألئ مع تداخل الظلال الراقية",
    drapeAr: "شبه صلب، يحتفظ بالتموجات الفخمة بدقة متناهية",
  },
  {
    id: "4",
    nameAr: "صوف الكشمير العذري",
    nameEn: "Virgin Cashmere Wool",
    categoryAr: "الصوف والوبر الملكي",
    categoryEn: "Royal Wool",
    descriptionAr: "كشمير نقي فائق النعومة، مستخلص من الطبقات الأكثر نعومة لأندر ماعز الكشمير. دفء ملوكي مذهل وخفة لا تضاهى لتصميم معاطف الشتاء الفاخرة.",
    descriptionEn: "The finest underfleece collected from rare cashmere goats, providing majestic warmth and cloud-like softness for custom tailored coats.",
    pricePerMeterAr: "19,000 ج.م",
    pricePerMeterEn: "19,000 EGP",
    unsplashUrl: "https://images.unsplash.com/photo-1520638029751-341d51666e54?auto=format&fit=crop&q=80&w=1200",
    originAr: "ولاية جامو وكشمير",
    originEn: "Kashmir Region",
    weightGsm: 450,
    compositionAr: "شعر صوف كشمير عذري 100%",
    compositionEn: "100% Unregulated Pure Virgin Cashmere",
    placement: "Hero",
    lustreRatingAr: "لمعان مطفأ طبيعي ناعم ومخملي الملمس",
    drapeAr: "انسدال وارف ومريح يعبّر عن الدفء الوقور",
  },
  {
    id: "5",
    nameAr: "البروكار الدمشقي المذهب",
    nameEn: "Gilded Damascene Brocade",
    categoryAr: "البلاط الملكي التراثي",
    categoryEn: "Gilded Brocade",
    descriptionAr: "أقمشة تراثية محكوكة يدوياً على نول جاكار أصيل متوارث عبر الأجيال، بخيوط الحرير الخالص الموشى بالذهب والفضة ليعبّر عن حكايا الشرق الراقية.",
    descriptionEn: "A traditional damask jacquard pattern hand-loomed with raw silk yarns and high-grade gold metallic strings, carrying centuries of aristocratic heritage.",
    pricePerMeterAr: "23,000 ج.م",
    pricePerMeterEn: "23,000 EGP",
    unsplashUrl: "https://images.unsplash.com/photo-1502239608882-93b729c6af43?auto=format&fit=crop&q=80&w=1200",
    originAr: "دمشق، سوريا التراثية",
    originEn: "Damascus, Syria",
    weightGsm: 260,
    compositionAr: "حرير طبيعي 80%، خيوط ذهبية وفضية ناعمة 20%",
    compositionEn: "80% Organic Raw Silk, 20% Soft Gold Metallic Fibers",
    placement: "General",
    lustreRatingAr: "بريق ذهبي ميتاليك صارخ وفخم للغاية",
    drapeAr: "قوام متين، يقاوم التجعيد ويبرز تضاريس الثياب الهيكلية",
  },
  {
    id: "6",
    nameAr: "الكتان الإمبراطوري البلجيكي",
    nameEn: "Imperial Belgian Linen",
    categoryAr: "الكتان الصيفي المريح",
    categoryEn: "Imperial Linen",
    descriptionAr: "أنقى ألياف الكتان الصيفي المنتقى من المزارع البلجيكية الكلاسيكية. برودة طبيعية استثنائية للبشرة، ومظهر كاجوال فاخر يناسب الطقس الدافئ.",
    descriptionEn: "Highly valued, naturally cooled premium Belgian flax linen. Perfect heat dispersion with a structured organic drape that breathes flawlessly.",
    pricePerMeterAr: "6,200 ج.م",
    pricePerMeterEn: "6,200 EGP",
    unsplashUrl: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=1200",
    originAr: "فلاندرز، بلجيكا",
    originEn: "Flanders, Belgium",
    weightGsm: 180,
    compositionAr: "كتان عضوي رطب طبيعي 100%",
    compositionEn: "100% Pure Organic Linen",
    placement: "General",
    lustreRatingAr: "ألياف مطفأة شبه عاكسة بتعرجات ساحرة",
    drapeAr: "انسدال مريح وعريض، مثالي للتنسيقات الدافئة المريحة",
  }
];

const LOCAL_STORAGE_KEY = "tex_fabrics_v1";

export function loadFabrics(): FabricItem[] {
  if (typeof window === "undefined") return DEFAULT_FABRICS;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load fabrics from localStorage", e);
  }
  // Store default if none exists
  saveFabrics(DEFAULT_FABRICS);
  return DEFAULT_FABRICS;
}

export function saveFabrics(fabrics: FabricItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fabrics));
  } catch (e) {
    console.error("Failed to save fabrics to localStorage", e);
  }
}
