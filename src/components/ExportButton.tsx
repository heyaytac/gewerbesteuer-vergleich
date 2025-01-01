import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CityData } from "@/types/city";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useToast } from "@/components/ui/use-toast";

interface ExportButtonProps {
  cities: CityData[];
}

const ExportButton = ({ cities }: ExportButtonProps) => {
  const { toast } = useToast();

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Städtevergleich - Gewerbesteuer", 20, 20);
    
    // Add data
    doc.setFontSize(12);
    cities.forEach((city, index) => {
      const yPos = 40 + (index * 40);
      doc.text(`Stadt: ${city.name}`, 20, yPos);
      doc.text(`Bundesland: ${city.bundesland}`, 20, yPos + 10);
      doc.text(`Hebesatz: ${city.hebesatz}%`, 20, yPos + 20);
      doc.text(`Grundsteuer B: ${city.grundsteuerB}%`, 20, yPos + 30);
    });
    
    // Save the PDF
    doc.save("staedtevergleich.pdf");
    
    toast({
      title: "PDF exportiert",
      description: "Die Vergleichsdaten wurden als PDF gespeichert.",
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      cities.map(city => ({
        Stadt: city.name,
        Bundesland: city.bundesland,
        Hebesatz: `${city.hebesatz}%`,
        "Grundsteuer B": `${city.grundsteuerB}%`,
        Einwohner: city.einwohner,
      }))
    );
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Städtevergleich");
    
    // Save the file
    XLSX.writeFile(workbook, "staedtevergleich.xlsx");
    
    toast({
      title: "Excel exportiert",
      description: "Die Vergleichsdaten wurden als Excel-Datei gespeichert.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Exportieren
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportToPDF}>
          Als PDF exportieren
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          Als Excel exportieren
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;