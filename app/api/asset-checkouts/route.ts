
import { NextResponse } from 'next/server';

export async function GET() {
  const checkouts = [
    { tag: 'DB/NB/210101/005', name: 'Vostro 3400', qty: '1 pcs', user: 'Ibrahim', dept: 'Sales', date: 'Jun 17, 07:00' },
    { tag: 'DB/NB/250213/006', name: 'IdeaPad Slim 5', qty: '1 pcs', user: 'Ruslan Abdul Gani', dept: 'IT', date: 'Jun 12, 15:47' },
    { tag: 'DB/NB/250603/024', name: 'IdeaPad Slim 3', qty: '1 pcs', user: 'Marcellinus Wibowo', dept: 'Finance, Accounting & Tax', date: 'Jun 12, 15:46' },
    { tag: 'DB/NB/250121/025', name: 'Vivobook A1404Z', qty: '1 pcs', user: 'Ferdynand Mogi Wuaten', dept: 'IT', date: 'Jun 12, 15:45' },
    { tag: 'DB/NB/230301/002', name: 'K14', qty: '1 pcs', user: 'Reny Juniar', dept: 'Sales', date: 'Jun 09, 21:37' },
  ];
  return NextResponse.json(checkouts);
}
