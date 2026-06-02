export type RestaurantVisual = "mediterranean" | "steakhouse" | "sandwich" | "shelby";

export type ExistingTemplateKind =
  | "pravah"
  | "glass"
  | "cinematic"
  | "editorial"
  | "corn"
  | "dark-3d"
  | "helios"
  | "ngpes"
  | "berco"
  | "boiler-cinematic"
  | "boiler-globe"
  | "boiler-drone";

export type RestaurantTemplateData = {
  id: string;
  name: string;
  shortName: string;
  // Generic naming for the template gallery sidebar (so prospects see the
  // *layout style*, not the original client). The site header still uses
  // `shortName` so the demo content reads naturally inside the preview.
  genericName?: string;
  genericLabel?: string;
  category: string;
  source: {
    spec: string;
    buildPlan: string;
  };
  theme: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textInverse: string;
    muted: string;
    accent: string;
    accent2: string;
    accent3: string;
    line: string;
  };
  typography: "fresh" | "steakhouse" | "cafe" | "editorial";
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryAction: string;
    secondaryAction: string;
    visual: RestaurantVisual;
    badges: string[];
  };
  quickActions: { label: string; detail: string }[];
  featured: {
    name: string;
    description: string;
    tag: string;
    price?: string;
  }[];
  menu: {
    name: string;
    items: string[];
  }[];
  spotlight: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  conversion: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
  location: {
    address: string;
    phone: string;
    email?: string;
    hours: string[];
  };
};

export type TemplateEntry =
  | {
      id: ExistingTemplateKind;
      name: string;
      label: string;
      category: string;
      summary: string;
      status: "Existing";
      spec?: string;
      buildPlan?: string;
      kind: ExistingTemplateKind;
    }
  | {
      id: string;
      name: string;
      label: string;
      category: string;
      summary: string;
      status: "New build";
      spec: string;
      buildPlan: string;
      kind: "restaurant";
      data: RestaurantTemplateData;
    };

