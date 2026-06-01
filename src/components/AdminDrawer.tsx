/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FabricItem, FabricPlacement } from "../types";
import { Lock, X, Plus, Trash2, Edit3, Save, ShieldAlert, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface AdminDrawerProps {
  fabrics: FabricItem[];
  onSave: (fabrics: FabricItem[]) => void;
  onClose: () => void;
}

export default function AdminDrawer({ fabrics, onSave, onClose }: AdminDrawerProps) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [editingItem, setEditingItem] = useState<FabricItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Form Fields
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [pricePerMeterAr, setPricePerMeterAr] = useState("");
  const [pricePerMeterEn, setPricePerMeterEn] = useState("");
  const [unsplashUrl, setUnsplashUrl] = useState("");
  const [originAr, setOriginAr] = useState("");
  const [originEn, setOriginEn] = useState("");
  const [weightGsm, setWeightGsm] = useState<number>(100);
  const [compositionAr, setCompositionAr] = useState("");
  const [compositionEn, setCompositionEn] = useState("");
  const [placement, setPlacement] = useState<FabricPlacement>("General");
  const [lustreRatingAr, setLustreRatingAr] = useState("");
  const [drapeAr, setDrapeAr] = useState("");

  const [cloudName, setCloudName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cloudinary_cloud_name") || "";
    }
    return "";
  });
  const [uploadPreset, setUploadPreset] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cloudinary_upload_preset") || "";
    }
    return "";
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleCloudinaryUpload = async (file: File) => {
    if (!cloudName || !uploadPreset) {
      setUploadError("الرجاء إدخال اسم سحابة كلاوديناري ومفتاح الرفع المسبق (Upload Preset)");
      return;
    }
    setIsUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء الرفع؛ يُرجى مراجعة البيانات المدخلة والمحاولة مجددًا");
      }

      const data = await res.json();
      if (data.secure_url) {
        setUnsplashUrl(data.secure_url);
        // Save preferences
        localStorage.setItem("cloudinary_cloud_name", cloudName);
        localStorage.setItem("cloudinary_upload_preset", uploadPreset);
      } else {
        throw new Error("لم نجد رابط الصورة الآمن في استجابة كلاوديناري");
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "فشل رفع الصورة إلى كلاوديناري");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "TEX100") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("رمز الخزنة غير صحيح المرجو مراجعة كونسيرج تكس");
    }
  };

  const startEdit = (item: FabricItem) => {
    setEditingItem(item);
    setIsAddMode(false);

    setNameAr(item.nameAr);
    setNameEn(item.nameEn);
    setCategoryAr(item.categoryAr);
    setCategoryEn(item.categoryEn);
    setDescriptionAr(item.descriptionAr);
    setDescriptionEn(item.descriptionEn);
    setPricePerMeterAr(item.pricePerMeterAr);
    setPricePerMeterEn(item.pricePerMeterEn);
    setUnsplashUrl(item.unsplashUrl);
    setOriginAr(item.originAr);
    setOriginEn(item.originEn);
    setWeightGsm(item.weightGsm);
    setCompositionAr(item.compositionAr);
    setCompositionEn(item.compositionEn);
    setPlacement(item.placement);
    setLustreRatingAr(item.lustreRatingAr || "");
    setDrapeAr(item.drapeAr || "");
  };

  const startAdd = () => {
    setEditingItem(null);
    setIsAddMode(true);

    setNameAr("");
    setNameEn("");
    setCategoryAr("");
    setCategoryEn("");
    setDescriptionAr("");
    setDescriptionEn("");
    setPricePerMeterAr("");
    setPricePerMeterEn("");
    setUnsplashUrl("https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=1200");
    setOriginAr("");
    setOriginEn("");
    setWeightGsm(150);
    setCompositionAr("");
    setCompositionEn("");
    setPlacement("General");
    setLustreRatingAr("");
    setDrapeAr("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا النسيج الملكي من الكتالوج؟")) {
      const updated = fabrics.filter((f) => f.id !== id);
      onSave(updated);
      setEditingItem(null);
      setIsAddMode(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameAr || !descriptionAr || !pricePerMeterAr) {
      alert("المرجو ملء الحقول الإلزامية باللغة العربية الملوكية");
      return;
    }

    const newItem: FabricItem = {
      id: isAddMode ? Date.now().toString() : editingItem!.id,
      nameAr,
      nameEn: nameEn || "Bespoke Couture Craft",
      categoryAr: categoryAr || "أخرى سادة",
      categoryEn: categoryEn || "Other Bespoke",
      descriptionAr,
      descriptionEn: descriptionEn || "Unmatched luxurious properties with elite craftsmanship.",
      pricePerMeterAr,
      pricePerMeterEn: pricePerMeterEn || "$100 USD",
      unsplashUrl,
      originAr: originAr || "كومو، إيطاليا",
      originEn: originEn || "Como, Italy",
      weightGsm: Number(weightGsm) || 200,
      compositionAr: compositionAr || "ألياف طبيعية 100%",
      compositionEn: compositionEn || "100% Organic Fibers",
      placement,
      lustreRatingAr: lustreRatingAr || "بريق ملوكي هادئ",
      drapeAr: drapeAr || "انسياب كامل وقور",
    };

    let updatedList: FabricItem[] = [];
    if (isAddMode) {
      updatedList = [...fabrics, newItem];
    } else {
      updatedList = fabrics.map((f) => (f.id === editingItem!.id ? newItem : f));
    }

    onSave(updatedList);
    setEditingItem(null);
    setIsAddMode(false);
  };

  return (
    <div id="admin_drawer_container" className="fixed inset-0 z-50 overflow-hidden text-right">
      {/* Drawer absolute overlay */}
      <div 
        className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-screen max-w-full sm:max-w-2xl bg-[#FCFCF9] border-l border-[#E7E2D8] flex flex-col shadow-2xl relative"
        >
          {/* Top header of drawer with gold strip */}
          <div className="bg-[#1C1917] p-5 text-white border-b-2 border-[#D97706]/70 flex justify-between items-center flex-row-reverse">
            <div className="flex items-center gap-2.5 flex-row-reverse">
              <span className="bg-[#D97706]/20 p-2 rounded-full border border-[#D97706]/40 text-[#D97706]">
                <Lock className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-serif font-semibold text-[#FCFCF9]">خزنة الإدارة والتحكم الفني</h3>
                <p className="text-[10px] text-stone-400 font-sans mt-0.5">صيانة كتالوج المنسوجات في الوقت المباشر</p>
              </div>
            </div>
            <button 
              id="admin_drawer_close_trigger"
              onClick={onClose} 
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Authentic Passcode form if not authenticated */}
          {!isAuthenticated ? (
            <div className="flex-1 p-8 flex flex-col justify-center items-center space-y-6 max-w-md mx-auto">
              <ShieldAlert className="w-12 h-12 text-[#D97706] animate-pulse" />
              <div className="text-center space-y-2">
                <h4 className="text-xl font-serif text-stone-900 font-medium">المرور مصرح به للمنسق المعتمد فقط</h4>
                <p className="text-xs text-stone-500 font-sans">أدخل رمز المرور السري المخصص للوصول إلى تفاصيل صائغي الدار (رمز الدليل: <code className="bg-stone-100 px-1 py-0.5 font-mono">TEX100</code>)</p>
              </div>

              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                <input
                  id="admin_passcode_input"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="أدخل رمز الخزنة الملوكي..."
                  className="w-full text-center bg-stone-50 border border-stone-200 outline-none p-3 text-sm text-stone-900 focus:border-[#D97706] rounded font-sans"
                />
                {authError && (
                  <p className="text-red-600 text-xs text-center font-sans">{authError}</p>
                )}
                <button
                  id="admin_auth_submit_btn"
                  type="submit"
                  className="w-full py-3 bg-[#1C1917] hover:bg-[#D97706] text-[#FCFCF9] text-xs font-sans font-medium rounded transition-colors shadow-sm"
                >
                  تأكيد تصريح الدخول والفتح
                </button>
              </form>
            </div>
          ) : (
            // Full Database CRUD controls when authorized
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 bg-stone-100 flex justify-between items-center flex-row-reverse border-b border-stone-200">
                <span className="text-xs text-stone-600 font-sans">قائمة المنسوجات النشطة بالخزنة ({fabrics.length})</span>
                <button
                  id="admin_start_add_btn"
                  onClick={startAdd}
                  className="px-3.5 py-1.5 bg-stone-900 text-[#FCFCF9] hover:bg-[#D97706] rounded text-xs flex items-center justify-center gap-1 font-sans"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة نسيج كوتور جديد</span>
                </button>
              </div>

              {/* Central split list + workspaces forms */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Side Scroll Box of items */}
                <div className={`w-full md:w-1/3 border-l border-stone-200 bg-stone-50 overflow-y-auto p-2 space-y-2 ${editingItem || isAddMode ? "hidden md:block" : "block"}`}>
                  {fabrics.map((item) => (
                    <button
                      id={`edit_selector_${item.id}`}
                      key={item.id}
                      onClick={() => startEdit(item)}
                      className={`w-full text-right p-3 rounded border text-xs transition-all duration-200 flex flex-col gap-1.5 ${editingItem?.id === item.id ? "bg-[#FAF6EC] border-[#D97706] text-[#B45309]" : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"}`}
                    >
                      <span className="font-serif font-semibold truncate block w-full">{item.nameAr}</span>
                      <div className="flex justify-between items-center w-full flex-row-reverse text-[9px] text-stone-500">
                        <span>{item.originAr}</span>
                        <span className="bg-stone-100 px-1.5 text-stone-500 rounded">{item.placement}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right Side Editing/Adding Worksheet Form */}
                <div className={`w-full md:w-2/3 overflow-y-auto p-4 sm:p-6 bg-[#FCFCF9] ${editingItem || isAddMode ? "block" : "hidden md:block"}`}>
                  {editingItem || isAddMode ? (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      {/* Back button for mobile viewports */}
                      <div className="md:hidden flex mb-2">
                        <button
                          type="button"
                          onClick={() => { setEditingItem(null); setIsAddMode(false); }}
                          className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 rounded text-xs ml-auto transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span>الرجوع لقائمة المنسوجات</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center border-b border-[#E7E2D8] pb-2 flex-row-reverse">
                        <h4 className="font-serif font-bold text-stone-800 text-sm">
                          {isAddMode ? "تسجيل نسيج ملكي جديد بالدار" : `تحديث بيانات: ${editingItem?.nameAr}`}
                        </h4>
                        {(editingItem) && (
                          <button
                            type="button"
                            onClick={() => handleDelete(editingItem.id)}
                            className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 text-[11px] font-sans"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف نسيج</span>
                          </button>
                        )}
                      </div>

                      {/* Input fields block */}
                      <div className="space-y-3 font-sans text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-500 mb-1">الاسم بالإنجليزية (مهم)</label>
                            <input
                              type="text"
                              value={nameEn}
                              onChange={(e) => setNameEn(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1 font-semibold">الاسم بالعربية *</label>
                            <input
                              type="text"
                              value={nameAr}
                              onChange={(e) => setNameAr(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-500 mb-1">التصنيف بالإنجليزية</label>
                            <input
                              type="text"
                              value={categoryEn}
                              onChange={(e) => setCategoryEn(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">التصنيف بالعربية</label>
                            <input
                              type="text"
                              value={categoryAr}
                              onChange={(e) => setCategoryAr(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                        </div>

                        <div className="bg-stone-50 p-4 border border-stone-200 rounded space-y-3">
                          <label className="block text-stone-700 mb-1 font-semibold">بوابة رفع الصور عبر كلاوديناري (Cloudinary)</label>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block text-stone-500 mb-1">بريسيت الرفع (Upload Preset)</label>
                              <input
                                type="text"
                                value={uploadPreset}
                                onChange={(e) => {
                                  setUploadPreset(e.target.value);
                                  localStorage.setItem("cloudinary_upload_preset", e.target.value);
                                }}
                                placeholder="مثال: my_unsigned_preset"
                                className="w-full bg-white border p-1.5 rounded outline-none text-right"
                              />
                            </div>
                            <div>
                              <label className="block text-stone-500 mb-1">اسم السحابة (Cloud Name)</label>
                              <input
                                type="text"
                                value={cloudName}
                                onChange={(e) => {
                                  setCloudName(e.target.value);
                                  localStorage.setItem("cloudinary_cloud_name", e.target.value);
                                }}
                                placeholder="اسم سحابة كلاوديناري..."
                                className="w-full bg-white border p-1.5 rounded outline-none text-right"
                              />
                            </div>
                          </div>

                          <div className="pt-1.5 border-t border-stone-100">
                            <label className="block text-xs text-stone-600 mb-1">اختر ملف صورة لرفعه فورًا:</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleCloudinaryUpload(file);
                                }
                              }}
                              disabled={isUploading}
                              className="w-full text-xs text-stone-600 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-stone-900 file:text-white hover:file:bg-[#D97706] cursor-pointer"
                            />
                            {isUploading && (
                              <p className="text-[#D97706] text-[10px] mt-1">جاري رفع الصورة إلى كلاوديناري وسيرفر العرض الآن... الرجاء الانتظار</p>
                            )}
                            {uploadError && (
                              <p className="text-red-600 text-[10px] mt-1">{uploadError}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 mb-1">الربط البصري (كود الصورة Unsplash أو رابط Cloudinary) *</label>
                          <input
                            type="text"
                            value={unsplashUrl}
                            onChange={(e) => setUnsplashUrl(e.target.value)}
                            className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-700 font-mono"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-500 mb-1">سعر المتر بالدولار/العملة البديلة</label>
                            <input
                              type="text"
                              value={pricePerMeterEn}
                              onChange={(e) => setPricePerMeterEn(e.target.value)}
                              placeholder="مثال: 300 EGP"
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1 font-semibold">سعر المتر بالعربية *</label>
                            <input
                              type="text"
                              value={pricePerMeterAr}
                              onChange={(e) => setPricePerMeterAr(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                              placeholder="مثال: 9,500 ج.م"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-stone-600 mb-1">المنشأ الأصلي بالعربية</label>
                            <input
                              type="text"
                              value={originAr}
                              onChange={(e) => setOriginAr(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">وزن غيار النسيج (GSM)</label>
                            <input
                              type="number"
                              value={weightGsm}
                              onChange={(e) => setWeightGsm(Number(e.target.value))}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">موضع الظهور بالرواق</label>
                            <select
                              value={placement}
                              onChange={(e) => setPlacement(e.target.value as FabricPlacement)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-[#D97706] font-semibold"
                            >
                              <option value="Hero">رئيسي الهيرو (Hero)</option>
                              <option value="Showcase">معرض الشوكيس (Showcase)</option>
                              <option value="General">المعرض المعمم (General)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-600 mb-1">مستوى تموج القماش (Drape)</label>
                            <input
                              type="text"
                              value={drapeAr}
                              onChange={(e) => setDrapeAr(e.target.value)}
                              placeholder="مثال: ناعم كالموج، صلب هيكلي"
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">بريق وانعكاس الخيوط</label>
                            <input
                              type="text"
                              value={lustreRatingAr}
                              onChange={(e) => setLustreRatingAr(e.target.value)}
                              placeholder="مثال: لمعان ذهبي متلألئ"
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-500 mb-1">التركيبة النسيجية بالإنجليزية</label>
                            <input
                              type="text"
                              value={compositionEn}
                              onChange={(e) => setCompositionEn(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-700"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">التركيبة بالكامل بالعربية</label>
                            <input
                              type="text"
                              value={compositionAr}
                              onChange={(e) => setCompositionAr(e.target.value)}
                              className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 mb-1">الوصف الفني الكامل بالعربية *</label>
                          <textarea
                            value={descriptionAr}
                            onChange={(e) => setDescriptionAr(e.target.value)}
                            rows={3}
                            className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-800"
                            required
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-stone-500 mb-1">الوصف الفني الكامل بالإنجليزية</label>
                          <textarea
                            value={descriptionEn}
                            onChange={(e) => setDescriptionEn(e.target.value)}
                            rows={2}
                            className="w-full bg-stone-50 border p-2 rounded outline-none text-right focus:border-[#D97706] text-stone-700"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Actions */}
                      <div className="border-t border-stone-100 pt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => { setEditingItem(null); setIsAddMode(false); }}
                          className="px-4 py-2 border border-stone-300 text-stone-500 hover:bg-stone-50 rounded"
                        >
                          إلغاء التعديل
                        </button>
                        <button
                          id="admin_save_form_btn"
                          type="submit"
                          className="px-6 py-2.5 bg-[#FAF6EC] border border-[#D97706] text-[#B45309] hover:bg-[#D97706] hover:text-white transition-colors rounded flex items-center justify-center gap-1 font-semibold"
                        >
                          <Save className="w-4 h-4" />
                          <span>حفظ التعديلات في الخزنة</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Idle placeholder
                    <div className="h-full flex flex-col justify-center items-center text-center p-8 space-y-4 text-stone-400">
                      <Lock className="w-10 h-10 text-stone-300" />
                      <div className="space-y-1">
                        <h5 className="font-serif font-semibold text-stone-700 text-base">منسق الدار المعتمد</h5>
                        <p className="text-xs max-w-xs mx-auto text-stone-500">الرجاء اختيار أحد المنسوجات من القائمة الجانبية لتعديل خصائصه ومحاكاته، أو قم بإضافة قطعة هوت كوتور جديدة إلى خزنة العرض.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
