export interface NewsSource {
  name: string;
  url: string;
  rssUrl: string;
  category: Category;
  country: string;
}

export type Category =
  | "trade"
  | "logistics"
  | "energy"
  | "politics"
  | "infrastructure"
  | "economy";

export const CATEGORIES: Record<Category, string> = {
  trade: "Trade",
  logistics: "Logistics",
  energy: "Energy",
  politics: "Politics",
  infrastructure: "Infrastructure",
  economy: "Economy",
};

export const MIDDLE_CORRIDOR_KEYWORDS = [
  "middle corridor",
  "trans-caspian",
  "titr",
  "silk road",
  "btc pipeline",
  "btk railway",
  "baku-tbilisi",
  "baku tbilisi",
  "caspian route",
  "kazakhstan transit",
  "azerbaijan transit",
  "georgia transit",
  "transcaspian",
  "new silk road",
  "belt and road",
  "china europe rail",
  "ktze",
  "adif",
  "camin cargo",
  "aktau port",
  "alat port",
  "poti port",
];

export const NEWS_SOURCES: NewsSource[] = [
  {
    name: "Silk Road Briefing",
    url: "https://www.silkroadbriefing.com",
    rssUrl: "https://www.silkroadbriefing.com/news/feed/",
    category: "trade",
    country: "International",
  },
  {
    name: "Trend News Agency",
    url: "https://en.trend.az",
    rssUrl: "https://en.trend.az/rss",
    category: "economy",
    country: "Azerbaijan",
  },
  {
    name: "Azernews",
    url: "https://www.azernews.az",
    rssUrl: "https://www.azernews.az/rss/",
    category: "economy",
    country: "Azerbaijan",
  },
  {
    name: "Agenda.ge",
    url: "https://agenda.ge",
    rssUrl: "https://agenda.ge/feed",
    category: "politics",
    country: "Georgia",
  },
  {
    name: "Kazinform",
    url: "https://www.inform.kz",
    rssUrl: "https://www.inform.kz/en/rss.xml",
    category: "economy",
    country: "Kazakhstan",
  },
  {
    name: "The Astana Times",
    url: "https://astanatimes.com",
    rssUrl: "https://astanatimes.com/feed/",
    category: "economy",
    country: "Kazakhstan",
  },
  {
    name: "Railway Gazette",
    url: "https://www.railwaygazette.com",
    rssUrl: "https://www.railwaygazette.com/rss",
    category: "logistics",
    country: "International",
  },
  {
    name: "Lloyd's List",
    url: "https://lloydslist.maritimeintelligence.informa.com",
    rssUrl: "https://lloydslist.maritimeintelligence.informa.com/rss",
    category: "logistics",
    country: "International",
  },
];
