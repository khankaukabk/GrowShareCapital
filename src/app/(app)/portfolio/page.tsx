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
import { portfolio, marketPerformance } from "@/lib/data";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";


export default function PortfolioPage() {
  return (
    <div className="grid flex-1 items-start gap-4 sm:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-4xl font-headline">${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CardTitle>
          </div>
           <div className={`text-lg font-semibold ${portfolio.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-2`}>
              {portfolio.change > 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
              <span>${portfolio.change.toFixed(2)} ({portfolio.changePercent.toFixed(2)}%) Today</span>
            </div>
        </CardHeader>
        <CardContent>
           <ChartContainer config={{}} className="h-[200px] w-full">
              <LineChart data={marketPerformance.map(d => ({...d, Portfolio: d.SP500 * (Math.random()*0.4 + 0.8) }))} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis hide={true} domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Line type="monotone" dataKey="Portfolio" name="Your Portfolio" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="SP500" name="S&P 500" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>My Holdings</CardTitle>
          <CardDescription>A list of all stocks in your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Today's Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.map(stock => (
                <TableRow key={stock.symbol}>
                  <TableCell>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                  </TableCell>
                  <TableCell className="text-right">{stock.shares}</TableCell>
                  <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">${stock.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell className={`text-right font-medium ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
