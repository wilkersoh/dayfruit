import { Box, CheckboxGroup, Checkbox, Text, Stack } from "@chakra-ui/core";

export default function Filters({ categories }) {
  return (
    <Stack style={{ border: "2px solid red" }}>
      <Box minH='100px'>
        <Text mb={2} fontWeight='bold'>
          Fruit Type
        </Text>
        <CheckboxGroup
          variantColor='teal'
          className='sidebar-type-checkbox'
          defaultValue={["APPLE", "ORANGE"]}>
          <Checkbox value='APPLE'>Apple</Checkbox>
          <Checkbox value='ORANGE'>Orange</Checkbox>
          <Checkbox value='BANANA'>Banana</Checkbox>
        </CheckboxGroup>
      </Box>
      <Box minH='100px'>
        <Text mb={2} fontWeight='bold'>
          Vitamins
        </Text>
        <CheckboxGroup
          variantColor='teal'
          className='sidebar-type-checkbox'
          defaultValue={["VITAMIN_A", "VITAMIN_B"]}>
          <Checkbox value='VITAMIN_A'>VITAMIN_A</Checkbox>
          <Checkbox value='VITAMIN_B'>VITAMIN_B</Checkbox>
          <Checkbox value='VITAMIN_B2'>VITAMIN_B2</Checkbox>
        </CheckboxGroup>
      </Box>
    </Stack>
  );
}
