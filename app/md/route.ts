import { PAGE_MARKDOWN } from '../lib/pageMarkdown';

export async function GET() {
  return new Response(PAGE_MARKDOWN, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
