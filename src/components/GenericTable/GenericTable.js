import React from 'react';

export default function GenericTable(props) {
  function renderGroup(groupingValue) {
    function getGroupingValueRows(dataRow) {
      return (
        getPropertyFromObject(dataRow, props.groupBy.split('.')) ===
        groupingValue
      );
    }
    return renderTable(props.data.filter(getGroupingValueRows), props.header);
  }

  if (props.groupBy)
    return (
      <>
        {props.data.reduce(getUniqueValues(props.groupBy), []).map(renderGroup)}
      </>
    );
  return renderTable(props.data, props.header);
}

function renderTable(tableData, tableHeader) {
  function renderTableRow(dataRow) {
    function renderCellByHeader(tableHeader) {
      return (
        <td>{getPropertyFromObject(dataRow, tableHeader.field.split('.'))}</td>
      );
    }
    return <tr>{tableHeader.map(renderCellByHeader)}</tr>;
  }
  function renderColumnHeader(columnHeader) {
    return <th>{columnHeader.title}</th>;
  }

  return (
    <table border="1" style={{ width: '100%' }}>
      <thead>{tableHeader.map(renderColumnHeader)}</thead>
      <tbody>{tableData.map(renderTableRow)}</tbody>
    </table>
  );
}

function getUniqueValues(groupBy) {
  return function (acc, item) {
    if (acc.includes(getPropertyFromObject(item, groupBy.split('.'))))
      return acc;
    return [...acc, getPropertyFromObject(item, groupBy.split('.'))];
  };
}

function getPropertyFromObject(obj, propertyPath) {
  if (propertyPath.length === 0) return obj;
  return getPropertyFromObject(obj[propertyPath[0]], propertyPath.slice(1));
}
