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
import { Button } from "@/components/ui/button";
import { tradableStocks } from "@/lib/data";

export default function TradePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Stocks</CardTitle>
        <CardDescription>Buy and sell shares from the world's leading companies.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradableStocks.map(stock => (
              <TableRow key={stock.symbol}>
                <TableCell>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                </TableCell>
                <TableCell className="text-right font-medium">${stock.price.toFixed(2)}</TableCell>
                <TableCell className={`text-right font-medium ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.changePercent.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">{stock.marketCap}</TableCell>
                <TableCell className="text-right">{stock.volume}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20 hover:text-green-700">Buy</Button>
                    <Button variant="outline" size="sm" className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20 hover:text-red-700">Sell</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
