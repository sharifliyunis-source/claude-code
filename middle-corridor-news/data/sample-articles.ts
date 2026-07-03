import type { Article } from "@/lib/types";

// Sample articles for local preview when live RSS feeds are unreachable.
// Only used when USE_SAMPLE_DATA=1 (see lib/feed.ts) — never in production.
export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "sample-0001",
    title:
      "Middle Corridor cargo volumes hit record high as Trans-Caspian route expands",
    summary:
      "Freight volumes along the Trans-Caspian International Transport Route grew sharply this year, driven by new intermodal services linking China to Europe via Kazakhstan, the Caspian Sea, Azerbaijan and Georgia.",
    url: "https://example.com/sample-1",
    source: "https://www.silkroadbriefing.com",
    sourceName: "Silk Road Briefing",
    category: "trade",
    publishedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    country: "International",
  },
  {
    id: "sample-0002",
    title: "Baku port completes new terminal to handle rising TITR container traffic",
    summary:
      "The Port of Baku at Alat commissioned an expanded container terminal, doubling annual handling capacity to support growing Middle Corridor transit.",
    url: "https://example.com/sample-2",
    source: "https://en.trend.az",
    sourceName: "Trend News Agency",
    category: "infrastructure",
    publishedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    country: "Azerbaijan",
  },
  {
    id: "sample-0003",
    title: "Kazakhstan and Azerbaijan agree unified tariffs for Trans-Caspian shipments",
    summary:
      "Railway operators of Kazakhstan, Azerbaijan and Georgia signed an agreement on unified through-tariffs, cutting paperwork and transit times on the Middle Corridor.",
    url: "https://example.com/sample-3",
    source: "https://astanatimes.com",
    sourceName: "The Astana Times",
    category: "logistics",
    publishedAt: new Date(Date.now() - 9 * 3600000).toISOString(),
    country: "Kazakhstan",
  },
  {
    id: "sample-0004",
    title: "BTK railway upgrade boosts annual capacity to 5 million tonnes",
    summary:
      "The Baku–Tbilisi–Kars railway completed modernization works on the Georgian section, raising throughput capacity as Middle Corridor demand accelerates.",
    url: "https://example.com/sample-4",
    source: "https://agenda.ge",
    sourceName: "Agenda.ge",
    category: "infrastructure",
    publishedAt: new Date(Date.now() - 14 * 3600000).toISOString(),
    country: "Georgia",
  },
  {
    id: "sample-0005",
    title: "EU pledges €10 billion for Trans-Caspian transport corridor development",
    summary:
      "The European Union confirmed a Global Gateway investment package for Middle Corridor infrastructure, targeting ports, rail and border-crossing digitalization across Central Asia and the South Caucasus.",
    url: "https://example.com/sample-5",
    source: "https://www.inform.kz",
    sourceName: "Kazinform",
    category: "politics",
    publishedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
    country: "Kazakhstan",
  },
  {
    id: "sample-0006",
    title: "Caspian green energy cable project advances alongside Middle Corridor route",
    summary:
      "Azerbaijan, Georgia, Romania and Hungary progressed the Black Sea submarine electricity cable, pairing energy exports with the corridor's transit growth.",
    url: "https://example.com/sample-6",
    source: "https://report.az/en",
    sourceName: "Report.az",
    category: "energy",
    publishedAt: new Date(Date.now() - 26 * 3600000).toISOString(),
    country: "Azerbaijan",
  },
  {
    id: "sample-0007",
    title: "Uzbekistan joins Middle Corridor route development agreement",
    summary:
      "Tashkent signed onto the multilateral TITR framework, adding Uzbek rail links to the corridor network and opening new feeder routes from the Ferghana Valley.",
    url: "https://example.com/sample-7",
    source: "https://kun.uz/en",
    sourceName: "Kun.uz",
    category: "politics",
    publishedAt: new Date(Date.now() - 32 * 3600000).toISOString(),
    country: "Uzbekistan",
  },
  {
    id: "sample-0008",
    title: "Middle Corridor transit times fall below 15 days for China–Europe cargo",
    summary:
      "Improved ferry scheduling on the Caspian and digital customs corridors cut average door-to-door transit on the trans-Caspian route, operators reported.",
    url: "https://example.com/sample-8",
    source: "https://kursiv.media",
    sourceName: "Kursiv",
    category: "economy",
    publishedAt: new Date(Date.now() - 40 * 3600000).toISOString(),
    country: "Kazakhstan",
  },
  {
    id: "sample-0009",
    title: "Kyrgyzstan eyes feeder role in Trans-Caspian trade network",
    summary:
      "Bishkek outlined plans to connect the CKU railway project with Middle Corridor services, positioning Kyrgyzstan as a southern feeder for corridor traffic.",
    url: "https://example.com/sample-9",
    source: "https://en.kabar.kg",
    sourceName: "Kabar",
    category: "trade",
    publishedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    country: "Kyrgyzstan",
  },
];
