import wetlandsImage from "@/assets/14.jpeg";
import peacockQrImage from "@/assets/1.jpeg";
import docTrails from "@/assets/doc-bamboo-trail.jpg";
import docBicycles from "@/assets/doc-bicycles.jpg";
import docBirds from "@/assets/doc-cranes.jpg";
import docSanctuaryBird from "@/assets/doc-sanctuary-bird.jpg";
import docKingfisher from "@/assets/doc-kingfisher.jpg";
import driveSlowlySign from "@/assets/44.jpeg";
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

  const sectionPaths: Record<string, string> = {
    "nyandungu-info": "/nyandungu-info",
    peacock: "/peacock",
    "top-ten": "/top-ten",
    trails: "/trails",
  };

  const url = `${baseUrl}${sectionPaths[sectionId] ?? `/section/${sectionId}`}`;

  const sectionLabels: Record<string, { welcome?: string; subtitle: string; subtitleKn: string; tagline: string }> = {
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
      welcome: "Welcome to Nyandungu Eco-Park",
      subtitle: "",
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
    welcome: "",
    subtitle: sectionName,
    subtitleKn: "",
    tagline: "Scan · Learn · Protect",
  };

  const isParkInfo = sectionId === "nyandungu-info";
  const isTrailSection = sectionId === "trails";
  const isTopTenSection = sectionId === "top-ten";
  const showProhibitedBanner = isTopTenSection;

  const sectionHeroImages: Record<string, string> = {
    peacock: peacockQrImage,
    trails: docKingfisher,
    "top-ten": docSanctuaryBird,
  };

  const cardImage = sectionHeroImages[sectionId] ?? nyandunguGate;
  const cardImageClassName = isTrailSection
    ? "w-full h-40 object-cover object-center"
    : "w-full h-40 object-cover";

  const getPrintableImageSrc = (src: string) =>
    new Promise<string>((resolve) => {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      img.onerror = () => resolve(src);
    });

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const win = window.open("", "_blank");
    if (!win) return;

    if (isParkInfo) {
      const doPrint = (wetlandSrc: string, birdsSrc: string, bicyclesSrc: string, trailsSrc: string) => {
        win.document.write(`
          <html><head><title>QR Code - ${sectionName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Inter',Arial,sans-serif; background:#1a3d2e; padding: 20px; }
            .billboard {
              width: 500px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 12px 40px rgba(0,0,0,0.3);
            }
            .header {
              background: linear-gradient(135deg, #1a4d3a 0%, #2d6a4f 100%);
              padding: 16px 20px;
              text-align: center;
            }
            .logo-area {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              margin-bottom: 6px;
            }
            .logo-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%);
              border-radius: 50% 0 50% 50%;
              position: relative;
            }
            .logo-icon::after {
              content: '';
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 20px;
              height: 12px;
              background: #3b82f6;
              border-radius: 0 50% 50% 0;
              opacity: 0.7;
            }
            .park-title {
              text-align: left;
            }
            .park-title h1 {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 20px;
              font-weight: 700;
              color: white;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin: 0;
            }
            .park-title .subtitle {
              font-size: 9px;
              color: rgba(255,255,255,0.8);
              letter-spacing: 4px;
              text-transform: uppercase;
            }
            .tagline-header {
              font-size: 11px;
              color: rgba(255,255,255,0.9);
              letter-spacing: 2px;
              margin-top: 4px;
            }
            .welcome-banner {
              background: #f5f5f0;
              padding: 12px;
              text-align: center;
              border-bottom: 2px solid #d4a843;
            }
            .welcome-banner h2 {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 22px;
              font-weight: 700;
              color: #1a4d3a;
              letter-spacing: 2px;
              text-transform: uppercase;
            }
            .hero-image {
              width: 100%;
              height: 200px;
              object-fit: cover;
            }
            .scan-section {
              display: flex;
              padding: 20px;
              gap: 20px;
              background: #f8f8f5;
            }
            .qr-area {
              flex: 0 0 140px;
              text-align: center;
            }
            .qr-box {
              background: white;
              padding: 12px;
              border-radius: 8px;
              border: 3px solid #1a4d3a;
              margin-bottom: 8px;
            }
            .scan-here {
              background: #1a4d3a;
              color: white;
              padding: 6px 12px;
              border-radius: 4px;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 1px;
              text-transform: uppercase;
            }
            .info-area {
              flex: 1;
            }
            .hidden-beauty {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 18px;
              font-weight: 700;
              color: #1a4d3a;
              line-height: 1.3;
              margin-bottom: 8px;
            }
            .discover-text {
              font-size: 11px;
              color: #666;
              margin-bottom: 12px;
            }
            .entry-fee {
              background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
              padding: 12px;
              border-radius: 8px;
              text-align: center;
            }
            .entry-fee h4 {
              font-size: 10px;
              color: #1a4d3a;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 4px;
            }
            .entry-fee .price {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 24px;
              font-weight: 700;
              color: #1a4d3a;
            }
            .entry-fee .price-note {
              font-size: 9px;
              color: #1a4d3a;
              opacity: 0.8;
            }
            .discover-section {
              padding: 16px 20px;
              background: #1a4d3a;
            }
            .discover-title {
              color: white;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
              text-align: center;
              margin-bottom: 12px;
            }
            .thumbnails {
              display: flex;
              gap: 8px;
              justify-content: center;
            }
            .thumb {
              width: 80px;
              height: 60px;
              object-fit: cover;
              border-radius: 4px;
              border: 2px solid white;
            }
            .thumb-label {
              font-size: 8px;
              color: rgba(255,255,255,0.8);
              text-align: center;
              margin-top: 4px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .rules-section {
              background: #1f7a3f;
              padding: 12px 20px;
              text-align: center;
            }
            .rules-title {
              color: white;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 8px;
            }
            .rules-icons {
              display: flex;
              justify-content: center;
              gap: 16px;
            }
            .rule-icon {
              width: 40px;
              height: 40px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
            }
            .rule-text {
              font-size: 8px;
              color: rgba(255,255,255,0.9);
              margin-top: 4px;
              max-width: 50px;
              text-align: center;
              line-height: 1.2;
            }
            .footer-cta {
              background: linear-gradient(135deg, #166534 0%, #15803d 100%);
              padding: 16px 20px;
              text-align: center;
            }
            .cta-icon {
              font-size: 20px;
              margin-bottom: 4px;
            }
            .cta-text {
              color: white;
              font-size: 10px;
              letter-spacing: 1px;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .cta-highlight {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 16px;
              font-weight: 700;
              color: #fbbf24;
              letter-spacing: 1px;
              text-transform: uppercase;
            }
            .cta-tagline {
              color: rgba(255,255,255,0.8);
              font-size: 10px;
              letter-spacing: 2px;
              margin-top: 8px;
            }
            .footer-bar {
              background: #1a4d3a;
              padding: 8px;
              text-align: center;
            }
            .footer-bar p {
              color: rgba(255,255,255,0.95);
              font-family: "Times New Roman", Times, serif;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.5px;
            }
          </style></head><body>
          <div class="billboard">
            <div class="header">
              <div class="logo-area">
                <div class="logo-icon"></div>
                <div class="park-title">
                  <h1>Nyandungu</h1>
                  <div class="subtitle">Eco-Park</div>
                </div>
              </div>
              <div class="tagline-header">Discover · Learn · Protect</div>
            </div>
            <div class="welcome-banner">
              <h2>Welcome to Nyandungu Eco-Park</h2>
            </div>
            <img src="${wetlandSrc}" class="hero-image" alt="Nyandungu Wetlands" />
            <div class="scan-section">
              <div class="qr-area">
                <div class="qr-box">${printContent.innerHTML}</div>
                <div class="scan-here">📍 Scan Here</div>
              </div>
              <div class="info-area">
                <div class="hidden-beauty">Scan to See the<br>Hidden Beauty of<br>Nyandungu</div>
                <div class="discover-text">Discover nature, wildlife, and peaceful trails inside</div>
                <div class="entry-fee">
                  <h4>Entry Fee for Rwandans Only</h4>
                  <div class="price">2,000 RWF</div>
                  <div class="price-note">igiciro kiza kuri buri wese!</div>
                </div>
              </div>
            </div>
            <div class="discover-section">
              <div class="discover-title">🌿 What You Will Discover 🌿</div>
              <div class="thumbnails">
                <div>
                  <img src="${wetlandSrc}" class="thumb" />
                  <div class="thumb-label">Beautiful Wetlands</div>
                </div>
                <div>
                  <img src="${birdsSrc}" class="thumb" onerror="this.style.display='none'" />
                  <div class="thumb-label">Birds & Wildlife</div>
                </div>
                <div>
                  <img src="${bicyclesSrc}" class="thumb" onerror="this.style.display='none'" />
                  <div class="thumb-label">Walking & Cycling</div>
                </div>
                <div>
                  <img src="${trailsSrc}" class="thumb" onerror="this.style.display='none'" />
                  <div class="thumb-label">Relaxing Nature</div>
                </div>
              </div>
            </div>
            <div class="rules-section">
              <div class="rules-title">🚫 Prohibited Activities 🚫</div>
              <div class="rules-icons">
                <div>
                  <div class="rule-icon">🚭</div>
                  <div class="rule-text">No Smoking</div>
                </div>
                <div>
                  <div class="rule-icon">🍔</div>
                  <div class="rule-text">unauthorized outside food</div>
                </div>
                <div>
                  <div class="rule-icon">🥤</div>
                  <div class="rule-text">No Plastic Bottles</div>
                </div>
                <div>
                  <div class="rule-icon">🐕</div>
                  <div class="rule-text">No Pets</div>
                </div>
              </div>
            </div>
            <div class="footer-cta">
              <div class="cta-icon">📍</div>
              <div class="cta-text">Turn Your Curiosity Into a Real Experience</div>
              <div class="cta-highlight">Visit Nyandungu Today!</div>
              <div class="cta-tagline">🌿 Scan · Learn · Protect 🌿</div>
            </div>
            <div class="footer-bar">
              <p>Dufatanye kurinda no kubungabunga pariki</p>
            </div>
          </div>
          <script>window.onload=function(){setTimeout(function(){window.print();},500);}</script>
          </body></html>
        `);
      };

      Promise.all([
        getPrintableImageSrc(wetlandsImage),
        getPrintableImageSrc(docBirds),
        getPrintableImageSrc(docBicycles),
        getPrintableImageSrc(docTrails),
      ]).then(([wetlandSrc, birdsSrc, bicyclesSrc, trailsSrc]) => {
        doPrint(wetlandSrc, birdsSrc, bicyclesSrc, trailsSrc);
      });
      return;
    }

    const doPrint = (heroImgSrc: string) => {
      win.document.write(`
        <html><head><title>QR Code - ${sectionName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Inter',Arial,sans-serif; background:#f5f5f0; }
          .card {
            width: 420px;
            background: linear-gradient(135deg, #f8f6f0 0%, #e8e4d8 100%);
            border: 3px solid #2d5a27;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            overflow: hidden;
          }
          .gate-photo {
            width: 100%;
            height: 160px;
            object-fit: cover;
          }
          .trail-photo {
            object-fit: cover;
            object-position: center;
          }
          .prohibited-section {
            background: #1f7a3f;
            padding: 12px 14px;
            border-radius: 10px;
            margin-bottom: 10px;
          }
          .prohibited-title {
            color: white;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
          }
          .prohibited-icons {
            display: flex;
            justify-content: center;
            gap: 10px;
          }
          .prohibited-item {
            max-width: 70px;
          }
          .prohibited-icon {
            width: 34px;
            height: 34px;
            margin: 0 auto 4px;
            background: white;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
          }
          .prohibited-text {
            font-size: 8px;
            color: rgba(255,255,255,0.95);
            line-height: 1.2;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          html, body {
            min-height: 100%;
            background: #ece7d9;
            font-family: 'Inter', Arial, sans-serif;
            color: #203127;
          }
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          .card {
            width: 540px;
            background: #f7f3e8;
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
          }
          .hero-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
          }
          .header {
            padding: 24px 28px 18px;
            text-align: center;
          }
          .park-name {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 18px;
            font-weight: 700;
            color: #2f5e34;
            letter-spacing: 0.35em;
            text-transform: uppercase;
          }
          .brand-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 34px;
            font-weight: 700;
            color: #1b3d26;
            margin: 12px 0 8px;
            line-height: 1.05;
          }
          .brand-subtitle {
            font-size: 11px;
            color: #4b5f47;
            letter-spacing: 0.3em;
            text-transform: uppercase;
          }
          .content {
            padding: 22px 28px 28px;
          }
          .page-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 18px;
            font-weight: 700;
            color: #1b3d26;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 8px;
          }
          .section-description {
            font-size: 13px;
            font-weight: 700;
            color: #2f5e34;
            margin-bottom: 8px;
          }
          .subtitle-kn {
            font-size: 11px;
            color: #55654a;
            font-style: italic;
            margin-bottom: 20px;
          }
          .qr-panel {
            background: white;
            border-radius: 28px;
            padding: 24px 22px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
            text-align: center;
            margin-bottom: 20px;
          }
          .qr-panel .qr-container {
            margin: 0 auto 18px;
          }
          .scan-label {
            font-size: 13px;
            font-weight: 700;
            color: #1f4d2b;
            margin-bottom: 5px;
          }
          .scan-label-kn {
            font-size: 11px;
            color: #5a6b57;
            margin-bottom: 18px;
          }
          .info-box {
            background: #1f7a3f;
            border-radius: 22px;
            padding: 16px 18px;
            color: white;
            margin-bottom: 18px;
          }
          .info-box h4 {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            margin-bottom: 6px;
          }
          .info-box p {
            font-size: 10px;
            line-height: 1.5;
            opacity: 0.95;
          }
          .prohibited-section {
            background: #2f7b3f;
            border-radius: 24px;
            padding: 18px 20px 20px;
            color: white;
            margin-bottom: 18px;
          }
          .prohibited-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            margin-bottom: 12px;
            text-align: center;
          }
          .prohibited-icons {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
          }
          .prohibited-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }
          .prohibited-icon {
            width: 40px;
            height: 40px;
            border-radius: 999px;
            background: white;
            color: #1f7a3f;
            display: grid;
            place-items: center;
            font-size: 18px;
            font-weight: 700;
          }
          .prohibited-text {
            font-size: 9px;
            line-height: 1.2;
            text-align: center;
            color: rgba(255,255,255,0.95);
          }
          .tagline-bottom {
            font-size: 11px;
            font-weight: 700;
            color: #4c633c;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 8px;
          }
          .url {
            font-size: 9px;
            color: #6d6d6d;
            text-align: center;
            word-break: break-all;
          }
        </style></head><body>
        <div class="card">
          <img src="${heroImgSrc}" class="hero-image" alt="${sectionName}" />
          <div class="header">
            <div class="park-name">Nyandungu Eco-Park</div>
            <div class="brand-title">Nyandungu Eco-Park</div>
            <div class="brand-subtitle">Discover · Learn · Protect</div>
          </div>
          <div class="content">
            ${label.welcome ? `<div class="page-title">${label.welcome}</div>` : ""}
            <div class="section-description">${sectionName}</div>
            <div class="subtitle-kn">${label.subtitleKn || "Sikana umenye ahantu icumi heza cyane"}</div>
            <div class="qr-panel">
              ${printContent.innerHTML}
              <div class="scan-label">📍 Scan Here / Sikana Hano</div>
              <div class="scan-label-kn">For more information, scan the code above</div>
            </div>
            <div class="info-box">
              <h4>Enjoy nature, follow park rules</h4>
              <p>Respect nature · Follow park rules · Have a memorable experience!</p>
            </div>
            ${showProhibitedBanner ? `<div class="prohibited-section"><div class="prohibited-title">Prohibited Activities</div><div class="prohibited-icons"><div class="prohibited-item"><div class="prohibited-icon">&#128685;</div><div class="prohibited-text">No Smoking</div></div><div class="prohibited-item"><div class="prohibited-icon">&#127828;</div><div class="prohibited-text">No Outside Food</div></div><div class="prohibited-item"><div class="prohibited-icon">&#129380;</div><div class="prohibited-text">No Plastic Bottles</div></div><div class="prohibited-item"><div class="prohibited-icon">&#128054;</div><div class="prohibited-text">No Pets</div></div></div></div>` : ""}
            <div class="tagline-bottom">Scan · Learn · Protect</div>
            <div class="url">${url}</div>
          </div>
        </div>
        <script>window.onload=function(){setTimeout(function(){window.print();},500);}</script>
        </body></html>
      `);
    };

    getPrintableImageSrc(cardImage).then((heroImgSrc) => {
      doPrint(heroImgSrc);
    });
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border flex flex-col items-center gap-4">
      {isParkInfo ? (
        <img src={wetlandsImage} alt="Nyandungu Wetlands" className="w-full h-44 object-cover" />
      ) : (
        <img src={cardImage} alt={sectionName} className={cardImageClassName} />
      )}
      <div className="px-6 w-full text-center">
        <p className="text-sm font-bold text-primary tracking-widest uppercase">Nyandungu Eco-Park</p>
        {isTopTenSection && label.welcome ? (
          <>
            <p className="mt-1 font-serif text-[1.65rem] font-bold leading-tight text-foreground">
              {label.welcome}
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-primary">{sectionName}</p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-foreground mt-1">{sectionName}</h3>
            {label.welcome && (
              <p className="mt-1 font-serif text-lg font-bold uppercase tracking-wide text-primary">
                {label.welcome}
              </p>
            )}
          </>
        )}
        <p className="text-sm text-muted-foreground mt-1">{label.subtitle}</p>
        {isParkInfo && <p className="text-sm text-primary font-semibold mt-1">Entry: 2,000 RWF (Rwandans)</p>}
      </div>
      <div ref={printRef} className="bg-card p-4 rounded-lg">
        <div className="qr-container">
          <QRCodeSVG value={url} size={180} level="H" includeMargin />
        </div>
      </div>
      <p className="text-xs text-muted-foreground break-all text-center max-w-[220px] px-6">{url}</p>
      {showProhibitedBanner && (
        <div className="mx-6 w-[calc(100%-3rem)] rounded-xl bg-[#1f7a3f] px-3 py-3 text-white shadow-sm">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em]">
            Prohibited Activities
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1f7a3f]">
                NS
              </div>
              <p className="mt-1 text-[9px] leading-tight">No Smoking</p>
            </div>
            <div>
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1f7a3f]">
                NF
              </div>
              <p className="mt-1 text-[9px] leading-tight">No Outside Food</p>
            </div>
            <div>
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1f7a3f]">
                PB
              </div>
              <p className="mt-1 text-[9px] leading-tight">No Plastic Bottles</p>
            </div>
            <div>
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1f7a3f]">
                NP
              </div>
              <p className="mt-1 text-[9px] leading-tight">No Pets</p>
            </div>
          </div>
        </div>
      )}
      {isTrailSection && (
        <div className="mx-6 mb-1 rounded-2xl border border-primary/20 bg-primary/5 p-3 text-center shadow-sm">
          <img
            src={driveSlowlySign}
            alt="Drive slowly and watch for children sign"
            className="mx-auto h-32 w-auto rounded-xl border border-primary/20 bg-white object-contain shadow-sm"
          />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">
            Please drive slowly and watch for children
          </p>
        </div>
      )}
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
