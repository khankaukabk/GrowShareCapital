'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useFirestore, useMemoFirebase } from '@/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  publicationDate: string; // ISO String
  image: {
    imageUrl: string;
    imageHint: string;
  };
  category: string;
};

const CATEGORIES = ['Market', 'Technology', 'Energy', 'Policy'];
const PAGE_SIZE = 6;

export default function NewsPage() {
  const firestore = useFirestore();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const articlesColRef = useMemoFirebase(() => collection(firestore, 'newsArticles'), [firestore]);

  const fetchArticles = async (category: string | null, afterDoc: QueryDocumentSnapshot<DocumentData> | null = null) => {
    if (afterDoc) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      let q = query(articlesColRef, orderBy('publicationDate', 'desc'));

      if (category) {
        q = query(q, where('category', '==', category));
      }
      
      q = query(q, limit(PAGE_SIZE));

      if (afterDoc) {
        q = query(q, startAfter(afterDoc));
      }

      const snapshot = await getDocs(q);
      
      const newArticles = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as NewsArticle));
      
      setHasMore(snapshot.size === PAGE_SIZE);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      
      if (afterDoc) {
        setArticles(prev => [...prev, ...newArticles]);
      } else {
        setArticles(newArticles);
      }

    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles(selectedCategory, null);
  }, [selectedCategory, articlesColRef]);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      fetchArticles(selectedCategory, lastVisible);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setArticles([]);
    setLastVisible(null);
    setHasMore(true);
    setSelectedCategory(category);
  }

  const renderSkeletons = () => (
    Array.from({ length: PAGE_SIZE }).map((_, i) => (
      <Card key={i} className="flex flex-col">
        <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-4" />
          </div>
          <Skeleton className="h-4 w-1/4" />
        </div>
      </Card>
    ))
  );

  return (
    <div className="container mx-auto py-6">
       <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={!selectedCategory ? 'default' : 'outline'} onClick={() => handleCategoryChange(null)}>All</Button>
          {CATEGORIES.map(cat => (
              <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} onClick={() => handleCategoryChange(cat)}>
                  {cat}
              </Button>
          ))}
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {renderSkeletons()}
        </div>
      ) : error ? (
        <p className="text-red-500">Error loading articles: {error.message}</p>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No articles found for this category.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {articles.map(article => (
              <Card key={article.id} className="flex flex-col">
                 <Link href={`/news/${article.id}`} className="block">
                  <CardHeader className="p-0">
                      {article.image ? (
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={article.image.imageUrl}
                            alt={article.title}
                            fill
                            className="rounded-t-lg object-cover"
                            data-ai-hint={article.image.imageHint}
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-[16/9] w-full bg-muted rounded-t-lg" />
                      )}
                  </CardHeader>
                 </Link>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <CardTitle className="font-headline text-xl mb-2">
                       <Link href={`/news/${article.id}`}>{article.title}</Link>
                    </CardTitle>
                    <CardDescription>{article.summary}</CardDescription>
                  </div>
                  <CardFooter className="p-0 pt-4">
                    <p className="text-xs text-muted-foreground">{new Date(article.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore} disabled={isLoadingMore}>
                {isLoadingMore ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
