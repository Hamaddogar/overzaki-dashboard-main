/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';

const NavigatorBar = ({
  itemsLength,
  setPageNumber,
  pageSize
}: {
  itemsLength: any;
  setPageNumber: any;
  pageSize: any;
}) => <Stack spacing={2}>
    <Pagination
      count={Math.ceil(itemsLength / pageSize)}
      renderItem={(item: any) => (
        <Button
          onClick={() =>
            setPageNumber(
              item.page == Math.ceil(itemsLength / pageSize) + 1
                ? Math.ceil(itemsLength / pageSize)
                : item.page === 0
                  ? 1
                  : item.page
            )
          }
        >
          <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
        </Button>
      )}
    />
  </Stack>;

export default NavigatorBar