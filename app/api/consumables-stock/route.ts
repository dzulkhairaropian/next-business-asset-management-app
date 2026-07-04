
import { NextResponse } from 'next/server';

export async function GET() {
  const consumablesStock = [
    { name: 'Canon BP - 790 (BK)', desc: 'For Printer', qty: '13 items', status: 'In Stock' },
    { name: 'Canon BP - 790 (CYAN)', desc: 'For Printer', qty: '13 items', status: 'In Stock' },
    { name: 'Epson BP - 003 (BK)', desc: 'For Printer', qty: '12 items', status: 'In Stock' },
    { name: 'Canon BP - 790 (MAGENTA)', desc: 'For Printer', qty: '12 items', status: 'In Stock' },
    { name: 'Canon BP - 790 (YELLOW)', desc: 'For Printer', qty: '11 items', status: 'In Stock' },
  ];
  return NextResponse.json(consumablesStock);
}
