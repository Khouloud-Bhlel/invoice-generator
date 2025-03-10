import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { fileName, content } = await request.json();
    
    // Convert the array back to Uint8Array
    const uint8Array = new Uint8Array(content);
    
    // Create the full path
    const filePath = path.join(process.cwd(), 'public', 'invoices', fileName);
    
    // Write the file
    await writeFile(filePath, uint8Array);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving invoice:', error);
    return NextResponse.json(
      { error: 'Failed to save invoice' },
      { status: 500 }
    );
  }
}