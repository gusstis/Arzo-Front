import { Table } from '@nextui-org/react';

export default function crudTable({data},title) {
  let columns=[]
  for (var key in data[0]?.getOwnPropertyNames()) {
  columns.push(
    {
      key: key,
      label: key
    }
  )
  }
  console.log(columns)

  const rows = data
  return (
    <Table
      aria-label={title}
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
