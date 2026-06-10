import { useState } from "react";
import { Sparkles, ShoppingBag, Plus, Minus, Check, ArrowRight, BookOpen, Trash2, Tag, AlertCircle, X } from "lucide-react";
import { CLOTHING_CATALOG } from "../data";
import { ClothingItem } from "../types";

export default function ClothingBrandSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<{ item: ClothingItem; size: string; quantity: number }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({}); // { item_id: selected_size }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutInvoice, setCheckoutInvoice] = useState<string | null>(null);

  const categories = ["All", "Hoodies", "Tees", "Accessories"];

  const filteredItems = CLOTHING_CATALOG.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  const handleSelectSize = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
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

      {/* Catalog Drop section */}
      <div className="space-y-8">
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
