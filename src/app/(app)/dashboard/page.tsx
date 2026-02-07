'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, Bar, CartesianGrid } from 'recharts';
import { marketPerformance, marketVolume, portfolio, tradableStocks } from "@/lib/data";
import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function Dashboard() {
  const topMovers = tradableStocks.slice(0, 5).sort((a,b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));

  return (
    <div className="grid flex-1 items-start gap-4 sm:gap-6">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-4xl font-headline">${portfolio.totalValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xs ${portfolio.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
              {portfolio.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>${portfolio.change.toFixed(2)} ({portfolio.changePercent.toFixed(2)}%) Today</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>S&P 500</CardDescription>
            <CardTitle className="text-4xl font-headline">5,250.30</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>+50.10 (0.97%)</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>NASDAQ</CardDescription>
            <CardTitle className="text-4xl font-headline">16,500.80</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>+150.20 (0.92%)</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Market Sentiment</CardDescription>
            <CardTitle className="text-4xl font-headline">Bullish</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              78% of analysts recommend buying.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Market Performance</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={marketPerformance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis hide={true} domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Line type="monotone" dataKey="SP500" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="NASDAQ" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Movers</CardTitle>
            <CardDescription>Biggest stock price changes today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead className="text-right">Change %</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMovers.map(stock => (
                  <TableRow key={stock.symbol}>
                    <TableCell>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{stock.name}</div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.changePercent.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
