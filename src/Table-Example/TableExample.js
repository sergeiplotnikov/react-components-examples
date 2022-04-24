import React from 'react';
import { GenericTable } from '../components';
import tableData from '../tableData1';
import { headers } from './';

export default function TableExample() {
  return (
    <GenericTable
      data={tableData}
      header={headers}
    />
  );
};