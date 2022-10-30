import type { FC } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
// TODO: add tanstack helper
export interface TableInterface {
  data: Record<string, any> | Record<string, any>[];
}
export const Table: FC<TableInterface> = ({ data }) => {
  console.info("\n\n got table data", data);

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Header Cell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>TableCell</TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
