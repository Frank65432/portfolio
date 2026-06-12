import { useState } from "react";
import { Sparkles, ShoppingBag, Plus, Minus, Check, ArrowRight, BookOpen, Trash2, Tag, AlertCircle, X, Sliders, Cpu, Wand2 } from "lucide-react";
import { CLOTHING_CATALOG } from "../data";
import { ClothingItem } from "../types";

export default function ClothingBrandSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<{ item: ClothingItem; size: string; quantity: number }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({}); // { item_id: selected_size }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutInvoice, setCheckoutInvoice] = useState<string | null>(null);

  // Custom Apparel Design Studio state values
  const [activeStudioSection, setActiveStudioSection] = useState<"catalog" | "workshop">("catalog");
  const [customItemType, setCustomItemType] = useState<"tee" | "hoodie">("tee");
  const [customCodeText, setCustomCodeText] = useState("import { Future } from \"marvin-clo\"");
  const [customGrafColor, setCustomGrafColor] = useState<"emerald" | "warning" | "white" | "purple">("emerald");
  const [customMeshPattern, setCustomMeshPattern] = useState<"matrix" | "brutalist" | "circuit">("matrix");
  const [customSize, setCustomSize] = useState("M");
  const [customNotification, setCustomNotification] = useState<string | null>(null);

  const categories = ["All", "Hoodies", "Tees", "Accessories"];

  const filteredItems = CLOTHING_CATALOG.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  const handleSelectSize = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleMintCustomGarment = () => {
    const price = customItemType === "tee" ? 55.00 : 95.00;
    const imageUrl = customItemType === "tee" 
      ? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80" 
      : "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80";

    const customId = `custom-${customItemType}-${Date.now()}`;
    const customItem: ClothingItem = {
      id: customId,
      name: `MARVIN_LAB // SPECIAL_${customItemType.toUpperCase()}`,
      price: price,
      category: customItemType === "tee" ? "Tees" : "Hoodies",
      description: `Bespoke compiled ${customItemType}. Typography layout: "${customCodeText}". Print color: ${customGrafColor}. Structural Mesh: ${customMeshPattern}.`,
      imageUrl: imageUrl,
      sizes: [customSize],
      inStock: true
    };

    setCart((prev) => {
      // Since custom items are unique, append as a distinct entry
      return [...prev, { item: customItem, size: customSize, quantity: 1 }];
    });

    setCustomNotification(`CUSTOM PRODUCT COMPILED: Added 1x "${customItem.name}" to bag.`);
    setIsCartOpen(true);
    setCheckoutInvoice(null);
    setTimeout(() => {
      setCustomNotification(null);
    }, 4000);
  };

  const handleAddToCart = (item: ClothingItem) => {
    const size = selectedSizes[item.id] || item.sizes[0];
    
    setCart((prev) => {
      const existingIdx = prev.findIndex((entry) => entry.item.id === item.id && entry.size === size);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { item, size, quantity: 1 }];
      }
    });

    // Provide immediate feedback - open cart panel
    setIsCartOpen(true);
    setCheckoutInvoice(null);
  };

  const handleUpdateQuantity = (idx: number, delta: number) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[idx].quantity += delta;
      if (copy[idx].quantity <= 0) {
        copy.splice(idx, 1);
      }
      return copy;
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, entry) => total + entry.item.price * entry.quantity, 0);
  };

  const handleCheckoutSimulate = () => {
    const invoiceId = `MARVIN-CLO-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toISOString().split('T')[0];
    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.08;
    const total = subtotal + vat + 12.00; // $12 flat courier

    let invoiceText = `/**
 * @license
 * STREETWEAR ARCHIVE INVOICE SPECIFICATION
 * BATCH GENERATED: ${dateStr}
 * SYSTEM TARGET: LOCAL_EMULATION
 */

const ORDER_SPECIFICATION = {
  invoiceId: "${invoiceId}",
  compilerVersion: "VITE_STREET_v4.1",
  courierService: "FAST_ROUTE_LOGISTICS",
  billingCurrency: "USD",
  
  purchasedManifest: [
`;

    cart.forEach(entry => {
      invoiceText += `    {
      sku: "SKU-${entry.item.id}-${entry.size}",
      name: "${entry.item.name}",
      size: "${entry.size}",
      qty: ${entry.quantity},
      unitPrice: ${entry.item.price.toFixed(2)},
    },\n`;
    });

    invoiceText += `  ],

  accountingMetrics: {
    subtotal: ${subtotal.toFixed(2)},
    salesTaxES: ${vat.toFixed(2)},
    flatRateCourier: 12.00,
    totalDeduction: ${total.toFixed(2)}
  },

  instructionRemarks: "Thank you for supporting sustainable technical streetwear. Frank Marvin Team."
};

console.log("TRANSACTION_SECURE_VERIFIED");`;

    setCheckoutInvoice(invoiceText);
  };

  return (
    <div className="space-y-12 animate-fade-in relative text-[#F1F5F9]">
      
      {/* Brand Overview Block */}
      <div className="bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl"></div>
        
        <div className="flex items-center justify-between border-b border-emerald-950/50 pb-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-[#10B981]" />
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white animate-pulse">
              03_ APPAREL STUDIO
            </h2>
          </div>
          
          {/* Stark Bag button trigger */}
          <button
            id="cart-trigger-btn"
            onClick={() => {
              setIsCartOpen(!isCartOpen);
              setCheckoutInvoice(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/40 border border-[#10B981]/30 hover:bg-emerald-950/60 rounded-full text-xs font-mono font-bold uppercase cursor-pointer transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4 text-[#10B981]" />
            <span>BAG</span>
            <span className="w-5 h-5 bg-[#10B981] text-[#050807] text-[10px] flex items-center justify-center font-bold rounded-full">
              {cart.reduce((total, entry) => total + entry.quantity, 0)}
            </span>
          </button>
        </div>
        
        <p className="text-sm text-[#94A3B8] leading-relaxed max-w-3xl font-normal">
          <strong className="font-semibold text-white">MARVIN CLO</strong> is an experimental architectural cut-and-sew streetwear laboratory. We merge heavyweight combed loops (GSM 450+) with computer programming layout logic, technical sleeve typography, and double-lined canvas structures.
        </p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase bg-[#050807] border border-emerald-950/60 text-emerald-400 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Heavy combed combed organic lupo
          </span>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase bg-[#050807] border border-emerald-950/60 text-emerald-400 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Matte puff technical ink graphics
          </span>
        </div>

        {/* Clear blocky CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <button
            id="brand-store-cta"
            onClick={() => window.open("https://github.com", "_blank")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#22C55E] hover:to-[#059669] text-[#050807] font-bold text-xs uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:scale-105"
          >
            <span>ENTER_OFFICIAL_STORE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            id="brand-lookbook-cta"
            onClick={() => {
              const lookbookEl = document.getElementById("lookbook-catalogue-heading");
              if (lookbookEl) {
                lookbookEl.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-950/20 text-[#10B981] border border-emerald-900/40 hover:bg-emerald-950/40 text-xs font-mono font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300"
          >
            Explore Lookbook Volume 04
          </button>
        </div>
      </div>

      {/* Studio Segment Switcher Tabs */}
      <div className="flex border-b border-emerald-950/45 pb-1">
        <button
          onClick={() => {
            setActiveStudioSection("catalog");
            setCheckoutInvoice(null);
          }}
          className={`flex-1 py-3 text-center text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeStudioSection === "catalog"
              ? "border-[#10B981] text-[#10B981] bg-[#10B981]/5 font-black shadow-[inset_0_-8px_10px_rgba(16,185,129,0.03)]"
              : "border-transparent text-neutral-400 hover:text-[#10B981] hover:bg-neutral-900/10"
          }`}
        >
          [ 03A_ READY-TO-WEAR COLLECTIONS ]
        </button>
        <button
          onClick={() => {
            setActiveStudioSection("workshop");
            setCheckoutInvoice(null);
          }}
          className={`flex-1 py-3 text-center text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeStudioSection === "workshop"
              ? "border-[#10B981] text-[#10B981] bg-[#10B981]/5 font-black shadow-[inset_0_-8px_10px_rgba(16,185,129,0.03)]"
              : "border-transparent text-neutral-400 hover:text-[#10B981] hover:bg-neutral-900/10"
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 animate-pulse text-[#10B981]" />
            [ 03B_ STREETWEAR DESIGN LABORATORY ]
          </span>
        </button>
      </div>

      {activeStudioSection === "catalog" ? (
        /* Catalog Drop section */
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span id="lookbook-catalogue-heading" className="text-[10px] uppercase tracking-widest font-mono text-[#10B981] font-semibold">// CATALOG DISCHARGE</span>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2 mt-1">
                Active Apparel Drops & Garments
              </h3>
            </div>

            {/* Elegant Theme Category bar selectors */}
            <div className="flex flex-wrap gap-1 p-1 bg-[#050807] border border-emerald-950/60 rounded-xl">
              {categories.map((cat) => (
                <button
                  id={`clothing-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#10B981] text-[#050807] font-bold shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                      : "text-neutral-400 hover:text-white bg-transparent"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Product display stark grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredItems.map((item) => {
              const currentSelectedSize = selectedSizes[item.id] || item.sizes[0];
              return (
                <div
                  id={`clothing-card-${item.id}`}
                  key={item.id}
                  className={`group bg-[#0A100C]/70 border border-emerald-950/60 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#10B981]/30 transition-all duration-300 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)] ${
                    !item.inStock ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  {/* Visual Image container with structured border bottom */}
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-950 border-b border-emerald-950/50">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    
                    {/* Floating Blocky Price tag */}
                    <span className="absolute top-0 right-0 bg-[#050807]/90 text-white font-mono text-xs font-bold px-3 py-1.5 border-l border-b border-emerald-950/60 rounded-bl-xl shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                      ${item.price.toFixed(2)}
                    </span>

                    {!item.inStock && (
                      <div className="absolute inset-0 bg-neutral-950/80 flex items-center justify-center p-4 z-10">
                        <span className="bg-[#050807] text-[#10B981] font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-2 border border-emerald-500/30 flex items-center gap-1.5 rounded shadow-lg">
                          <AlertCircle className="w-4 h-4 text-emerald-400" />
                          SOLD_OUT_ARCHIVE
                        </span>
                      </div>
                    )}

                    <span className="absolute bottom-3 left-3 bg-[#050807]/90 text-emerald-400 border border-emerald-950/80 text-[8px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {item.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Sizing indicators & info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-[#10B981] transition-colors leading-normal uppercase">
                         {item.name}
                      </h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {item.inStock ? (
                      <div className="space-y-4 pt-3 border-t border-emerald-950/20">
                        {/* Sizing display */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono font-semibold text-neutral-500 block uppercase">CHOOSE SELECTOR SIZE</span>
                          <div className="flex gap-2">
                            {item.sizes.map((sz) => (
                              <button
                                id={`size-btn-${item.id}-${sz.toLowerCase()}`}
                                key={sz}
                                onClick={() => handleSelectSize(item.id, sz)}
                                className={`w-9 h-9 text-[11px] font-mono font-bold cursor-pointer transition-all border rounded-lg flex items-center justify-center ${
                                  currentSelectedSize === sz
                                    ? "bg-[#10B981] border-transparent text-[#050807]"
                                    : "bg-emerald-950/20 border-emerald-900/30 text-neutral-300 hover:text-white hover:border-emerald-500/30"
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Add Button */}
                        <button
                          id={`add-bag-btn-${item.id}`}
                          onClick={() => handleAddToCart(item)}
                          className="w-full py-2.5 bg-[#10B981] text-[#050807] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer rounded-xl transition-all hover:bg-emerald-400"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Bag (Size {currentSelectedSize})
                        </button>
                      </div>
                    ) : (
                      <button
                        id={`archived-btn-${item.id}`}
                        disabled
                        className="w-full py-2.5 bg-neutral-900/40 border border-neutral-800 text-neutral-500 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1 cursor-not-allowed rounded-xl"
                      >
                        Archived Drop
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Bespoke Custom Design Workshop */
        <div className="space-y-6 animate-fade-in">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#10B981] font-semibold">// PHYSICAL PROGRAM_MINTING</span>
            <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2 mt-1">
              Custom Print Laboratory & Compiler
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Control Panel: 5 span */}
            <div className="lg:col-span-5 bg-[#0A100C]/75 border border-emerald-950/60 rounded-2xl p-6 space-y-6 backdrop-blur-md shadow-[0_12px_25px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="border-b border-emerald-950/50 pb-3">
                <span className="text-[9px] font-mono font-bold text-[#10B981] uppercase">// COMPILATION TUNERS</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-tight mt-0.5">Physical Parameters</h4>
              </div>

              {customNotification && (
                <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 text-[#10B981] text-[11px] font-mono rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{customNotification}</span>
                </div>
              )}

              {/* Param 1: Base Type */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">01_ CORE_BASE_GARMENT_TYPE</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomItemType("tee");
                      setCheckoutInvoice(null);
                    }}
                    className={`flex-1 py-3 px-4 border rounded-xl font-mono text-center text-xs font-bold transition-all cursor-pointer ${
                      customItemType === "tee"
                        ? "bg-[#10B981] border-transparent text-[#050807] shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "bg-[#050807] border-emerald-950 hover:border-emerald-500/35 text-white"
                    }`}
                  >
                    Oversized Tee ($55.00)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomItemType("hoodie");
                      setCheckoutInvoice(null);
                    }}
                    className={`flex-1 py-3 px-4 border rounded-xl font-mono text-center text-xs font-bold transition-all cursor-pointer ${
                      customItemType === "hoodie"
                        ? "bg-[#10B981] border-transparent text-[#050807] shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "bg-[#050807] border-emerald-950 hover:border-emerald-500/35 text-white"
                    }`}
                  >
                    Heavy Hoodie ($95.00)
                  </button>
                </div>
              </div>

              {/* Param 2: Code Graphics */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">02_ CHEST_PRINT_CODE_LABEL</label>
                <input
                  type="text"
                  maxLength={48}
                  value={customCodeText}
                  onChange={(e) => {
                    setCustomCodeText(e.target.value);
                    setCheckoutInvoice(null);
                  }}
                  className="w-full p-3.5 bg-[#050807] border border-emerald-950 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-emerald-500/40"
                  placeholder="const print = 'fluid_grid';"
                />
                <span className="text-[8px] font-mono text-neutral-500 float-right uppercase">{customCodeText.length} / 48 Chars Max</span>
              </div>

              {/* Param 3: Color Preset */}
              <div className="space-y-2 pt-2">
                <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">03_ COLOR_INK_PREPARATION</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["emerald", "warning", "white", "purple"] as const).map((color) => {
                    const colorButtonMap = {
                      emerald: "border-[#10B981] text-[#10B981] bg-[#10B981]/5",
                      warning: "border-[#F97316] text-[#F97316] bg-[#F97316]/5",
                      white: "border-[#F8FAFC] text-slate-200 bg-slate-200/5",
                      purple: "border-[#A855F7] text-[#A855F7] bg-[#A855F7]/5"
                    };
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setCustomGrafColor(color);
                          setCheckoutInvoice(null);
                        }}
                        className={`py-2 text-[10px] font-mono font-bold uppercase border rounded-lg transition-all cursor-pointer ${
                          customGrafColor === color
                            ? colorButtonMap[color] + " ring-1 ring-offset-1 ring-offset-[#0A100C] ring-current"
                            : "bg-[#050807] border-emerald-950 text-neutral-500 hover:text-white"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Param 4: Backing Matrix Patch */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">04_ UNDERLAY_STRUCTURAL_MATRIX</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["matrix", "brutalist", "circuit"] as const).map((mesh) => (
                    <button
                      key={mesh}
                      type="button"
                      onClick={() => {
                        setCustomMeshPattern(mesh);
                        setCheckoutInvoice(null);
                      }}
                      className={`py-2.5 text-[10px] font-mono font-bold uppercase border rounded-lg transition-all cursor-pointer ${
                        customMeshPattern === mesh
                          ? "bg-emerald-950/40 text-[#10B981] border-[#10B981] shadow-sm"
                          : "bg-[#050807] border-emerald-950 text-neutral-500 hover:text-white"
                      }`}
                    >
                      {mesh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Param 5: Sizes option */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">05_ BESPOKE_PHYSICAL_SIZE</label>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setCustomSize(sz);
                        setCheckoutInvoice(null);
                      }}
                      className={`w-10 h-10 text-xs font-mono font-bold cursor-pointer transition-all border rounded-xl flex items-center justify-center ${
                        customSize === sz
                          ? "bg-[#10B981] border-transparent text-[#050807] shadow-sm"
                          : "bg-[#050807] border-emerald-950 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Compiling Submit Core button */}
              <div className="pt-4 border-t border-emerald-950/45">
                <button
                  type="button"
                  onClick={handleMintCustomGarment}
                  className="w-full py-4 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#22C55E] hover:to-[#059669] text-[#050807] font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:scale-[1.01]"
                >
                  <Plus className="w-4.5 h-4.5" />
                  COMPILE & ADD BESPOKE GARMENT
                </button>
              </div>
            </div>

            {/* Right Interactive Live SVG Visualizer: 7 span */}
            <div className="lg:col-span-7 bg-[#0A100C]/75 border border-emerald-950/60 rounded-2xl p-6 flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden bg-dot-matrix min-h-[480px] shadow-[0_12px_25px_rgba(0,0,0,0.6)]">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[9px] font-mono text-emerald-500/50 select-none uppercase font-bold">
                <Cpu className="w-3.5 h-3.5 text-emerald-500/40 animate-spin" />
                <span>REAL-TIME_SVG_MATRIX_RENDER // SEED_OK_0x5F</span>
              </div>

              <div className="w-full relative py-2 flex items-center justify-center">
                {/* SVG Live garment representation */}
                <svg viewBox="0 0 300 320" className="w-full h-80 max-w-xs drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Colors lookup dictionary definition */}
                  {(() => {
                    const renderColors = {
                      emerald: { hex: "#10B981" },
                      warning: { hex: "#F97316" },
                      white: { hex: "#F8FAFC" },
                      purple: { hex: "#A855F7" }
                    };
                    const colorHex = renderColors[customGrafColor].hex;

                    return (
                      <>
                        {customItemType === "tee" ? (
                          <>
                            {/* T-Shirt base outline */}
                            <path d="M70 30 C120 40 180 40 230 30 L280 65 L250 115 L220 100 L220 280 L80 280 L80 100 L50 115 L20 65 Z" fill="#030704" stroke={colorHex} strokeWidth="1" strokeOpacity="0.08" />
                            <path d="M70 30 C120 41 180 41 230 30 L276 63 L248 110 L218 96 L216 280 L84 280 L82 96 L52 110 L24 63 Z" fill="#050B07" stroke={colorHex} strokeWidth="1.5" strokeOpacity="0.22" />
                            <path d="M110 33 C130 50 170 50 190 33 C170 38 130 38 110 33 Z" fill="#0C1510" stroke={colorHex} strokeWidth="1" strokeOpacity="0.3" />
                            <path d="M84 274 L216 274" stroke={colorHex} strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.15" />
                          </>
                        ) : (
                          <>
                            {/* Hoodie base outline */}
                            <path d="M70 55 C110 50 190 50 230 55 L280 85 L250 135 L220 120 L220 280 L80 280 L80 120 L50 135 L20 85 Z" fill="#030704" stroke={colorHex} strokeWidth="1" strokeOpacity="0.08" />
                            <path d="M70 55 C110 52 190 52 230 55 L276 83 L248 130 L218 116 L216 280 L84 280 L82 116 L52 130 L24 83 Z" fill="#050B07" stroke={colorHex} strokeWidth="1.5" strokeOpacity="0.22" />
                            <path d="M110 56 L150 90 L190 56 C170 80 130 80 110 56 Z" fill="#080E0A" stroke={colorHex} strokeWidth="1" strokeOpacity="0.3" />
                            <path d="M100 210 L200 210 L190 270 L110 270 Z" fill="#070C08" stroke={colorHex} strokeWidth="1" strokeOpacity="0.15" />
                          </>
                        )}

                        {/* Chest Printed bounding coordinates box panel */}
                        <g transform={customItemType === "tee" ? "translate(100, 95)" : "translate(100, 112)"}>
                          <rect x="0" y="0" width="100" height="85" fill="#000000" fillOpacity="0.5" rx="4" stroke={colorHex} strokeWidth="0.8" strokeDasharray="3,3" strokeOpacity="0.18" />
                          
                          {/* Pattern backdrops matrices */}
                          {customMeshPattern === "matrix" && (
                            <g opacity="0.5">
                              <line x1="10" y1="10" x2="90" y2="10" stroke={colorHex} strokeWidth="0.5" strokeDasharray="1,3" />
                              <line x1="10" y1="28" x2="90" y2="28" stroke={colorHex} strokeWidth="0.5" strokeDasharray="1,3" />
                              <line x1="10" y1="46" x2="90" y2="46" stroke={colorHex} strokeWidth="0.5" strokeDasharray="1,3" />
                              <line x1="10" y1="64" x2="90" y2="64" stroke={colorHex} strokeWidth="0.5" strokeDasharray="1,3" />
                              <circle cx="20" cy="38" r="1.5" fill={colorHex} />
                              <circle cx="80" cy="46" r="1.5" fill={colorHex} />
                              <text x="6" y="78" fill={colorHex} fontSize="4" fontFamily="monospace" opacity="0.35">SYSTEM: SECURE_VITE</text>
                            </g>
                          )}

                          {customMeshPattern === "brutalist" && (
                            <g opacity="0.4">
                              <rect x="8" y="8" width="5" height="69" fill={colorHex} rx="0.5" />
                              <rect x="87" y="8" width="5" height="69" fill={colorHex} rx="0.5" />
                              <line x1="18" y1="12" x2="82" y2="12" stroke={colorHex} strokeWidth="1.2" />
                              <line x1="18" y1="73" x2="82" y2="73" stroke={colorHex} strokeWidth="1.2" />
                            </g>
                          )}

                          {customMeshPattern === "circuit" && (
                            <g opacity="0.45">
                              <path d="M15 15 L35 15 L45 25 L45 60 L55 70 L85 70" stroke={colorHex} strokeWidth="0.8" fill="none"/>
                              <circle cx="15" cy="15" r="2" fill={colorHex} />
                              <circle cx="85" cy="70" r="2" fill={colorHex} />
                              <path d="M85 15 L65 15 L55 25 L55 45 L40 55" stroke={colorHex} strokeWidth="0.8" fill="none" strokeDasharray="2,1"/>
                              <circle cx="85" cy="15" r="1.5" fill={colorHex} />
                            </g>
                          )}

                          {/* Code typographic text print elements on chest */}
                          <g transform="translate(50, 42)">
                            <text
                              x="0"
                              y="-4"
                              fill={colorHex}
                              textAnchor="middle"
                              fontFamily="monospace"
                              fontSize="5.2"
                              fontWeight="bold"
                              letterSpacing="0.05em"
                              className="uppercase animate-pulse"
                            >
                              {customCodeText.substring(0, 18) || "NULL"}
                            </text>
                            {customCodeText.length > 18 && (
                              <text
                                x="0"
                                y="4"
                                fill={colorHex}
                                textAnchor="middle"
                                fontFamily="monospace"
                                fontSize="5.2"
                                fontWeight="bold"
                                letterSpacing="0.05em"
                                className="uppercase"
                              >
                                {customCodeText.substring(18, 36)}
                              </text>
                            )}
                            {customCodeText.length > 36 && (
                              <text
                                x="0"
                                y="12"
                                fill={colorHex}
                                textAnchor="middle"
                                fontFamily="monospace"
                                fontSize="5.2"
                                fontWeight="bold"
                                letterSpacing="0.05em"
                                opacity="0.8"
                                className="uppercase"
                              >
                                {customCodeText.substring(36, 48)}
                              </text>
                            )}
                          </g>
                        </g>
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Dynamic physical properties checklist label */}
              <div className="w-full bg-[#050807]/95 p-4 border border-emerald-950/45 rounded-xl font-mono text-[9px] text-[#94A3B8] space-y-1 mt-4">
                <span className="text-neutral-500 block font-bold uppercase tracking-wider">// SPEC_SHEET_MINTED_CRITERIA</span>
                <div className="grid grid-cols-2 gap-y-2 pt-1 border-t border-emerald-950/30">
                  <div>SKU: <strong className="text-white">SKU-CUSTOM-{customItemType.toUpperCase()}-{customSize}</strong></div>
                  <div>WEIGHT_CLASS: <strong className="text-white">450 GSM COMPACT LOOPS</strong></div>
                  <div>INK_FORM: <strong className="text-[#10B981]">{customGrafColor.toUpperCase()} PUFF TINT</strong></div>
                  <div>UNDERLAY: <strong className="text-white">{customMeshPattern.toUpperCase()} FRAME</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modernist Retail slideout Drawer */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0A100C] border-l border-emerald-900/40 shadow-2xl p-6 z-50 flex flex-col justify-between animate-slide-in">
          <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-1">
            <div className="flex items-center justify-between border-b border-emerald-950/50 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-display font-black text-base uppercase text-white">Bag Items</h3>
              </div>
              <button
                id="close-cart-btn"
                onClick={() => setIsCartOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 flex items-center justify-center text-white transition-colors cursor-pointer text-xs"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Shopping Item list */}
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((entry, idx) => (
                  <div
                    id={`cart-entry-${entry.item.id}-${entry.size}`}
                    key={`${entry.item.id}-${entry.size}`}
                    className="flex items-start gap-4 p-3.5 bg-emerald-950/10 border border-emerald-950/65 rounded-xl justify-between"
                  >
                    <img
                      src={entry.item.imageUrl}
                      alt={entry.item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 border border-emerald-950/60 object-cover bg-neutral-900 rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-white uppercase truncate leading-none">{entry.item.name}</h5>
                      <span className="text-[9px] font-mono font-bold text-emerald-400/80 block mt-1 uppercase">SIZE: {entry.size}</span>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          id={`qty-minus-${idx}`}
                          onClick={() => handleUpdateQuantity(idx, -1)}
                          className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white px-1">{entry.quantity}</span>
                        <button
                          id={`qty-plus-${idx}`}
                          onClick={() => handleUpdateQuantity(idx, 1)}
                          className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between h-auto self-stretch pl-1">
                      <span className="font-mono text-xs font-extrabold text-[#10B981]">
                        ${(entry.item.price * entry.quantity).toFixed(2)}
                      </span>
                      <button
                        id={`delete-cart-item-${idx}`}
                        className="text-neutral-500 hover:text-rose-450 transition cursor-pointer mt-auto flex justify-end"
                        onClick={() => handleUpdateQuantity(idx, -entry.quantity)}
                      >
                        <Trash2 className="w-4 h-4 text-neutral-500 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-[#050807] p-4 border border-emerald-950/60 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between font-mono text-neutral-500 text-[10px] uppercase font-bold">
                    <span>Atelier Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-neutral-500 text-[10px] uppercase font-bold">
                    <span>COURIER CARRIER</span>
                    <span>$12.00</span>
                  </div>
                  <div className="flex justify-between font-mono text-white font-black border-t border-emerald-950/60 pt-2 text-xs uppercase">
                    <span>ESTIMATED SUM</span>
                    <span className="text-[#10B981] font-bold">${(calculateSubtotal() + 12).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-neutral-500 text-xs font-mono">
                [ BAG_IS_CURRENTLY_EMPTY ]
              </div>
            )}

            {/* Generated Invoice Code output */}
            {checkoutInvoice && (
              <div className="space-y-2 animate-fade-in pt-3 border-t border-emerald-950/55">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">Invoiced Specification Code</span>
                <pre className="p-3 bg-[#050807] text-[#10B981] border border-emerald-950/60 rounded-xl font-mono text-[9px] overflow-x-auto leading-relaxed h-52 custom-scrollbar select-text selection:bg-[#10B981]/15">
                  {checkoutInvoice}
                </pre>
                <div className="flex items-center gap-1.5 p-2 bg-emerald-950/35 border border-emerald-900/50 text-emerald-400 text-[9px] font-mono font-bold uppercase rounded">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Invoice spec compiled OK (Local emulation)</span>
                </div>
              </div>
            )}
          </div>

          {/* Checkout panel activations */}
          {cart.length > 0 && (
            <div className="border-t border-emerald-950/50 pt-4 space-y-3 bg-[#0A100C]">
              {!checkoutInvoice ? (
                <button
                  id="checkout-trigger-btn"
                  onClick={handleCheckoutSimulate}
                  className="w-full py-3.5 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#22C55E] hover:to-[#059669] text-[#050807] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Compile Invoice spec
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="reset-checkout-btn"
                  onClick={() => {
                    setCart([]);
                    setCheckoutInvoice(null);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3.5 bg-emerald-950 text-[#10B981] border border-[#10B981]/40 hover:bg-[#10B981] hover:text-[#050807] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Confirm drop order specs
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
