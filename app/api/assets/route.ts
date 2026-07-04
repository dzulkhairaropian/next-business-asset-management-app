
import { NextResponse } from 'next/server';

export async function GET() {
  const assets = [
    { tag: 'DB/NB/210101/005', code: 'A001', name: 'Vostro 3400', serial: 'SN001', status: 'Deployed', holder: 'Ibrahim', dept: 'Sales' },
    { tag: 'DB/NB/250213/006', code: 'A002', name: 'IdeaPad Slim 5', serial: 'SN002', status: 'Deployed', holder: 'Ruslan Abdul Gani', dept: 'IT' },
    { tag: 'DB/NB/250603/024', code: 'A003', name: 'IdeaPad Slim 3', serial: 'SN003', status: 'Deployed', holder: 'Marcellinus Wibowo', dept: 'Finance, Accounting & Tax' },
    { tag: 'DB/NB/250121/025', code: 'A004', name: 'Vivobook A1404Z', serial: 'SN004', status: 'Deployed', holder: 'Ferdynand Mogi Wuaten', dept: 'IT' },
    { tag: 'DB/NB/230301/002', code: 'A005', name: 'K14', serial: 'SN005', status: 'Deployed', holder: 'Reny Juniar', dept: 'Sales' },
    { tag: 'DB/NB/210901/004', code: 'A006', name: 'Latitude', serial: 'SN006', status: 'Ready to Deploy', holder: 'Kemala Mustika', dept: 'Marketing' },
    { tag: 'DB/NB/230301/001', code: 'A007', name: 'K14', serial: 'SN007', status: 'Ready to Deploy', holder: 'Diah Lita', dept: 'Sales' },
    { tag: 'DB/NB/260602/010', code: 'A008', name: 'V14', serial: 'SN008', status: 'Service', holder: 'Rahmah Adinda', dept: 'Marketing' },
    { tag: 'DB/NB/260604/011', code: 'A009', name: 'V14', serial: 'SN009', status: 'Broken', holder: 'Kaka', dept: 'Sales' },
    { tag: 'DB/NB/220401/004', code: 'A010', name: 'Vivobook Pro 14 OLED', serial: 'SN010', status: 'Defective', holder: 'Divani', dept: 'Finance, Accounting & Tax' },
  ];
  return NextResponse.json(assets);
}
