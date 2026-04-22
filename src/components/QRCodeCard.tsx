
import wetlandsImage from "@/assets/14.jpeg";
import peacockQrImage from "@/assets/1.jpeg";

import docTrails from "@/assets/doc-bamboo-trail.jpg";

import docBicycles from "@/assets/doc-bicycles.jpg";

import docBirds from "@/assets/doc-cranes.jpg";

import docPonds from "@/assets/doc-ponds.jpg";

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

  const label = sectionLabels[sectionId] || { subtitle: sectionName, subtitleKn: "", tagline: "Scan · Learn · Protect" };

  const isParkInfo = sectionId === "nyandungu-info";
  const sectionHeroImages: Record<string, string> = {
    peacock: peacockQrImage,
  };
  const cardImage = sectionHeroImages[sectionId] ?? nyandunguGate;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const win = window.open('', '_blank');
    if (!win) return;

    if (isParkInfo) {
      // Billboard style for park info
      const doPrint = (wetlandSrc: string) => {
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
              height: 220px;
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
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 1px;
              text-transform: uppercase;
            }
            .info-area {
              flex: 1;
            }
            .hidden-beauty {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 20px;
              font-weight: 700;
              color: #1a4d3a;
              line-height: 1.3;
              margin-bottom: 8px;
            }
            .discover-text {
              font-size: 12px;
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
              background: #991b1b;
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
              color: rgba(255,255,255,0.6);
              font-size: 9px;
              letter-spacing: 1px;
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
                  <img src="${docBirds}" class="thumb" onerror="this.style.display='none'" />
                  <div class="thumb-label">Birds & Wildlife</div>
                </div>
                <div>
                  <img src="${docBicycles}" class="thumb" onerror="this.style.display='none'" />
                  <div class="thumb-label">Walking & Cycling</div>
                </div>
                <div>
                  <img src="${docTrails}" class="thumb" onerror="this.style.display='none'" />
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
                  <div class="rule-text">No Outside Food</div>
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
              <p>Dufatanye kurinda no gutsaara pariki Nyandungu</p>
            </div>
          </div>
          <script>window.onload=function(){setTimeout(function(){window.print();},500);}</script>
          </body></html>
        `);
      };

      const canvas = document.createElement('canvas');
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = wetlandsImage;
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        doPrint(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = () => doPrint(wetlandsImage);
      return;
    }

    // Get the gate image as base64 for print (default style for other sections)
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = cardImage;

    const doPrint = (cardImgSrc: string) => {
      win.document.write(`
        <html><head><title>QR Code - ${sectionName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Inter',Arial,sans-serif; background:#f5f5f0; padding: 20px; }
          .card {
            width: 420px;
            background: linear-gradient(135deg, #f8f6f0 0%, #e8e4d8 100%);
            border: 3px solid #2d5a27;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            overflow: hidden;
          }
          .card-photo {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          .content {
            padding: 20px 28px 24px;
          }
          .park-name {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 20px;
            font-weight: 700;
            color: #2d5a27;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .park-tagline {
            font-size: 12px;
            color: #8b7d3c;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .divider {
            width: 60px;
            height: 2px;
            background: #d4a843;
            margin: 0 auto 12px;
          }
          .subtitle {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 2px;
          }
          .subtitle-kn {
            font-size: 13px;
            color: #666;
            font-style: italic;
            margin-bottom: 14px;
          }
          .qr-container {
            background: white;
            padding: 14px;
            border-radius: 12px;
            display: inline-block;
            margin-bottom: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .scan-label {
            font-size: 15px;
            font-weight: 600;
            color: #2d5a27;
            margin-bottom: 2px;
          }
          .scan-label-kn {
            font-size: 12px;
            color: #666;
            margin-bottom: 12px;
          }
          .rules-bar {
            background: #2d5a27;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .rules-bar h4 {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .rules-bar p {
            font-size: 11px;
            opacity: 0.9;
          }
          .tagline-bottom {
            font-size: 14px;
            font-weight: 600;
            color: #d4a843;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .url {
            font-size: 10px;
            color: #999;
            word-break: break-all;
            margin-top: 6px;
          }
        </style></head><body>
        <div class="card">
          <img src="${cardImgSrc}" class="card-photo" alt="${sectionName}" />
          <div class="content">
            <div class="park-name">Nyandungu Eco-Park</div>
            <div class="park-tagline">Discover · Learn · Protect</div>
            <div class="divider"></div>
            <div class="subtitle">${label.subtitle}</div>
            <div class="subtitle-kn">${label.subtitleKn || "Sikana hano kumenya byinshi"}</div>
            ${printContent.innerHTML}
            <div class="scan-label">📍 Scan Here / Sikana Hano</div>
            <div class="scan-label-kn">For more information, scan the code above</div>
            <div class="rules-bar">
              <h4>🌿 ${label.tagline} 🌿</h4>
              <p>Respect nature · Follow park rules · Have a memorable experience!</p>
            </div>
            <div class="tagline-bottom">Scan · Learn · Protect</div>
            <div class="url">${url}</div>
          </div>
        </div>
        <script>window.onload=function(){setTimeout(function(){window.print();},500);}</script>
        </body></html>
      `);
    };

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      doPrint(canvas.toDataURL('image/jpeg'));
    };
    img.onerror = () => doPrint(cardImage);
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
        {isParkInfo && (
          <p className="text-sm text-primary font-semibold mt-1">Entry: 2,000 RWF (Rwandans)</p>
        )}
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
