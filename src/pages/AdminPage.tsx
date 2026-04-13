import QRCodeCard from "@/components/QRCodeCard";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { getStats, getTodayVisits, getTotalVisits, type SectionStats } from "@/lib/visitTracker";

import { Calendar, Printer, QrCode, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [stats, setStats] = useState<SectionStats[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const baseUrl = window.location.origin;

  useSEO({
    title: "Admin Dashboard",
    description: "Private admin dashboard for Nyandungu Eco Park QR management and visit monitoring.",
    path: "/admin",
    noindex: true,
  });

  useEffect(() => {
    setStats(getStats());
    setTotalVisits(getTotalVisits());
    setTodayVisits(getTodayVisits());
  }, []);

  const handlePrintAll = () => {
    window.print();
  };

  const mostPopularSection = stats.length
    ? stats.reduce((current, next) => (current.totalVisits > next.totalVisits ? current : next)).sectionName
    : "N/A";

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor QR code scans and visitor traffic</p>
        </div>
        <Button variant="outline" onClick={handlePrintAll}>
          <Printer className="mr-2 h-4 w-4" />
          Print All QR Codes
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Visits</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalVisits}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
              <Calendar className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-sm text-muted-foreground">Today</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{todayVisits}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <QrCode className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">QR Sections</span>
          </div>
          <p className="text-3xl font-bold text-foreground">4</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-eco-gold/20">
              <TrendingUp className="h-5 w-5 text-eco-gold" />
            </div>
            <span className="text-sm text-muted-foreground">Most Popular</span>
          </div>
          <p className="truncate text-lg font-bold text-foreground">
            {mostPopularSection.split("(")[0].trim()}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-heading mb-4 text-xl font-semibold">Visits by Section</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">Section</th>
                  <th className="p-4 text-right text-sm font-medium text-muted-foreground">Today</th>
                  <th className="p-4 text-right text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((section) => (
                  <tr key={section.sectionId} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{section.sectionName}</p>
                      <p className="text-xs text-muted-foreground">/section/{section.sectionId}</p>
                    </td>
                    <td className="p-4 text-right font-semibold text-foreground">{section.todayVisits}</td>
                    <td className="p-4 text-right font-semibold text-foreground">{section.totalVisits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-heading mb-4 text-xl font-semibold">Printable QR Codes</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Print individual QR codes or use the button above. You can also share the links below
          with visitors who need direct access.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((section) => (
            <QRCodeCard
              key={section.sectionId}
              sectionId={section.sectionId}
              sectionName={section.sectionName}
              baseUrl={baseUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
