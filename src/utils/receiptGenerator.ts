import { Appointment } from '../data/barbershopData';

/**
 * Generates an authentic high-resolution PNG receipt matching the exact
 * Variation 3 editorial background design (warm parchment #f8f7f4, deep ink #1c1c1c,
 * antique brass #876d3e, Cormorant Garamond typography, and handcrafted layout).
 */
export async function generateReceiptCanvas(appointment: Appointment): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  // High-DPI canvas (900 x 1280)
  const width = 900;
  const height = 1280;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not initialize 2D canvas context');

  // Ensure fonts are loaded if possible
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }
  } catch (e) {
    // Continue with system fallbacks
  }

  // 1. Warm Editorial Parchment Background
  ctx.fillStyle = '#f8f7f4';
  ctx.fillRect(0, 0, width, height);

  // Subtle paper texture accent
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillRect(20, 20, width - 40, height - 40);

  // 2. Double Framing Border (Variation 3 aesthetic)
  // Outer hairline border
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Inner antique brass hairline border
  ctx.strokeStyle = 'rgba(135, 109, 62, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, width - 76, height - 76);

  // Corner decorative marks
  const drawCornerFlourish = (x: number, y: number, dirX: number, dirY: number) => {
    ctx.strokeStyle = '#876d3e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + dirY * 14);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dirX * 14, y);
    ctx.stroke();
  };
  drawCornerFlourish(44, 44, 1, 1);
  drawCornerFlourish(width - 44, 44, -1, 1);
  drawCornerFlourish(44, height - 44, 1, -1);
  drawCornerFlourish(width - 44, height - 44, -1, -1);

  // 3. Header: Brand Wordmark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'italic 600 48px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Heritage & Blade', width / 2, 100);

  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.letterSpacing = '0.22em';
  ctx.fillText('CRAFT GROOMING & APOTHECARY · EST. 2018', width / 2, 126);

  ctx.fillStyle = 'rgba(28, 28, 28, 0.55)';
  ctx.font = '400 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('418 St. Clair Ave, Suite 4 · Midtown District, Toronto · (555) 234-5678', width / 2, 146);

  // Editorial Hairline
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 168);
  ctx.lineTo(width - 60, 168);
  ctx.stroke();

  // 4. Receipt Subtitle & Booking Reference Badge
  ctx.textAlign = 'left';
  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('OFFICIAL CHAIR RESERVATION & RECEIPT', 64, 204);

  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'bold 34px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`Pass #${appointment.bookingRef}`, 64, 242);

  // Status Badge on right
  const badgeWidth = 120;
  const badgeX = width - 64 - badgeWidth;
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(badgeX, 212, badgeWidth, 32);
  ctx.fillStyle = '#f8f7f4';
  ctx.textAlign = 'center';
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('CONFIRMED', badgeX + badgeWidth / 2, 232);

  // 5. Two-Column Patron & Appointment Ledger Grid
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.08)';
  ctx.lineWidth = 1;
  ctx.fillRect(60, 270, width - 120, 175);
  ctx.strokeRect(60, 270, width - 120, 175);

  // Column 1: Patron Info
  ctx.textAlign = 'left';
  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('PATRON DETAILS', 84, 300);

  ctx.fillStyle = '#1c1c1c';
  ctx.font = '600 18px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(appointment.clientName, 84, 326);

  ctx.fillStyle = 'rgba(28, 28, 28, 0.7)';
  ctx.font = '400 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`Phone: ${appointment.clientPhone}`, 84, 352);
  ctx.fillText(`Email: ${appointment.clientEmail}`, 84, 374);

  ctx.fillStyle = 'rgba(28, 28, 28, 0.5)';
  ctx.font = '400 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`Issued: ${new Date(appointment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, 84, 420);

  // Divider between columns
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.08)';
  ctx.beginPath();
  ctx.moveTo(width / 2 + 10, 285);
  ctx.lineTo(width / 2 + 10, 430);
  ctx.stroke();

  // Column 2: Chair Session Details
  const col2X = width / 2 + 36;
  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('CHAIR & CRAFTSMAN', col2X, 300);

  ctx.fillStyle = '#1c1c1c';
  ctx.font = '600 18px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(appointment.barber.name, col2X, 326);

  ctx.fillStyle = 'rgba(28, 28, 28, 0.7)';
  ctx.font = '400 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(appointment.barber.title, col2X, 348);

  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`Date: ${appointment.date}`, col2X, 380);

  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'bold 16px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`Arrival Time: ${appointment.timeSlot}`, col2X, 404);

  // 6. Itemized Services Table
  const tableStartY = 475;
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(60, tableStartY, width - 120, 36);

  ctx.fillStyle = '#f8f7f4';
  ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('SELECTED TREATMENT / DESCRIPTION', 80, tableStartY + 22);
  ctx.textAlign = 'center';
  ctx.fillText('DURATION', width - 230, tableStartY + 22);
  ctx.textAlign = 'right';
  ctx.fillText('AMOUNT', width - 84, tableStartY + 22);

  let currentY = tableStartY + 36;

  // Primary service row
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(60, currentY, width - 120, 68);
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.08)';
  ctx.strokeRect(60, currentY, width - 120, 68);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#1c1c1c';
  ctx.font = '600 17px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(appointment.service.name, 80, currentY + 30);

  ctx.fillStyle = 'rgba(28, 28, 28, 0.55)';
  ctx.font = '400 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(appointment.service.description.slice(0, 85) + '...', 80, currentY + 50);

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(28, 28, 28, 0.8)';
  ctx.font = '500 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`${appointment.service.durationMinutes} mins`, width - 230, currentY + 38);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'bold 16px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`$${appointment.service.price.toFixed(2)}`, width - 84, currentY + 38);

  currentY += 68;

  // Add-on rows (if any)
  if (appointment.addons && appointment.addons.length > 0) {
    for (const addon of appointment.addons) {
      ctx.fillStyle = '#faf9f6';
      ctx.fillRect(60, currentY, width - 120, 48);
      ctx.strokeStyle = 'rgba(28, 28, 28, 0.08)';
      ctx.strokeRect(60, currentY, width - 120, 48);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#1c1c1c';
      ctx.font = '500 14px "Cormorant Garamond", Georgia, serif';
      ctx.fillText(`+ ${addon.name}`, 80, currentY + 28);

      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(28, 28, 28, 0.7)';
      ctx.font = '400 12px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(`+${addon.durationMinutes} mins`, width - 230, currentY + 28);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#876d3e';
      ctx.font = '600 15px "Cormorant Garamond", Georgia, serif';
      ctx.fillText(`+$${addon.price.toFixed(2)}`, width - 84, currentY + 28);

      currentY += 48;
    }
  }

  // Total Summary Box
  const summaryBoxY = currentY + 16;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#876d3e';
  ctx.lineWidth = 1.5;
  ctx.fillRect(60, summaryBoxY, width - 120, 80);
  ctx.strokeRect(60, summaryBoxY, width - 120, 80);

  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(28, 28, 28, 0.7)';
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('PAYMENT METHOD', 84, summaryBoxY + 34);
  ctx.fillStyle = '#1c1c1c';
  ctx.font = '400 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('Payable in Chair (Cash, Debit, or Credit)', 84, summaryBoxY + 54);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('TOTAL DUE IN CHAIR', width - 84, summaryBoxY + 34);

  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'bold 36px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`$${appointment.totalPrice.toFixed(2)}`, width - 84, summaryBoxY + 66);

  // 7. Client Special Notes (if present)
  let notesY = summaryBoxY + 105;
  if (appointment.notes) {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = 'rgba(28, 28, 28, 0.08)';
    ctx.lineWidth = 1;
    ctx.fillRect(60, notesY, width - 120, 60);
    ctx.strokeRect(60, notesY, width - 120, 60);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#876d3e';
    ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('PATRON SPECIAL REQUESTS', 80, notesY + 22);

    ctx.fillStyle = '#1c1c1c';
    ctx.font = 'italic 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(`"${appointment.notes}"`, 80, notesY + 44);

    notesY += 75;
  }

  // 8. Policy & Studio Etiquette
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(28, 28, 28, 0.7)';
  ctx.font = '400 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('· Chair Etiquette: Please arrive 5 minutes prior to appointment time.', 64, notesY + 20);
  ctx.fillText('· Single-Chair Guarantee: Your barber is reserved exclusively for your session.', 64, notesY + 38);
  ctx.fillText('· Rescheduling / Inquiries: Call directly at (555) 234-5678 or present this pass.', 64, notesY + 56);

  // 9. Digital Verification Seal Stamp (Circular artisanal stamp)
  const sealCenterX = width - 140;
  const sealCenterY = notesY + 40;
  const sealRadius = 45;

  ctx.strokeStyle = '#876d3e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealCenterX, sealCenterY, sealRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.arc(sealCenterX, sealCenterY, sealRadius - 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#876d3e';
  ctx.font = 'bold 8px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('HERITAGE & BLADE', sealCenterX, sealCenterY - 14);
  ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('★ VERIFIED ★', sealCenterX, sealCenterY);
  ctx.font = '600 8px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('CHAIR PASS', sealCenterX, sealCenterY + 14);

  // 10. Bottom Editorial Line & Copyright
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, height - 70);
  ctx.lineTo(width - 60, height - 70);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(28, 28, 28, 0.45)';
  ctx.font = '400 10px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`© ${new Date().getFullYear()} HERITAGE & BLADE CRAFT BARBERSHOP · MIDTOWN DISTRICT, TORONTO`, width / 2, height - 48);

  return canvas;
}

/**
 * Triggers a download of the appointment receipt in pristine PNG format.
 */
export async function downloadReceiptPng(appointment: Appointment): Promise<void> {
  const canvas = await generateReceiptCanvas(appointment);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve();
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HeritageBlade-Receipt-${appointment.bookingRef}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, 'image/png');
  });
}
