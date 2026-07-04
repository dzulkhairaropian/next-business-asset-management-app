
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = [
    { label: "Notebook", value: 45, color: "#3b82f6" },
    { label: "Desktop", value: 25, color: "#10b981" },
    { label: "Printer", value: 15, color: "#f97316" },
    { label: "Accessories", value: 15, color: "#a855f7" },
  ];
  return NextResponse.json(categories);
}
