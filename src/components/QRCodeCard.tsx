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

    const printBody = isParkInfo
      ? `
        <div class="poster-container park-info-poster">
          <div class="park-info-header">
            <div class="park-info-brand">
              <div class="brand-mark"></div>
              <div class="brand-copy">
                <h1>Nyandungu</h1>
                <p>Eco-Park</p>
                <span>Discover · Learn · Protect</span>
              </div>
            </div>
          </div>

          <div class="park-info-banner">Welcome to Nyandungu Eco-Park</div>

          <div class="hero-section park-info-hero">
            <img src="${heroImageSrc}" alt="${sectionName}" />
          </div>

          <div class="park-info-main">
            <div class="park-info-qr-panel">
              <div class="park-info-qr-box">${qrMarkup}</div>
              <div class="park-info-scan-button"><span class="scan-icon">📍</span><span>Scan Here</span></div>
            </div>

            <div class="park-info-copy">
              <h2>Scan to See the Hidden Beauty of Nyandungu</h2>
              <p>Discover nature, wildlife, and peaceful trails inside.</p>
              <div class="park-info-fee">
                <div class="fee-title">Entry Fee for Rwandans Only</div>
                <div class="fee-price">2,000 RWF</div>
                <div class="fee-note">igiciro kiza kinogeye buri wese!</div>
              </div>
            </div>
          </div>

          <div class="park-info-discover">
            <div class="park-info-section-title">🌿 What You Will Discover 🌿</div>
            <div class="park-info-thumbs">
              <div class="park-info-thumb">
                <img src="${heroImageSrc}" alt="Beautiful Wetlands" />
                <span>Beautiful Wetlands</span>
              </div>
              <div class="park-info-thumb">
                <img src="${heroImageSrc}" alt="Birds & Wildlife" />
                <span>Birds & Wildlife</span>
              </div>
              <div class="park-info-thumb">
                <img src="${heroImageSrc}" alt="Walking & Cycling" />
                <span>Walking & Cycling</span>
              </div>
              <div class="park-info-thumb">
                <img src="${heroImageSrc}" alt="Relaxing Nature" />
                <span>Relaxing Nature</span>
              </div>
            </div>
          </div>

          <div class="park-info-prohibited">
            <div class="park-info-section-title">🚫 Prohibited Activities 🚫</div>
            <div class="park-info-prohibited-list">
              <div class="prohibited-item"><div class="prohibited-icon">🚭</div><span>No Smoking</span></div>
              <div class="prohibited-item"><div class="prohibited-icon">🍔</div><span>No Outside Food</span></div>
              <div class="prohibited-item"><div class="prohibited-icon">🥤</div><span>No Plastic Bottles</span></div>
              <div class="prohibited-item"><div class="prohibited-icon">🐕</div><span>No Pets</span></div>
            </div>
          </div>

          <div class="park-info-cta">
            <div class="park-info-cta-top">📍 Turn Your Curiosity Into a Real Experience</div>
            <div class="park-info-cta-title">Visit Nyandungu Today!</div>
            <div class="park-info-cta-bottom">Scan · Learn · Protect</div>
          </div>

          <div class="park-info-footer">Dufatanye kurinda no gutsaara pariki Nyandungu</div>
        </div>
      `
      : `
        <div class="poster-container">
          <div class="hero-section">
            <img src="${heroImageSrc}" alt="${sectionName}" />
          </div>

          <div class="content">
            <div class="header-group">
              <h1 class="park-name">Nyandungu Eco-Park</h1>
              <p class="park-subline">Discover · Learn · Protect</p>
              <div class="main-titles">
                <p class="title-en">${label.subtitle}</p>
                <p class="title-kn">${label.subtitleKn || "Sikana hano kumenya byinshi"}</p>
              </div>
            </div>

            <div class="qr-wrapper">
              ${qrMarkup}
              <p class="scan-instruction"><span class="scan-icon">📍</span><span>Scan Here / Sikana Hano</span></p>
              <p class="scan-note">For more information, scan the code above</p>
            </div>

            <div class="rules-box">
              <p class="rules-title"><span class="rule-icon">🌿</span><span>${label.tagline}</span><span class="rule-icon">🌿</span></p>
              <p class="rules-text">Respect nature · Follow park rules · Have a memorable experience!</p>
            </div>

            <p class="bottom-motto">Scan · Learn · Protect</p>
            <p class="poster-url">${url}</p>
          </div>
        </div>
      `;

    win.document.write(`
      <html>
      <head>
        <title>Print - ${sectionName}</title>
        <style>
          @page {
            size: ${printWidth} ${printHeight};
            margin: 0;
          }

          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');

          * { margin: 0; padding: 0; box-sizing: border-box; }

          html, body {
            width: ${printWidth};
            height: ${printHeight};
          }

          body {
            font-family: 'Inter', Arial, sans-serif;
            background: #f9fafb;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .poster-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: white;
            overflow: hidden;
          }

          .hero-section {
            width: 100%;
            height: 45%;
            overflow: hidden;
          }

          .hero-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 4cm 2cm 3cm;
            text-align: center;
            gap: 1.25cm;
          }

          .header-group {
            display: flex;
            flex-direction: column;
            gap: 1cm;
            align-items: center;
          }

          .park-name {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 3.5rem;
            color: #1a4d3a;
            letter-spacing: 0.8rem;
            text-transform: uppercase;
          }

          .park-subline {
            font-size: 1.3rem;
            color: #8b7d3c;
            letter-spacing: 0.45rem;
            text-transform: uppercase;
          }

          .main-titles {
            display: flex;
            flex-direction: column;
            gap: 0.5cm;
            align-items: center;
          }

          .title-en {
            font-size: 2.8rem;
            font-weight: 700;
            color: #111827;
            max-width: 50cm;
            line-height: 1.15;
          }

          .title-kn {
            font-size: 2.2rem;
            color: #4b5563;
            font-style: italic;
            line-height: 1.2;
          }

          .qr-wrapper {
            background: white;
            padding: 1.5cm;
            border: 10px solid #1a4d3a;
            border-radius: 2cm;
            margin: 1cm 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1cm;
            box-shadow: 0 18px 50px rgba(26, 77, 58, 0.12);
          }

          .qr-wrapper .qr-container {
            background: transparent;
            padding: 0;
            border-radius: 0;
            box-shadow: none;
          }

          .qr-wrapper .qr-container svg {
            width: 22cm;
            height: 22cm;
            display: block;
          }

          .scan-instruction {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1a4d3a;
            display: flex;
            align-items: center;
            gap: 0.45rem;
          }

          .scan-note {
            font-size: 1rem;
            color: #7a7a7a;
            line-height: 1.4;
          }

          .scan-icon {
            color: #ec4899;
            font-size: 1.45rem;
            line-height: 1;
          }

          .rules-box {
            background: #2f6b3b;
            color: white;
            width: min(42cm, 100%);
            display: flex;
            flex-direction: column;
            gap: 0.15cm;
            align-items: center;
            padding: 1.2cm 1.4cm;
            border-radius: 1cm;
            box-shadow: 0 10px 30px rgba(31, 95, 44, 0.18);
          }

          .rules-title {
            font-size: 1.3rem;
            font-weight: 700;
            letter-spacing: 0.08rem;
            text-transform: uppercase;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .rules-text {
            font-size: 0.92rem;
            line-height: 1.4;
            color: rgba(255, 255, 255, 0.9);
          }

          .rule-icon {
            color: #7ee787;
            font-size: 1.05rem;
            line-height: 1;
          }

          .bottom-motto {
            font-size: 1.75rem;
            color: #a87400;
            font-weight: 700;
            letter-spacing: 0.14rem;
            text-transform: uppercase;
          }

          .poster-url {
            font-size: 1rem;
            color: #1f2937;
            max-width: 48cm;
            word-break: break-word;
          }

          .park-info-poster {
            background: #1f5a3c;
          }

          .park-info-header {
            background: linear-gradient(135deg, #1e6b47 0%, #235d40 100%);
            padding: 1.3cm 1.6cm;
            color: white;
          }

          .park-info-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1cm;
          }

          .brand-mark {
            width: 2.6cm;
            height: 2.6cm;
            border-radius: 0.9cm;
            background: linear-gradient(135deg, #34d399 0%, #16a34a 55%, #3b82f6 56%, #2563eb 100%);
          }

          .brand-copy h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2.4rem;
            text-transform: uppercase;
            letter-spacing: 0.14rem;
          }

          .brand-copy p,
          .brand-copy span {
            text-transform: uppercase;
            letter-spacing: 0.18rem;
            font-size: 0.95rem;
          }

          .brand-copy span {
            display: block;
            margin-top: 0.35cm;
            text-transform: none;
            letter-spacing: 0.08rem;
          }

          .park-info-banner {
            background: #f8f6ef;
            color: #25553d;
            text-align: center;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2.6rem;
            text-transform: uppercase;
            letter-spacing: 0.08rem;
            padding: 0.9cm 1cm;
            border-bottom: 6px solid #d4a843;
          }

          .park-info-hero {
            height: 21cm;
          }

          .park-info-main {
            background: #f8f6ef;
            display: grid;
            grid-template-columns: 1fr 1.1fr;
            gap: 1.4cm;
            padding: 1.4cm;
            align-items: start;
          }

          .park-info-qr-panel {
            display: flex;
            flex-direction: column;
            gap: 0.55cm;
          }

          .park-info-qr-box {
            background: white;
            border: 5px solid #235d40;
            border-radius: 0.5cm;
            padding: 0.9cm;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          .park-info-qr-box .qr-container {
            background: transparent;
            padding: 0;
            box-shadow: none;
          }

          .park-info-qr-box .qr-container svg {
            width: 15cm;
            height: 15cm;
            display: block;
          }

          .park-info-scan-button {
            background: #235d40;
            color: white;
            border-radius: 0.2cm;
            padding: 0.45cm 0.8cm;
            font-weight: 700;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            letter-spacing: 0.06rem;
          }

          .park-info-copy h2 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2.6rem;
            color: #25553d;
            line-height: 1.15;
            margin-bottom: 0.55cm;
          }

          .park-info-copy p {
            font-size: 1.2rem;
            color: #5f6b63;
            margin-bottom: 0.8cm;
          }

          .park-info-fee {
            background: linear-gradient(135deg, #f5c542 0%, #f0ab00 100%);
            border-radius: 0.45cm;
            padding: 0.85cm 1cm;
            text-align: center;
            color: #25553d;
          }

          .fee-title {
            text-transform: uppercase;
            letter-spacing: 0.08rem;
            font-weight: 700;
            font-size: 1rem;
          }

          .fee-price {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2.7rem;
            font-weight: 700;
            margin: 0.25cm 0;
          }

          .fee-note {
            font-size: 0.9rem;
          }

          .park-info-discover {
            background: #235d40;
            color: white;
            padding: 1cm 1.2cm;
          }

          .park-info-section-title {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.08rem;
            font-weight: 700;
            font-size: 1.35rem;
            margin-bottom: 0.65cm;
          }

          .park-info-thumbs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5cm;
          }

          .park-info-thumb {
            text-align: center;
            color: white;
          }

          .park-info-thumb img {
            width: 100%;
            height: 3.6cm;
            object-fit: cover;
            border-radius: 0.18cm;
            border: 3px solid white;
            margin-bottom: 0.18cm;
          }

          .park-info-thumb span {
            font-size: 0.78rem;
            text-transform: uppercase;
          }

          .park-info-prohibited {
            background: #1f7a3f;
            color: white;
            padding: 1cm 1.2cm;
          }

          .park-info-prohibited-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5cm;
            text-align: center;
          }

          .prohibited-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.18cm;
            font-size: 0.82rem;
          }

          .prohibited-icon {
            width: 1.8cm;
            height: 1.8cm;
            border-radius: 999px;
            background: white;
            color: #1f7a3f;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.05rem;
          }

          .park-info-cta {
            background: linear-gradient(135deg, #17823f 0%, #169a44 100%);
            text-align: center;
            color: white;
            padding: 1.2cm 1cm 0.9cm;
          }

          .park-info-cta-top {
            text-transform: uppercase;
            letter-spacing: 0.08rem;
            font-size: 1rem;
            margin-bottom: 0.3cm;
          }

          .park-info-cta-title {
            font-family: 'Playfair Display', Georgia, serif;
            color: #f6d24a;
            text-transform: uppercase;
            font-size: 2rem;
            margin-bottom: 0.25cm;
          }

          .park-info-cta-bottom {
            letter-spacing: 0.08rem;
            font-size: 1rem;
          }

          .park-info-footer {
            background: #235d40;
            color: rgba(255,255,255,0.75);
            text-align: center;
            padding: 0.5cm 1cm;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        ${printBody}
        <script>
          window.onload = function () {
            setTimeout(function () { window.print(); }, 500);
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
