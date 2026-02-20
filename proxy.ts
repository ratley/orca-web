import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If path ends in .md, serve the markdown route
  if (pathname.endsWith('.md')) {
    return NextResponse.rewrite(new URL('/md', request.url));
  }

  // Check Accept header — if text/markdown appears before text/html, serve markdown
  const accept = request.headers.get('accept') ?? '';
  const types = accept.split(',').map((t) => t.trim().split(';')[0].trim());
  const mdIndex = types.indexOf('text/markdown');
  const htmlIndex = types.indexOf('text/html');

  if (mdIndex !== -1 && (htmlIndex === -1 || mdIndex < htmlIndex)) {
    return NextResponse.rewrite(new URL('/md', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/.md'],
};
