'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

type Article = {
    title: string;
    content: string;
    publicationDate: string; // ISO String
    image: {
        imageUrl: string;
        imageHint: string;
    };
    category: string;
}

export default function NewsArticlePage() {
    const params = useParams();
    const firestore = useFirestore();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0];

    const docRef = useMemoFirebase(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'newsArticles', id);
    }, [firestore, id]);

    const { data: article, isLoading, error } = useDoc<Article>(docRef);

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 max-w-4xl">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="aspect-video w-full mb-8" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        );
    }

    if (error) {
        return (
             <div className="container mx-auto py-10 max-w-4xl">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Could not load the article. It may have been removed or you may not have permission to view it.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!article) {
        return (
             <div className="container mx-auto py-10 max-w-4xl">
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Not Found</AlertTitle>
                    <AlertDescription>
                        The article you are looking for does not exist.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <article>
                <h1 className="text-4xl font-headline font-bold mb-2">{article.title}</h1>
                <p className="text-muted-foreground mb-4">
                    Published in <span className="font-semibold text-primary">{article.category}</span> on {new Date(article.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {article.image && (
                    <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={article.image.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            data-ai-hint={article.image.imageHint}
                            priority
                        />
                    </div>
                )}
                <div className="prose dark:prose-invert max-w-none text-lg">
                   <p>{article.content}</p>
                </div>
            </article>
        </div>
    );
}
