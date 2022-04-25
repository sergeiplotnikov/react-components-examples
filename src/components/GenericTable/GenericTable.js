import React from 'react';

export default function GenericTable(props) {
  if (props.groupBy) return <>{props.data.reduce(getUniqueValues(props.groupBy), []).map(renderGroup(props.data, props.header, props.groupBy))}</>;
  return renderTable(props.data, props.header);
};

function renderGroup(tableData, tableHeader, groupBy) {
  return function(groupingValue) {
    return renderTable(tableData.filter(x => getPropertyFromObject(x, groupBy.split('.')) === groupingValue), tableHeader);
  }
}

function getUniqueValues(groupBy) {
  return function (acc, item) {
    if (acc.includes(item[groupBy])) return acc;
    return [...acc, item[groupBy]];
  };
};

function renderColumnHeader(columnHeader) {
  return <th>{columnHeader.title}</th>;
};

function getPropertyFromObject(obj, propertyPath) {
  if (propertyPath.length === 0) return obj;
  return getPropertyFromObject(obj[propertyPath[0]], propertyPath.slice(1));
};

function renderCellByHeader(dataRow) {
  return function (tableHeader) {
    return (
      <td>{getPropertyFromObject(dataRow, tableHeader.field.split('.'))}</td>
    );
  };
};

function renderTableRow(tableHeader) {
  return function (dataRow) {
    return <tr>{tableHeader.map(renderCellByHeader(dataRow))}</tr>;
  };
};

function renderTable(tableData, tableHeader) {
  return (
    <table border="1" style={{width: '100%'}}>
      <thead>{tableHeader.map(renderColumnHeader)}</thead>
      <tbody>{tableData.map(renderTableRow(tableHeader))}</tbody>
    </table>
  );
};