import type { Metadata } from 'next';
import NewsClientPage from './client-page';
import type { Story } from '@/app/news/stories-data';

// CRITICAL: Ensures the page is rendered on the client, avoiding server-side data fetching errors.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Newsroom | GrowShare Capital',
  description: 'Our latest company news, announcements, and press releases.',
  openGraph: {
    title: 'Newsroom | GrowShare Capital',
    description: 'The latest updates and insights from GrowShare Capital.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
        width: 1600,
        height: 900,
        alt: 'News and reports from GrowShare Capital.',
      },
    ],
  },
};

export default function NewsPage() {
  // Pass an empty array; the client component will now fetch its own data.
  const initialStories: Story[] = [];
  return <NewsClientPage initialStories={initialStories} />;
}