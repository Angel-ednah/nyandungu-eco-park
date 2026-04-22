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
            font-size: 1.5rem;
            font-weight: 700;
            color: #1a4d3a;
            text-transform: uppercase;
            letter-spacing: 0.4rem;
          }

          .scan-note {
            font-size: 1.15rem;
            color: #6b7280;
            line-height: 1.4;
          }

          .rules-box {
            background: #1f5f2c;
            color: white;
            padding: 1.2cm 1.4cm;
            border-radius: 1cm;
            width: min(42cm, 100%);
            display: flex;
            flex-direction: column;
            gap: 0.35cm;
            box-shadow: 0 10px 30px rgba(31, 95, 44, 0.18);
          }

          .rules-title {
            font-size: 1.55rem;
            font-weight: 700;
            letter-spacing: 0.08rem;
            text-transform: uppercase;
          }

          .rules-text {
            font-size: 1.2rem;
            opacity: 0.95;
            line-height: 1.4;
          }

          .footer-tagline {
            font-size: 1.8rem;
            color: #1a4d3a;
            border-top: 4px solid #d4a843;
            padding-top: 1cm;
            width: 40%;
            font-weight: 600;
            line-height: 1.3;
          }

          .poster-url {
            font-size: 1.2rem;
            color: #6b7280;
            max-width: 48cm;
            word-break: break-word;
          }
        </style>
      </head>
      <body>
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
              <p class="scan-instruction">Scan Here / Sikana Hano</p>
              <p class="scan-note">For more information, scan the code above</p>
            </div>

            <div class="rules-box">
              <p class="rules-title">${label.tagline}</p>
              <p class="rules-text">Respect nature · Follow park rules · Have a memorable experience!</p>
            </div>

            <p class="footer-tagline">${label.tagline}</p>
            <p class="poster-url">${url}</p>
          </div>
        </div>

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
