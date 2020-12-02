import NextLink from "next/link";

import Container from "@/components/cms/Container";
import AddCategoryModal from "@/components/cms/AddCategoryModal";
import { Box, Link } from "@chakra-ui/core";

export default function index() {
  /**
    點擊 item 像 ig 一樣 跳多一個出來
  */

  return (
    <Container>
      <AddCategoryModal>Create new category</AddCategoryModal>
      <Box>
        <NextLink href='/cms/products'>
          <Link>View Product</Link>
        </NextLink>
      </Box>
    </Container>
  );
}
