'use client';

import Link from "next/link";
import Image from "next/image";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, LandPlot, Sprout, Stethoscope } from "lucide-react";
import { leadership, partners, newsArticles } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HomePage() {
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-background');
  const realEstateImg = PlaceHolderImages.find(img => img.id === 'sector-real-estate');
  const agricultureImg = PlaceHolderImages.find(img => img.id === 'sector-agriculture');
  const healthcareImg = PlaceHolderImages.find(img => img.id === 'sector-healthcare');

  const sectors = [
    { name: 'Real Estate', icon: LandPlot, image: realEstateImg, description: "Investing in tangible assets that build communities and generate long-term value." },
    { name: 'Agriculture', icon: Sprout, image: agricultureImg, description: "Cultivating the future of food through sustainable and innovative farming technologies." },
    { name: 'Healthcare', icon: Stethoscope, image: healthcareImg, description: "Funding breakthroughs in medical science and wellness for a healthier tomorrow." },
  ];
  
  const recentArticles = newsArticles.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full">
          {heroBg && (
            <Image
              src={heroBg.imageUrl}
              alt={heroBg.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroBg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="relative">
                <div className="flex justify-center mb-8">
                    <Logo className="[&>span]:text-5xl [&>svg]:w-16 [&>svg]:h-16" />
                </div>
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                The Future of Collaborative Investment
              </h1>
              <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl">
                GrowShare Capital empowers you to invest in tangible assets and innovative ventures that shape a better future.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/dashboard">Enter App</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Thesis Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Investment Thesis</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                We focus on three core sectors with high growth potential and lasting impact.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {sectors.map((sector) => (
                <Card key={sector.name} className="flex flex-col overflow-hidden">
                  {sector.image && (
                     <div className="relative aspect-[4/3] w-full">
                        <Image src={sector.image.imageUrl} alt={sector.name} fill className="object-cover" data-ai-hint={sector.image.imageHint} />
                    </div>
                  )}
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <sector.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">{sector.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{sector.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-muted py-16 md:py-24 lg:py-32">
            <div className="container grid items-center gap-8 md:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Philosophy</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                        At GrowShare Capital, we believe in the power of collective investment to drive meaningful change. Our philosophy is rooted in transparency, sustainability, and long-term value creation. We provide our members with exclusive access to curated opportunities in sectors that are not just profitable, but also pivotal for a better future.
                    </p>
                     <p className="mt-4 text-muted-foreground md:text-lg">
                        We bridge the gap between traditional finance and impactful ventures, making it possible for everyone to be part of the growth story.
                    </p>
                </div>
                <div className="relative h-80 w-full rounded-lg bg-card p-6 shadow-md flex flex-col justify-center">
                    <p className="text-2xl font-headline italic">"Investing is not just about growing capital, but about cultivating a future we all want to live in."</p>
                    <p className="mt-4 text-right font-semibold">&mdash; The GrowShare Team</p>
                </div>
            </div>
        </section>

        {/* Journal Section */}
        <section className="py-16 md:py-24 lg:py-32">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">From the Journal</h2>
                        <p className="mt-2 text-muted-foreground md:text-lg">The latest insights from our team and the market.</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/news">View All <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {recentArticles.map(article => (
                         <Card key={article.id} className="flex flex-col">
                            <CardHeader className="p-0">
                                <Link href="/news">
                                    <div className="relative aspect-[16/9] w-full">
                                    <Image
                                        src={article.image.imageUrl}
                                        alt={article.title}
                                        fill
                                        className="rounded-t-lg object-cover"
                                        data-ai-hint={article.image.imageHint}
                                    />
                                    </div>
                                </Link>
                            </CardHeader>
                            <div className="flex flex-1 flex-col justify-between p-6">
                                <div>
                                <CardTitle className="font-headline text-lg mb-2 leading-tight">
                                    <Link href="/news">{article.title}</Link>
                                </CardTitle>
                                <CardDescription className="text-sm">{article.summary}</CardDescription>
                                </div>
                                <div className="pt-4">
                                <p className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Partners Section */}
        <section className="bg-muted py-16 md:py-24 lg:py-32">
            <div className="container">
                <h2 className="text-center text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Partners</h2>
                <p className="mt-4 text-center text-muted-foreground md:text-lg">We collaborate with industry leaders to maximize impact.</p>
                <div className="mt-12 grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-4">
                    {partners.map(partner => (
                        <div key={partner.name} className="flex justify-center items-center">
                            <Image 
                                src={partner.logo.imageUrl} 
                                alt={partner.name}
                                width={160}
                                height={40}
                                className="aspect-[4/1] object-contain grayscale hover:grayscale-0 transition-all"
                                data-ai-hint={partner.logo.imageHint}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Leadership</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Meet the experienced team guiding our vision.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((leader) => (
                <Card key={leader.name} className="text-center">
                    <CardContent className="p-6">
                        <Avatar className="mx-auto h-24 w-24 mb-4">
                            <AvatarImage src={leader.image.imageUrl} alt={leader.name} data-ai-hint={leader.image.imageHint} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold">{leader.name}</h3>
                        <p className="text-primary">{leader.role}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