export const restaurantTemplates: RestaurantTemplateData[] = [
  {
    id: "westside-grill",
    name: "Westside Grill",
    shortName: "Westside",
    genericName: "Modern Steakhouse",
    genericLabel: "Steakhouse",
    category: "Restaurant / Hospitality",
    source: {
      spec: "westside-grill-spec.md",
      buildPlan: "WESTSIDE-GRILL-BUILD-PLAN.md",
    },
    theme: {
      bg: "#150F0D",
      surface: "#F7F0E4",
      surfaceAlt: "#241814",
      text: "#1B120F",
      textInverse: "#FFF3E4",
      muted: "#76675A",
      accent: "#9B1F1F",
      accent2: "#C8A46A",
      accent3: "#3B241D",
      line: "rgba(27,18,15,.16)",
    },
    typography: "steakhouse",
    hero: {
      eyebrow: "Allentown steakhouse",
      title: "A modern steakhouse with a new age twist.",
      subtitle:
        "Rich dining-room energy, reservation-first conversion, recurring promotions, private dining leads, and deep menu browsing for steak, seafood, brunch, bar, and wine.",
      primaryAction: "Book A Table",
      secondaryAction: "Order Online",
      visual: "steakhouse",
      badges: ["Happy hour", "Sunday brunch", "Private dining", "Wine dinners"],
    },
    quickActions: [
      { label: "Book A Table", detail: "OpenTable handoff stays visible from hero to footer." },
      { label: "Promotions", detail: "Wine dinner, happy hour, brunch, and Prime Rib Sunday cards." },
      { label: "Private Dining", detail: "Inquiry path for events and the private room." },
      { label: "Menus", detail: "Lunch, dinner, dessert, bar, wine, and brunch sections." },
    ],
    featured: [
      {
        name: "Prime Rib Sunday",
        description: "Recurring Sunday special with schedule and editable pricing.",
        tag: "Promotion",
        price: "Sunday",
      },
      {
        name: "Wine Dinner Series",
        description: "Premium event card with a reservation CTA and limited-seat framing.",
        tag: "Event",
        price: "Reserve",
      },
      {
        name: "Sunday Brunch Buffet",
        description: "Omelette station, carving station, smoked salmon, shrimp, and desserts.",
        tag: "Brunch",
        price: "Buffet",
      },
    ],
    menu: [
      { name: "Steakhouse mains", items: ["Filet", "Ribeye", "Tenderloin tips", "Seafood plates"] },
      { name: "Lunch", items: ["Westside burger", "Lobster roll", "Ribeye French dip", "Salmon"] },
      { name: "Bar", items: ["Cocktails", "Wines by glass", "Bottle list", "Bar plates"] },
      { name: "Dessert", items: ["Cheesecake", "Creme brulee", "Carrot cake", "Brownie"] },
    ],
    spotlight: {
      eyebrow: "Promotions engine",
      title: "Specials are treated as first-class content.",
      body:
        "The template makes recurring offers easy to scan without cheapening the dining-room tone. Promo metadata sits outside menu data so teams can update schedule, price, and CTA independently.",
      points: ["Schedule badges", "Price chips", "Image-ready cards", "Reservation handoffs"],
    },
    conversion: {
      title: "Reserve the room, order the meal, or plan the private event.",
      body: "The conversion model balances premium reservations with online ordering and private dining without forcing one path on every visitor.",
      primary: "Book A Table",
      secondary: "Plan An Event",
    },
    location: {
      address: "621 Grange Rd, Allentown, PA 18106",
      phone: "(610) 508-4500",
      hours: ["Lunch and dinner service", "Sunday brunch buffet", "Bar and happy hour"],
    },
  },
  {
    id: "the-shelby",
    name: "The Shelby",
    shortName: "Shelby",
    genericName: "Editorial Neighborhood Restaurant",
    genericLabel: "Editorial Dining",
    category: "Restaurant / Hospitality",
    source: {
      spec: "the-shelby-spec.md",
      buildPlan: "THE-SHELBY-BUILD-PLAN.md",
    },
    theme: {
      bg: "#11100E",
      surface: "#F8F2E8",
      surfaceAlt: "#EFE4D3",
      text: "#191511",
      textInverse: "#FFF7EC",
      muted: "#6F6254",
      accent: "#B86F3C",
      accent2: "#46664C",
      accent3: "#D9B78F",
      line: "rgba(25,21,17,.14)",
    },
    typography: "editorial",
    hero: {
      eyebrow: "Seasonal American restaurant",
      title: "Welcome to The Shelby.",
      subtitle:
        "An editorial, photo-forward restaurant template with balanced Reserve, Order, View Menu, and Call paths for modern American dining in Allentown.",
      primaryAction: "Reserve Your Table",
      secondaryAction: "Order Online",
      visual: "shelby",
      badges: ["Resy", "Toast pickup", "Brunch", "Gallery"],
    },
    quickActions: [
      { label: "Reserve", detail: "Resy explanation card with phone fallback." },
      { label: "Order Pickup", detail: "Toast handoff, hours, and popular dish prompts." },
      { label: "View Menu", detail: "Lunch and dinner categories with a brunch switch." },
      { label: "Call", detail: "Tap-friendly local contact path for mobile guests." },
    ],
    featured: [
      {
        name: "Short Rib Hash",
        description: "Brunch-forward feature for weekend discovery and reservations.",
        tag: "Brunch",
      },
      {
        name: "Shelby Burger",
        description: "Curated menu highlight with order path nearby but not overused.",
        tag: "Popular",
      },
      {
        name: "Seasonal Mains",
        description: "Ingredient-forward mains like salmon, paella, ribeye, and curry.",
        tag: "Dinner",
      },
    ],
    menu: [
      { name: "Starters", items: ["Malanga chips", "Cheese curds", "Wings", "Mussels"] },
      { name: "Mains", items: ["Chicken parm", "Paella", "Salmon", "Short rib"] },
      { name: "Brunch", items: ["Benedict", "Chicken and waffle", "Pancakes", "Breakfast pizza"] },
      { name: "Dessert", items: ["Cheesecake", "Cookies", "Custard pie", "Ice cream"] },
    ],
    spotlight: {
      eyebrow: "Gallery-led conversion",
      title: "Food photography does the heavy lifting.",
      body:
        "The layout alternates warm ivory surfaces with espresso image bands, making room for large asymmetric crops, seasonal labels, brunch prompts, and hours/location content.",
      points: ["Large image masks", "Brunch module", "Quick action cards", "Hours and directions"],
    },
    conversion: {
      title: "Choose the dining path that matches the moment.",
      body: "A guest can reserve a table, order pickup, scan the menu, or call without hunting through the page.",
      primary: "Reserve Your Table",
      secondary: "View Menu",
    },
    location: {
      address: "707 North Krocks Road, Suite 104, Allentown, PA 18106",
      phone: "(610) 841-0808",
      hours: ["Lunch and dinner", "Weekend brunch", "Pickup ordering"],
    },
  },
  {
    id: "lazeez-grill",
    name: "Lazeez Fresh Mediterranean Grill",
    shortName: "Lazeez",
    genericName: "Fast-Casual / Mediterranean",
    genericLabel: "Fast Casual",
    category: "Restaurant / Hospitality",
    source: {
      spec: "lazeez-grill-spec.md",
      buildPlan: "LAZEEZ-GRILL-BUILD-PLAN.md",
    },
    theme: {
      bg: "#FFF8EC",
      surface: "#FFFFFF",
      surfaceAlt: "#F4E5C6",
      text: "#1C2418",
      textInverse: "#FFFDF7",
      muted: "#65705C",
      accent: "#2F7D32",
      accent2: "#C7422F",
      accent3: "#E0A722",
      line: "rgba(28,36,24,.14)",
    },
    typography: "fresh",
    hero: {
      eyebrow: "Fresh Mediterranean in Allentown",
      title: "Best Mediterranean food in Allentown, PA.",
      subtitle:
        "A colorful fast-casual template built around online ordering, popular dishes, scratch-made ingredients, catering, rewards, FAQ, and local SEO.",
      primaryAction: "Order Online",
      secondaryAction: "View Menu",
      visual: "mediterranean",
      badges: ["Shawarma", "Falafel", "Rewards", "Catering"],
    },
    quickActions: [
      { label: "Order Online", detail: "Primary path above the fold and repeated near menu sections." },
      { label: "Join Rewards", detail: "App/rewards module for points, deals, and faster reorders." },
      { label: "Catering", detail: "Office and event ordering with clear inquiry handoff." },
      { label: "Gift Cards", detail: "Simple gift-card route pattern for provider handoff." },
    ],
    featured: [
      {
        name: "Chicken Shawarma Rice Bowl",
        description: "Popular bowl with rice, garlic, fresh vegetables, and sauce options.",
        tag: "Popular",
      },
      {
        name: "Falafel Wrap",
        description: "Vegetarian-friendly wrap with tahini, pickles, and herbs.",
        tag: "Vegetarian",
      },
      {
        name: "Baklava and Arabic Coffee",
        description: "Dessert pairing that rounds out the quick-order path.",
        tag: "Sweet",
      },
    ],
    menu: [
      { name: "Popular", items: ["Chicken shawarma wrap", "Rice bowl", "Fry bowl", "Falafel"] },
      { name: "Bowls", items: ["Rice bowls", "Fry bowls", "Salad bowls", "Vegetarian bowl"] },
      { name: "Sides", items: ["Hummus", "Baba ghanouj", "Arnabeet", "Fries"] },
      { name: "Desserts and drinks", items: ["Baklava", "Namoora", "Ayran", "Arabic coffee"] },
    ],
    spotlight: {
      eyebrow: "Fresh and fast",
      title: "Popular dishes stay close to every order CTA.",
      body:
        "This template keeps the browsing path lightweight: colorful menu cards, dietary tags, rewards prompts, catering, and FAQ/location content that supports local searches.",
      points: ["Dietary tags", "Rewards card", "Catering CTA", "FAQ and hours"],
    },
    conversion: {
      title: "Fresh, scratch-made Mediterranean food with a fast ordering path.",
      body: "Menu browsing, online ordering, rewards, and catering are all visible before a visitor loses momentum.",
      primary: "Order Online",
      secondary: "Join Rewards",
    },
    location: {
      address: "4666 Broadway, Allentown, PA 18104",
      phone: "(610) 351-6897",
      email: "lazeezgrill@gmail.com",
      hours: ["Monday to Saturday", "Pickup and delivery", "Closed Sunday seed data"],
    },
  },
  {
    id: "stuffed-to-the-grills",
    name: "Stuffed to the Grills",
    shortName: "Stuffed",
    genericName: "Cafe / Catering",
    genericLabel: "Cafe",
    category: "Restaurant / Hospitality",
    source: {
      spec: "stuffed-to-the-grills-spec.md",
      buildPlan: "STUFFED-TO-THE-GRILLS-BUILD-PLAN.md",
    },
    theme: {
      bg: "#FFF7EA",
      surface: "#FFFFFF",
      surfaceAlt: "#F2E2C3",
      text: "#2A2018",
      textInverse: "#FFF9EF",
      muted: "#765F4A",
      accent: "#D6452F",
      accent2: "#4B7F38",
      accent3: "#F2B84B",
      line: "rgba(42,32,24,.15)",
    },
    typography: "cafe",
    hero: {
      eyebrow: "Sister-owned sandwich cafe",
      title: "A unique twist on a traditional sandwich shop.",
      subtitle:
        "A warm cafe and catering template for lunch decisions, Toast ordering, phone pickup, best sellers, sandwich styles, tray sizes, and a clear local contact path.",
      primaryAction: "Order Online",
      secondaryAction: "Request Catering",
      visual: "sandwich",
      badges: ["Toast", "Catering trays", "Homemade", "Phone pickup"],
    },
    quickActions: [
      { label: "Order Online", detail: "Toast handoff and pickup guidance remain easy to reach." },
      { label: "Call for Pickup", detail: "Phone number gets a large mobile-friendly treatment." },
      { label: "Catering", detail: "Tray sizes, servings, and inquiry details are foregrounded." },
      { label: "Cafe Menu", detail: "Small and large price support for sandwiches and trays." },
    ],
    featured: [
      {
        name: "Funky Cubano",
        description: "Best-seller card with a sticker label and quick order CTA.",
        tag: "Best Seller",
      },
      {
        name: "Sweet Chili Shrimp Po Boy",
        description: "Bold lunch feature that explains what makes the shop different.",
        tag: "Signature",
      },
      {
        name: "House-made Meatloaf",
        description: "Homemade comfort-food cue that supports the sisters' story.",
        tag: "Homemade",
      },
    ],
    menu: [
      { name: "Hot sandwiches", items: ["Italian melt", "Chicken Florentine", "Funky Cubano", "Meatloaf"] },
      { name: "Cold sandwiches", items: ["Italian hoagie", "BLT", "Caprese", "Roast beef"] },
      { name: "Appetizers", items: ["Irish nachos", "Brie bites", "Homemade chips", "Pierogis"] },
      { name: "Catering", items: ["Box lunches", "Sandwich trays", "Wrap trays", "Desserts"] },
    ],
    spotlight: {
      eyebrow: "Catering clarity",
      title: "Daily lunch and catering leads share the same system.",
      body:
        "The menu model supports small and large prices, sandwich style notes, tray servings, and category filters without making the daily ordering path feel heavy.",
      points: ["Small and large prices", "Tray serving ranges", "Sisters story", "Pickup callout"],
    },
    conversion: {
      title: "Homemade sandwiches today, catering trays for the next event.",
      body: "The page makes the daily order path obvious while giving catering enough structure to generate real leads.",
      primary: "Order Online",
      secondary: "Request Catering",
    },
    location: {
      address: "6750 Iroquios Trail, Allentown, PA 18104",
      phone: "484-274-6760",
      email: "stuffedtothegrills@gmail.com",
      hours: ["Pickup and curbside", "Take-home kits", "Catering inquiries"],
    },
  },
];

