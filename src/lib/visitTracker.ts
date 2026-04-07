// Simple localStorage-based visit tracker (will be replaced with DB later)
const STORAGE_KEY = 'nyandungu_visits';

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
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
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
  const today = new Date().toISOString().split('T')[0];
  
  const sections = [
    { id: 'nyandungu-info', name: 'Nyandungu Info (Near Road)' },
    { id: 'peacock', name: 'Peacock Site' },
    { id: 'top-ten', name: 'Top 10 Sites (At Gate)' },
    { id: 'trails', name: 'Trails & Wildlife (Umudobori Lane)' },
  ];

  return sections.map(section => {
    const sectionVisits = visits.filter(v => v.sectionId === section.id);
    const todayVisits = sectionVisits.filter(v => v.timestamp.startsWith(today));
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
  const today = new Date().toISOString().split('T')[0];
  return getVisits().filter(v => v.timestamp.startsWith(today)).length;
}
