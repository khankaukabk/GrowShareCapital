import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgImage = PlaceHolderImages.find(img => img.id === 'auth-background');
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex items-center justify-center py-12">
        {children}
      </div>
      <div className="hidden bg-muted lg:block">
        {bgImage && (
             <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                width="1920"
                height="1080"
                className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                data-ai-hint={bgImage.imageHint}
            />
        )}
      </div>
    </div>
  );
}
