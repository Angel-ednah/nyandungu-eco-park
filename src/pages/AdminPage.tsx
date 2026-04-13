
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

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor QR code scans and visitor traffic</p>
        </div>
        <Button variant="outline" onClick={handlePrintAll}>
          <Printer className="mr-2 h-4 w-4" /> Print All QR Codes
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Visits</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalVisits}</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-sm text-muted-foreground">Today</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{todayVisits}</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <QrCode className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">QR Sections</span>
          </div>
          <p className="text-3xl font-bold text-foreground">4</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-eco-gold/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-eco-gold" />
            </div>
            <span className="text-sm text-muted-foreground">Most Popular</span>
          </div>
          <p className="text-lg font-bold text-foreground truncate">
            {stats.length ? stats.reduce((a, b) => a.totalVisits > b.totalVisits ? a : b).sectionName.split('(')[0].trim() : '—'}
          </p>
        </div>
      </div>

      {/* Section Stats */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold mb-4">Visits by Section</h2>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Section</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Today</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.map(s => (
                  <tr key={s.sectionId} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{s.sectionName}</p>
                      <p className="text-xs text-muted-foreground">/section/{s.sectionId}</p>
                    </td>
                    <td className="p-4 text-right font-semibold text-foreground">{s.todayVisits}</td>
                    <td className="p-4 text-right font-semibold text-foreground">{s.totalVisits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Printable QR Codes */}
      <div>
        <h2 className="font-heading text-xl font-semibold mb-4">Printable QR Codes</h2>
        <p className="text-sm text-muted-foreground mb-6">Print individual QR codes or use the "Print All" button above. Share the links below with visitors who don't have smartphones.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <QRCodeCard key={s.sectionId} sectionId={s.sectionId} sectionName={s.sectionName} baseUrl={baseUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
