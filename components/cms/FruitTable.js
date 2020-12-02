import { Table, Tr, Th, Td } from "./Table";

import FruitRow from "@/components/cms/FruitRow";

const EmptyRow = () => (
  <Tr textAlign='center'>
    <Td colSpan={5}>Not Fruits</Td>
  </Tr>
);

const FruitTable = ({ fruits }) => {
  return (
    <Table minW='650px'>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Benefit</Th>
          <Th>Vitamins</Th>
          <Th>Country</Th>
          <Th w='100px'>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {fruits.length > 0 ? (
          fruits.map((fruit) => <FruitRow key={fruit._id} {...fruit} />)
        ) : (
          <EmptyRow />
        )}
      </tbody>
    </Table>
  );
};

export default FruitTable;
