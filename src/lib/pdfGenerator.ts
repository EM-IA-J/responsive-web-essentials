import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Genera un PDF correctamente formateado con saltos de página.
 * @param {string} elementId - ID del elemento HTML a convertir en PDF.
 * @param {string} filename - Nombre del archivo PDF generado.
 */
export const generatePDFFromElement = async (elementId, filename) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Elemento con ID ${elementId} no encontrado`);

    // Asegurar que el elemento tenga margen suficiente en la captura
    element.style.padding = '20px';
    element.style.backgroundColor = 'white';

    const pdf = new jsPDF('p', 'mm', 'a4');

    const canvas = await html2canvas(element, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: null
    });
    const imgData = canvas.toDataURL('image/png');

    const margin = 10; // Más margen para evitar cortes en los bordes
    const imgWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight() - 2 * margin;

    while (heightLeft > 0) {
      position -= pdf.internal.pageSize.getHeight() - 2 * margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight() - 2 * margin;
    }

    pdf.save(filename);
    console.log(`PDF generado correctamente`);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
};
