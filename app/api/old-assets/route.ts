
import { NextResponse } from 'next/server';

export async function GET() {
  const oldAssets = [
    { tag: 'DB/NB/201201/001', name: 'Inspiron 3000', qty: '1 pcs', user: 'Dian Indriani', dept: 'Supply Chain & Logistics', date: 'Jan 01, 07:07' },
  ];
  return NextResponse.json(oldAssets);
}
