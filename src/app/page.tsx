import type { Metadata } from 'next';
import HomeClientPage from './home-client';
import type { Story } from '@/app/news/stories-data';

// Force dynamic rendering to prevent static build attempts on the server
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'GrowShare Capital | High-Yield, Principled Investments',
  description: 'A premier American private equity and impact investment platform building resilient communities through intelligent, ethical, and high-yield investments in real estate, agriculture, and healthcare.',
};

export default function Page() {
  // Pass an empty array; the client component handles the fetching securely.
  const stories: Story[] = [];
  return <HomeClientPage initialStories={stories} />;
}