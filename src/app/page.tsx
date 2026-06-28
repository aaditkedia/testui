import GalleryCard from "@/components/templates/GalleryCard";
import { templateEntries, type TemplateEntry } from "@/config/template-gallery";

// Accent color per template id
const ACCENT: Record<string, string> = {
  "westside-grill": "#C8A46A",
  "the-shelby": "#B86F3C",
  "lazeez-grill": "#2F9E44",
  "stuffed-to-the-grills": "#E8590C",
  glass: "#74C0FC",
  cinematic: "#E599F7",
  editorial: "#f5f5f5",
  ngpes: "#4DABF7",
  berco: "#FFD43B",
  corn: "#94D82D",
  "dark-3d": "#845EF7",
  helios: "#22B8CF",
  "boiler-cinematic": "#A855F7",
  "boiler-globe": "#FAB005",
  "boiler-drone": "#FF6B6B",
  pravah: "#20C997",
};

const GROUP_ORDER = [
  "Restaurant / Hospitality",
  "Community / Program",
  "Fintech / SaaS",
  "Agency / Holding",
  "Experimental / 3D",
  "AI / Infrastructure",
];

function categoryGroup(entry: TemplateEntry): string {
  if (entry.kind === "restaurant") return "Restaurant / Hospitality";
  if (entry.kind === "glass" || entry.kind === "cinematic" || entry.kind === "editorial")
    return "Community / Program";
  if (entry.kind === "ngpes") return "Fintech / SaaS";
  if (entry.kind === "berco") return "Agency / Holding";
  if (
    entry.kind === "corn" ||
    entry.kind === "dark-3d" ||
    entry.kind === "helios" ||
    entry.kind === "boiler-cinematic" ||
    entry.kind === "boiler-globe" ||
    entry.kind === "boiler-drone"
  )
    return "Experimental / 3D";
  return "AI / Infrastructure";
}

function buildGroups() {
  const map = new Map<string, TemplateEntry[]>();
  for (const t of templateEntries) {
    const key = categoryGroup(t);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  }
  return GROUP_ORDER.map((g) => ({ group: g, entries: map.get(g) ?? [] })).filter(
    (g) => g.entries.length > 0
  );
}

export default function Home() {
  const groups = buildGroups();

  const total = templateEntries.length;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#f5f5f5" }}>
      <main className="mx-auto w-full max-w-[1240px] flex flex-col gap-14 px-6 py-16">
        <header className="flex flex-col gap-3 border-b pb-10" style={{ borderColor: "#1f1f1f" }}>
          <span className="text-xs font-mono uppercase tracking-[0.18em]" style={{ color: "#6b6b6b" }}>
            Template Lab · {total} live demos
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "#f5f5f5" }}>
            Landing Page Gallery
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#a3a3a3" }}>
            Pitch-ready website templates, each previewing live below. Click any demo to open it
            full-bleed.
          </p>
        </header>

        {groups.map(({ group, entries }) => (
          <section key={group} className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold tracking-tight" style={{ color: "#f5f5f5" }}>
                {group}
              </h2>
              <span className="text-xs font-mono" style={{ color: "#5f5f5f" }}>
                {entries.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <GalleryCard
                  key={entry.id}
                  id={entry.id}
                  name={entry.name}
                  label={entry.label}
                  summary={entry.summary}
                  accent={ACCENT[entry.id] ?? "#f5f5f5"}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
