import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Printer, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import nyandunguGate from "@/assets/nyandungu-gate.jpg";

interface QRCodeCardProps {
  sectionId: string;
  sectionName: string;
  baseUrl: string;
}

const QRCodeCard = ({ sectionId, sectionName, baseUrl }: QRCodeCardProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const url = `${baseUrl}/section/${sectionId}`;

  const sectionLabels: Record<string, { subtitle: string; subtitleKn: string; tagline: string }> = {
    "nyandungu-info": {
      subtitle: "Scan to See the Hidden Beauty of Nyandungu",
      subtitleKn: "Sikana hano kumenya byinshi",
      tagline: "Turn Your Curiosity Into a Real Experience",
    },
    peacock: {
      subtitle: "Discover the Beauty of the Peacock",
      subtitleKn: "Vumbura ubwiza bw'inkanga",
      tagline: "Please Respect Our Peafowls",
    },
    "top-ten": {
      subtitle: "Scan to Know Top Ten Good Places",
      subtitleKn: "Sikana umenye ahantu cumi heza cyane",
      tagline: "Enjoy Nature, Follow Park Rules",
    },
    trails: {
      subtitle: "Welcome to Umudobori Lane",
      subtitleKn: "Murakaza neza muri Umudobori Lane",
      tagline: "Scan to Know Exciting Plants and Birds",
    },
  };

  const label = sectionLabels[sectionId] || { subtitle: sectionName, subtitleKn: "", tagline: "Scan · Learn · Protect" };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const win = window.open('', '_blank');
    if (!win) return;

    // Get the gate image as base64 for print
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = nyandunguGate;

    const doPrint = (gateImgSrc: string) => {
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
          .content {
            padding: 20px 28px 24px;
          }
          .park-name {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 18px;
            font-weight: 700;
            color: #2d5a27;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .park-tagline {
            font-size: 10px;
            color: #8b7d3c;
            letter-spacing: 3px;
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
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 2px;
          }
          .subtitle-kn {
            font-size: 11px;
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
            font-size: 13px;
            font-weight: 600;
            color: #2d5a27;
            margin-bottom: 2px;
          }
          .scan-label-kn {
            font-size: 11px;
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
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .rules-bar p {
            font-size: 10px;
            opacity: 0.9;
          }
          .tagline-bottom {
            font-size: 12px;
            font-weight: 600;
            color: #d4a843;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .url {
            font-size: 9px;
            color: #999;
            word-break: break-all;
            margin-top: 6px;
          }
        </style></head><body>
        <div class="card">
          <img src="${gateImgSrc}" class="gate-photo" alt="Nyandungu Gate" />
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
    img.onerror = () => doPrint(nyandunguGate);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border flex flex-col items-center gap-4">
      <img src={nyandunguGate} alt="Nyandungu Gate" className="w-full h-32 object-cover" />
      <div className="px-6 w-full text-center">
        <p className="text-xs font-semibold text-primary tracking-widest uppercase">Nyandungu Eco-Park</p>
        <h3 className="font-heading font-semibold text-foreground mt-1">{sectionName}</h3>
        <p className="text-xs text-muted-foreground mt-1">{label.subtitle}</p>
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
