import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { newsArticles } from "@/lib/data";

export default function NewsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {newsArticles.map(article => (
        <Card key={article.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={article.image.imageUrl}
                alt={article.title}
                fill
                className="rounded-t-lg object-cover"
                data-ai-hint={article.image.imageHint}
              />
            </div>
          </CardHeader>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
              <CardDescription>{article.summary}</CardDescription>
            </div>
            <CardFooter className="p-0 pt-4">
              <p className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