// Generic, pitch-ready template names. The shipping product is a gallery of
// reusable layouts, so each entry presents the *kind of business* it suits,
// not the original client. Specs/build-plans still live in /docs for reference.
export const templateEntries: TemplateEntry[] = [
  {
    id: "pravah",
    name: "AI Lab / Infrastructure",
    label: "AI Lab",
    category: "Deep tech",
    summary: "Config-driven landing page with live D3 data visualizations, alert cards, and a real world-map deployment view. Suits AI labs, infra products, and data tools.",
    status: "Existing",
    spec: "website-recreation-spec.md",
    buildPlan: "pravah-rebuild-plan.md",
    kind: "pravah",
  },
  {
    id: "glass",
    name: "Glass Community Program",
    label: "Glass",
    category: "Community / Program",
    summary: "Glassmorphism program landing page with stats, values, perks, and an application flow. Suits ambassador programs, fellowships, and cohort communities.",
    status: "Existing",
    kind: "glass",
  },
  {
    id: "cinematic",
    name: "Cinematic Photo Program",
    label: "Cinematic",
    category: "Community / Program",
    summary: "Photo-forward dark cinematic page with editorial event imagery and partner-program conversion. Suits creator collectives, events, and editorial brands.",
    status: "Existing",
    spec: "ambassador-concept-b-cinematic.md",
    kind: "cinematic",
  },
  {
    id: "editorial",
    name: "Editorial Manifesto",
    label: "Editorial",
    category: "Community / Program",
    summary: "Swiss-minimal editorial page with high-contrast type and a bold application block. Suits manifesto launches, magazines, and design-led programs.",
    status: "Existing",
    spec: "ambassador-concept-c-editorial.md",
    kind: "editorial",
  },
  {
    id: "corn",
    name: "Agriculture / Field Tech",
    label: "Field Tech",
    category: "Agriculture",
    summary: "Scroll-driven agricultural page with procedural scenes for growing, testing, and harvest. Suits ag-tech, biotech, and outdoor-equipment brands.",
    status: "Existing",
    kind: "corn",
  },
  {
    id: "dark-3d",
    name: "3D Intelligence Narrative",
    label: "Dark 3D",
    category: "Story-led product",
    summary: "Dark chrome WebGL narrative page with scroll-driven scenes. Suits launch trailers, story-led AI products, and concept reveals. Lite-mode by default for performance.",
    status: "Existing",
    kind: "dark-3d",
  },
  {
    id: "helios",
    name: "Particle System Landing",
    label: "Particle",
    category: "Story-led product",
    summary: "Full-screen WebGL particle landing page that morphs through galaxy, globe, terrain, and network-map states. Suits energy, data-network, and frontier-tech brands.",
    status: "Existing",
    kind: "helios",
  },
  {
    id: "ngpes",
    name: "Fintech / Payments SaaS",
    label: "Fintech",
    category: "Fintech / SaaS",
    summary: "Light-mode payments infrastructure site with mock product UIs and procedural scenes. Suits fintech, B2B SaaS, and developer-platform products.",
    status: "Existing",
    spec: "ngpes-spec.md",
    buildPlan: "NGPES-BUILD-PLAN.md",
    kind: "ngpes",
  },
  {
    id: "berco",
    name: "Holding Company / Portfolio",
    label: "Holding Co",
    category: "Agency / Holding",
    summary: "Dark holding-company site with bold-word headlines, scroll word-reveal, and procedural brand cards. Suits agencies, eCommerce holding companies, and portfolio sites.",
    status: "Existing",
    spec: "berco-spec.md",
    buildPlan: "BERCO-BUILD-PLAN.md",
    kind: "berco",
  },
  {
    id: "boiler-cinematic",
    name: "Cinematic Portfolio Scene",
    label: "Cinematic 3D",
    category: "Experimental / 3D",
    summary: "Full-screen R3F portfolio scene: a drifting particle nebula with clickable monoliths and a GSAP camera dolly into each project. Suits studios, creative portfolios, and launch reveals.",
    status: "Existing",
    kind: "boiler-cinematic",
  },
  {
    id: "boiler-globe",
    name: "Globe Hero + Scroll Train",
    label: "Globe / Train",
    category: "Experimental / 3D",
    summary: "Marketing landing with a custom-shader night-Earth globe hero and a scroll-linked SVG train that rides a spline down the page. Suits networks, logistics, and place-based communities.",
    status: "Existing",
    kind: "boiler-globe",
  },
  {
    id: "boiler-drone",
    name: "Drone Chase Scene",
    label: "Drone 3D",
    category: "Experimental / 3D",
    summary: "Cinematic R3F drone-chase flythrough with a moody nebula and head-on camera tracking. Suits hardware, robotics, and trailer-style product reveals.",
    status: "Existing",
    kind: "boiler-drone",
  },
  ...restaurantTemplates.map((data) => ({
    id: data.id,
    name: data.genericName ?? data.name,
    label: data.genericLabel ?? data.shortName,
    category: data.category,
    summary: data.hero.subtitle,
    status: "New build" as const,
    spec: data.source.spec,
    buildPlan: data.source.buildPlan,
    kind: "restaurant" as const,
    data,
  })),
];
