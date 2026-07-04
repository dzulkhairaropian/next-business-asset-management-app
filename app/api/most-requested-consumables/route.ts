
import { NextResponse } from 'next/server';

export async function GET() {
  const mostRequestedConsumables = [
    { label: "Ribbon Cartridge", value: 30, color: "#ef4444" },
    { label: "Canon BP", value: 25, color: "#f97316" },
    { label: "Epson BP", value: 20, color: "#eab308" },
    { label: "Toner", value: 15, color: "#84cc16" },
    { label: "Mouse Wireless", value: 10, color: "#22c55e" },
  ];
  return NextResponse.json(mostRequestedConsumables);
}
