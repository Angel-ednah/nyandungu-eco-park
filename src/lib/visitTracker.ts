const STORAGE_KEY = "nyandungu_visits";

export interface VisitRecord {
  sectionId: string;
  timestamp: string;
  userAgent: string;
}

export interface SectionStats {
  sectionId: string;
  sectionName: string;
  totalVisits: number;
  todayVisits: number;
  visits: VisitRecord[];
}

function getVisits(): VisitRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function trackVisit(sectionId: string) {
  const visits = getVisits();
  visits.push({
    sectionId,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
}

export function getStats(): SectionStats[] {
  const visits = getVisits();
  const today = new Date().toISOString().split("T")[0];

  const sections = [
    { id: "nyandungu-info", name: "Visitor Guide (Near Road)" },
    { id: "peacock", name: "Peacock Sanctuary" },
    { id: "top-ten", name: "Top 10 Attractions (At Gate)" },
    { id: "trails", name: "Trails and Wildlife (Umudobori Lane)" },
  ];

  return sections.map((section) => {
    const sectionVisits = visits.filter((visit) => visit.sectionId === section.id);
    const todayVisits = sectionVisits.filter((visit) => visit.timestamp.startsWith(today));

    return {
      sectionId: section.id,
      sectionName: section.name,
      totalVisits: sectionVisits.length,
      todayVisits: todayVisits.length,
      visits: sectionVisits,
    };
  });
}

export function getTotalVisits(): number {
  return getVisits().length;
}

export function getTodayVisits(): number {
  const today = new Date().toISOString().split("T")[0];
  return getVisits().filter((visit) => visit.timestamp.startsWith(today)).length;
}
