import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Typography,
} from '@mui/material'
import { Record } from '../../types/data'

type NetWorthBreakdownTableProps = {
  record: Record
  assetsOrLiabilities: 'assets' | 'liabilities'
}

function NetWorthBreakdownTable({
  record,
  assetsOrLiabilities,
}: NetWorthBreakdownTableProps) {
  const items = record[assetsOrLiabilities]
  const tableTitle =
    assetsOrLiabilities.charAt(0).toUpperCase() + assetsOrLiabilities.slice(1)

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        {tableTitle}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">${item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default NetWorthBreakdownTable
