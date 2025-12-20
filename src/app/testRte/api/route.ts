import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.json();

  // Ghi file vào app/testRte/data/content.json
  const filePath = path.join(process.cwd(), 'src', 'app', 'testRte', 'data', 'content.json');

  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'testRte', 'data', 'content.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  return new Response(content, { status: 200 });
}
