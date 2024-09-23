import { useEffect, useState, useMemo } from 'react';
import type { Schema } from '../../amplify/data/resource';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type QuestTableProps = {
  client: any;
};

interface IQuest {
  id: string;
  description: string;
  xp: number;
  karma: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IQuest;
  label: string;
  numeric: boolean;
}

// Describe the head columns
const headCells: readonly HeadCell[] = [
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'xp',
    numeric: true,
    disablePadding: false,
    label: 'XP',
  },
  {
    id: 'karma',
    numeric: true,
    disablePadding: false,
    label: 'Karma',
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IQuest
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IQuest) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Table des quêtes
      </Typography>
    </Toolbar>
  );
};

type Quest = Schema['Quest']['type'];

const QuestTable: React.FC<QuestTableProps> = ({ client }) => {
  const [quests, setQuests] = useState<Array<IQuest>>([]);
  const [loading, setLoading] = useState(true);

  // Table functions states
  const [order, setOrder] = useState<Order>('asc'); // Default sorted order
  const [orderBy, setOrderBy] = useState<keyof IQuest>('xp'); // Default sorted column
  const [page, setPage] = useState(0); // Default page number
  const [rowsPerPage, setRowsPerPage] = useState(25); // Default row per page showing

  // Table
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IQuest
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      [...quests]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, quests]
  );

  // Quests
  const loadQuests = async () => {
    const { data: list } = await client.models.Quest.list();
    const questsList: Array<IQuest> = list.map((quest: Quest) => {
      return {
        id: quest.id,
        description: quest.description,
        xp: quest.xp,
        karma: quest.karma,
      } as IQuest;
    });
    setQuests(questsList);
    setLoading(false);
  };

  useEffect(() => {
    loadQuests();
  }, []);

  if (loading) {
    return <div>Chargement des quêtes</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={quests.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.xp}</TableCell>
                    <TableCell align="right">{row.karma}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={quests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default QuestTable;
