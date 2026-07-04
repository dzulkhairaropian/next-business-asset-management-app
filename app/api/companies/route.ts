import { NextResponse } from 'next/server'

// import prisma from '@/lib/prisma'

const mockCompanies = [
  { id: 1, name: 'PT. Digital Bintang Cemerlang', created_at: new Date(), updated_at: new Date() },
  { id: 2, name: 'PT. Bintang Cemerlang', created_at: new Date(), updated_at: new Date() },
]

export async function GET() {
  try {
    // const companies = await prisma.company.findMany()
    return NextResponse.json(mockCompanies)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'An error occurred while fetching companies.' }, { status: 500 })
  }
}
