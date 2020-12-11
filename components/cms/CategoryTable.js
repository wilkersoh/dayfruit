import { Table, Tr, Th, Td } from "./Table";

import CategoryRow from "@/components/cms/CategoryRow";

const EmptyRow = () => (
  <Tr textAlign='center'>
    <Td colSpan={5}>Not Fruits</Td>
  </Tr>
);

const CategoryTable = ({ categories, ...props }) => {
  return (
    <Table {...props}>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Benefit</Th>
          <Th>Vitamin</Th>
          <Th w='100px'>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryRow key={category._id} {...category} />
          ))
        ) : (
          <EmptyRow />
        )}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
