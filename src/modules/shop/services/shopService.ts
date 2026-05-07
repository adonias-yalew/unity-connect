import type { ShopItem } from "../types";

export const mockShop: ShopItem[] = [
  { id: "1", title: "Hand-bound Prayer Journal", description: "Linen cover, 200 acid-free pages.", price: "$28", vendor: "Cedar & Ink", phone: "+1 555 0142", telegram: "@cedarink", emoji: "📓" },
  { id: "2", title: "Olive Wood Prayer Beads", description: "Hand-carved from Bethlehem olive wood.", price: "$45", vendor: "Holy Land Crafts", phone: "+972 555 0199", telegram: "@hlcrafts", emoji: "📿" },
  { id: "3", title: "Calligraphy Print — Bismillah", description: "Archival giclée, signed.", price: "$60", vendor: "Nur Studio", phone: "+44 555 0177", telegram: "@nurstudio", emoji: "🖼️" },
  { id: "4", title: "Beeswax Vigil Candles (12)", description: "Pure beeswax, slow-burning.", price: "$22", vendor: "Athos Light", phone: "+30 555 0123", telegram: "@athoslight", emoji: "🕯️" },
];

export const shopService = { list: () => mockShop };
