import wetlandsImage from "@/assets/14.jpeg";
import peacockQrImage from "@/assets/1.jpeg";
import nyandunguGate from "@/assets/nyandungu-gate.jpg";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

interface QRCodeCardProps {
  sectionId: string;
  sectionName: string;
  baseUrl: string;
}

const QRCodeCard = ({ sectionId, sectionName, baseUrl }: QRCodeCardProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const printWidth = "70cm";
  const printHeight = "90cm";

  const sectionPaths: Record<string, string> = {
    "nyandungu-info": "/nyandungu-info",
    peacock: "/peacock",
    "top-ten": "/top-ten",
    trails: "/trails",
  };

  const url = `${baseUrl}${sectionPaths[sectionId] ?? `/section/${sectionId}`}`;

  const sectionLabels: Record<string, { subtitle: string; subtitleKn: string; tagline: string }> = {
    "nyandungu-info": {
      subtitle: "Scan to See the Hidden Beauty of Nyandungu",
      subtitleKn: "Sikana hano kumenya byinshi",
      tagline: "Turn Your Curiosity Into a Real Experience",
    },
    peacock: {
      subtitle: "Discover the Beauty of the Peacock",
      subtitleKn: "Vumbura ubwiza bwa peacock",
      tagline: "Please Respect Our Peafowls",
    },
    "top-ten": {
      subtitle: "Scan to Know Top Ten Good Places",
      subtitleKn: "Sikana umenye ahantu icumi heza cyane",
      tagline: "Enjoy Nature, Follow Park Rules",
    },
    trails: {
      subtitle: "Welcome to Umudobori Lane",
      subtitleKn: "Murakaza neza muri Umudobori Lane",
      tagline: "Scan to Know Exciting Plants and Birds",
    },
  };

  const label = sectionLabels[sectionId] || {
    subtitle: sectionName,
    subtitleKn: "",
    tagline: "Scan · Learn · Protect",
  };

  const isParkInfo = sectionId === "nyandungu-info";

  const sectionHeroImages: Record<string, string> = {
    peacock: peacockQrImage,
  };

  const cardImage = sectionHeroImages[sectionId] ?? nyandunguGate;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const win = window.open("", "_blank");
    if (!win) return;

    const heroImageSrc = isParkInfo ? wetlandsImage : cardImage;
    const qrMarkup = printContent.innerHTML;

    win.document.write(`
      <html>
      <head>
        <title>Print - ${sectionName}</title>
        <style>
          @page { size: 70cm 90cm; margin: 0; }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: ${printWidth};
            height: ${printHeight};
            font-family: 'Inter', sans-serif;
            background: #0c2118;
            color: white;
            overflow: hidden;
          }

          .poster-container { width: 100%; height: 100%; display: flex; flex-direction: column; background: #1a3d2e; }

          .header { padding: 2cm; display: flex; flex-direction: column; align-items: center; background: #0c2118; }
          .logo-area { display: flex; align-items: center; gap: 1.5cm; margin-bottom: 0.8cm; }
          .logo-circle { width: 4cm; height: 4cm; background: #22c55e; border-radius: 50% 0 50% 50%; }
          .brand-text h1 { font-family: 'Playfair Display', serif; font-size: 5rem; text-transform: uppercase; letter-spacing: 8px; font-weight: 900; }
          .brand-text p { font-size: 2rem; letter-spacing: 5px; color: #4ade80; font-weight: 700; }

          .welcome-banner {
            background: white;
            color: #0c2118;
            width: 100%;
            text-align: center;
            padding: 1.5cm;
            font-size: 4rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 4px;
            border-bottom: 10px solid #d4a843;
          }

          .hero-section { width: 100%; height: 30cm; overflow: hidden; }
          .hero-section img { width: 100%; height: 100%; object-fit: cover; }

          .middle-section {
            display: flex;
            background: white;
            color: #333;
            padding: 2.5cm;
            gap: 2.5cm;
            align-items: center;
            height: 22cm;
            border-top: 15px solid #d4a843;
          }
          
          .qr-box-container { flex: 1; display: flex; flex-direction: column; align-items: center; }
          .qr-border {
            padding: 1.2cm;
            border: 12px solid #1a3d2e;
            border-radius: 1.5cm;
            background: white;
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          }
          .qr-border .qr-container { background: transparent; padding: 0; box-shadow: none; }
          .qr-border svg { width: 14cm !important; height: 14cm !important; display: block; }
          
          .scan-btn {
            background: #1a3d2e;
            color: white;
            padding: 0.8cm 2cm;
            border-radius: 20px;
            margin-top: 1cm;
            font-weight: 900;
            font-size: 2.2rem;
            letter-spacing: 2px;
          }

          .info-text-area { flex: 1.5; }
          .info-text-area h2 {
            font-family: 'Playfair Display', serif;
            font-size: 4.2rem;
            color: #1a3d2e;
            line-height: 1.1;
            margin-bottom: 1cm;
            font-weight: 900;
          }
          
          .fee-box {
            background: #f59e0b;
            padding: 1.2cm;
            border-radius: 25px;
            text-align: center;
            color: #0c2118;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .fee-box h4 { font-size: 1.8rem; text-transform: uppercase; margin-bottom: 0.3cm; font-weight: 800; }
          .fee-box .price { font-size: 5rem; font-weight: 950; letter-spacing: -2px; }

          .discover-section { background: #0c2118; padding: 2cm; text-align: center; }
          .section-title { font-size: 2.5rem; color: #4ade80; text-transform: uppercase; letter-spacing: 6px; margin-bottom: 1.5cm; font-weight: 800; }
          .thumbs { display: flex; justify-content: space-around; gap: 1cm; }
          .thumb { width: 22%; }
          .thumb img { width: 100%; height: 5cm; border-radius: 20px; object-fit: cover; border: 5px solid #d4a843; }
          .thumb span { display: block; margin-top: 0.6cm; font-size: 1.4rem; font-weight: 700; color: #fff; }

          .prohibited-section { background: #1a3d2e; padding: 2cm; text-align: center; border-top: 2px solid rgba(255,255,255,0.1); }
          .pro-list { display: flex; justify-content: center; gap: 3cm; margin-top: 1cm; }
          .pro-item { display: flex; flex-direction: column; align-items: center; gap: 0.5cm; }
          .pro-icon {
            width: 3.5cm; height: 3.5cm;
            background: white;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 2cm;
            border: 6px solid #86efac;
          }
          .pro-item span { font-size: 1.5rem; font-weight: 700; }

          .cta-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #0c2118;
            padding: 1.5cm;
            border-top: 10px solid #d4a843;
          }
          .cta-title { font-size: 4.5rem; font-weight: 900; color: #4ade80; margin-bottom: 0.4cm; text-transform: uppercase; }
          .cta-tagline { font-size: 2rem; letter-spacing: 12px; font-weight: 600; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="poster-container">
          <div class="header">
            <div class="logo-area">
               <div class="logo-circle"></div>
               <div class="brand-text">
                 <h1>Nyandungu</h1>
                 <p>ECO - PARK</p>
               </div>
            </div>
          </div>

          <div class="welcome-banner">Welcome to Nyandungu Eco-Park</div>

          <div class="hero-section">
            <img src="${heroImageSrc}" alt="Nyandungu" />
          </div>

          <div class="middle-section">
            <div class="qr-box-container">
              <div class="qr-border">${qrMarkup}</div>
              <div class="scan-btn">● SCAN HERE TO DISCOVER</div>
            </div>
            <div class="info-text-area">
              <h2>${label.subtitle}</h2>
              <p style="font-size: 1.8rem; color: #555; margin-bottom: 1.5cm; font-weight: 500;">Use your phone camera to reveal the magic of Nyandungu.</p>
              <div class="fee-box">
                <h4>Entry Fee for Rwandans Only</h4>
                <div class="price">2,000 RWF</div>
                <p style="font-size: 1.4rem; font-weight: 700;">igiciro kiza kinogeye buri wese!</p>
              </div>
            </div>
          </div>

          <div class="discover-section">
            <div class="section-title">🌿 What You Will Discover 🌿</div>
            <div class="thumbs">
              <div class="thumb"><img src="${heroImageSrc}" alt="Beautiful Wetlands" /><span>Beautiful Wetlands</span></div>
              <div class="thumb"><img src="${heroImageSrc}" alt="Birds & Wildlife" /><span>Birds & Wildlife</span></div>
              <div class="thumb"><img src="${heroImageSrc}" alt="Walking & Cycling" /><span>Walking & Cycling</span></div>
              <div class="thumb"><img src="${heroImageSrc}" alt="Relaxing Nature" /><span>Relaxing Nature</span></div>
            </div>
          </div>

          <div class="prohibited-section">
            <div class="section-title" style="color: #86efac; font-size: 2.5rem;">🚫 Prohibited Activities 🚫</div>
            <div class="pro-list">
              <div class="pro-item"><div class="pro-icon">🚭</div><span>No Smoking</span></div>
              <div class="pro-item"><div class="pro-icon">🍔</div><span>No Food</span></div>
              <div class="pro-item"><div class="pro-icon">🥤</div><span>No Plastic</span></div>
              <div class="pro-item"><div class="pro-icon">🐕</div><span>No Pets</span></div>
            </div>
          </div>

          <div class="cta-area">
            <div class="cta-title">Visit Nyandungu Today!</div>
            <div class="cta-tagline">Scan · Learn · Protect</div>
          </div>
        </div>
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
            }, 1000);
          };
        </script>
      </body>
      </html>
    `);

    win.document.close();
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border flex flex-col items-center gap-4">
      {isParkInfo ? (
        <img src={wetlandsImage} alt="Nyandungu Wetlands" className="w-full h-44 object-cover" />
      ) : (
        <img src={cardImage} alt={sectionName} className="w-full h-40 object-cover" />
      )}
      <div className="px-6 w-full text-center">
        <p className="text-sm font-bold text-primary tracking-widest uppercase">Nyandungu Eco-Park</p>
        <h3 className="text-xl font-bold text-foreground mt-1">{sectionName}</h3>
        <p className="text-sm text-muted-foreground mt-1">{label.subtitle}</p>
        {isParkInfo && <p className="text-sm text-primary font-semibold mt-1">Entry: 2,000 RWF (Rwandans)</p>}
      </div>
      <div ref={printRef} className="bg-card p-4 rounded-lg">
        <div className="qr-container">
          <QRCodeSVG value={url} size={180} level="H" includeMargin />
        </div>
      </div>
      <p className="text-xs text-muted-foreground break-all text-center max-w-[220px] px-6">{url}</p>
      <div className="flex gap-2 pb-6">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-1 h-4 w-4" /> Print
        </Button>
        <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(url); }}>
          <LinkIcon className="mr-1 h-4 w-4" /> Copy Link
        </Button>
      </div>
    </div>
  );
};

export default QRCodeCard;
