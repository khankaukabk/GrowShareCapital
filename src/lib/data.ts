import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string): ImagePlaceholder => {
    return PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];
};

export const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatar: findImage('avatar'),
};

export const portfolio = {
    totalValue: 125389.45,
    change: 1250.32,
    changePercent: 1.01,
    holdings: [
        { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, price: 172.25, value: 17225.00, change: 1.5, changePercent: 0.88, logoUrl: '/logos/aapl.svg' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 50, price: 155.50, value: 7775.00, change: -0.75, changePercent: -0.48, logoUrl: '/logos/googl.svg' },
        { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 75, price: 175.79, value: 13184.25, change: 2.1, changePercent: 1.21, logoUrl: '/logos/tsla.svg' },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', shares: 30, price: 180.22, value: 5406.60, change: -1.2, changePercent: -0.66, logoUrl: '/logos/amzn.svg' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 80, price: 420.72, value: 33657.60, change: 3.5, changePercent: 0.84, logoUrl: '/logos/msft.svg' },
    ]
};

export const newsArticles = [
    { id: 1, title: 'Market Hits All-Time High as Tech Stocks Rally', summary: 'The stock market surged to record highs today, driven by a powerful rally in the technology sector...', date: '2024-05-15', image: findImage('news-1') },
    { id: 2, title: 'Navigating the Future of AI in Investment Strategies', summary: 'Experts discuss how artificial intelligence is reshaping investment banking and personal finance...', date: '2024-05-14', image: findImage('news-2') },
    { id: 3, title: 'Renewable Energy Stocks: A Bright Future?', summary: 'With growing climate concerns, investments in renewable energy are becoming more attractive than ever...', date: '2024-05-13', image: findImage('news-3') },
    { id: 4, title: 'The Impact of Global Trade Policies on Your Portfolio', summary: 'Recent shifts in international trade policies could have significant effects on market stability and growth...', date: '2024-05-12', image: findImage('news-4') },
];

export const tradableStocks = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 903.67, change: 12.45, changePercent: 1.40, marketCap: '2.26T', volume: '45.7M', logoUrl: '/logos/nvda.svg' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.51, change: -1.12, changePercent: -0.56, marketCap: '568.2B', volume: '9.8M', logoUrl: '/logos/jpm.svg' },
    { symbol: 'V', name: 'Visa Inc.', price: 274.93, change: 0.88, changePercent: 0.32, marketCap: '556.4B', volume: '7.1M', logoUrl: '/logos/v.svg' },
    { symbol: 'WMT', name: 'Walmart Inc.', price: 60.18, change: 0.25, changePercent: 0.42, marketCap: '485.7B', volume: '22.3M', logoUrl: '/logos/wmt.svg' },
    ...portfolio.holdings,
].filter((stock, index, self) => index === self.findIndex((s) => s.symbol === stock.symbol));


export const marketPerformance = [
    { date: 'Jan', SP500: 4800, NASDAQ: 15000 },
    { date: 'Feb', SP500: 4850, NASDAQ: 15200 },
    { date: 'Mar', SP500: 4900, NASDAQ: 15500 },
    { date: 'Apr', SP500: 5000, NASDAQ: 15800 },
    { date: 'May', SP500: 5100, NASDAQ: 16200 },
    { date: 'Jun', SP500: 5250, NASDAQ: 16500 },
];

export const marketVolume = [
  { name: "Tech", value: 400, fill: "var(--color-chart-1)" },
  { name: "Health", value: 300, fill: "var(--color-chart-2)" },
  { name: "Finance", value: 200, fill: "var(--color-chart-3)" },
  { name: "Retail", value: 278, fill: "var(--color-chart-4)" },
  { name: "Energy", value: 189, fill: "var(--color-chart-5)" },
]
