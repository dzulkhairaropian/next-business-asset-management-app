
import { NextResponse } from 'next/server';

export async function GET() {
  const consumableCheckouts = [
    { name: 'Ribbon Cartridge - LX 310', desc: 'For Printer', qty: '1 pcs', user: 'Stevani', date: 'Jun 15, 20:40' },
    { name: 'Canon BP - 790 (BK)', desc: 'For Printer', qty: '2 pcs', user: 'Stevani', date: 'Jun 03, 16:44' },
    { name: 'Canon GSeries - BH 7 (BK)', desc: 'For Printer', qty: '1 pcs', user: 'Stevani', date: 'Jun 02, 16:44' },
    { name: 'Ribbon Cartridge - LX 300+ II', desc: 'For Printer', qty: '1 pcs', user: 'Stevani', date: 'Jun 02, 16:44' },
    { name: 'Ribbon Cartridge - LQ 310', desc: 'For Printer', qty: '1 pcs', user: 'Eva Ryski', date: 'May 28, 16:45' },
  ];
  return NextResponse.json(consumableCheckouts);
}
