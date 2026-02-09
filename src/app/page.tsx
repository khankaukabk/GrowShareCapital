
import type { Metadata } from 'next';
import HomeClientPage from './home-client';
import type { Story } from '@/app/news/stories-data';

// The homepage is now fully client-rendered to bypass server permission issues.
// We pass an empty array and let the client component handle fetching.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'GrowShare Capital | High-Yield, Principled Investments',
  description: 'A premier American private equity and impact investment platform building resilient communities through intelligent, ethical, and high-yield investments in real estate, agriculture, and healthcare.',
};


export default async function Page() {
    // Pass an empty array; the client will fetch the data.
    const stories: Story[] = [];

    return <HomeClientPage initialStories={stories} />;
}
