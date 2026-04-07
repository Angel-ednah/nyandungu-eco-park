import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Printer, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeCardProps {
  sectionId: string;
  sectionName: string;
  baseUrl: string;
}

const QRCodeCard = ({ sectionId, sectionName, baseUrl }: QRCodeCardProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const url = `${baseUrl}/section/${sectionId}`;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>QR Code - ${sectionName}</title>
      <style>
        body { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:Arial,sans-serif; margin:0; }
        h2 { margin-bottom:8px; font-size:20px; }
        p { color:#666; font-size:12px; margin:4px 0; }
        .url { font-size:11px; word-break:break-all; max-width:300px; text-align:center; }
      </style></head><body>
      <h2>Nyandungu Eco-Park</h2>
      <p>${sectionName}</p>
      ${printContent.innerHTML}
      <p class="url">${url}</p>
      <p>Scan · Learn · Protect</p>
      <script>window.print();window.close();</script>
      </body></html>
    `);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border flex flex-col items-center gap-4">
      <h3 className="font-heading font-semibold text-foreground text-center">{sectionName}</h3>
      <div ref={printRef} className="bg-card p-4 rounded-lg">
        <QRCodeSVG value={url} size={180} level="H" includeMargin />
      </div>
      <p className="text-xs text-muted-foreground break-all text-center max-w-[220px]">{url}</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-1 h-4 w-4" /> Print
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(url)}>
          <LinkIcon className="mr-1 h-4 w-4" /> Copy Link
        </Button>
      </div>
    </div>
  );
};

export default QRCodeCard;
