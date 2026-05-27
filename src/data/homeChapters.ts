export interface HomeChapter {
  id: string;
  number: string;
  name: string;
  description: string;
}

export const HOME_CHAPTERS: HomeChapter[] = [
  {
    id: "chapter-01",
    number: "01",
    name: "THE GATEWAY",
    description: "Entry point",
  },
  {
    id: "chapter-02",
    number: "02",
    name: "CORE PULSE",
    description: "Platform basics",
  },
  {
    id: "chapter-03",
    number: "03",
    name: "THE BLUEPRINT",
    description: "Product surface",
  },
  {
    id: "chapter-04",
    number: "04",
    name: "VELOCITY",
    description: "Developer flow",
  },
  {
    id: "chapter-05",
    number: "05",
    name: "SCALE",
    description: "Proof points",
  },
  {
    id: "chapter-06",
    number: "06",
    name: "THE CONTRACT",
    description: "Close the loop",
  },
];

