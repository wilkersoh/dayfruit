import NextLink from "next/link";

import App from "@/components/cms/App";
import Container from "@/components/cms/Container";
import AddCategoryModal from "@/components/cms/AddCategoryModal";
import { Box, Link } from "@chakra-ui/core";
import { useAuthCms } from "@/utils/authCms";

export default function index() {
  const { admin } = useAuthCms();

  return (
    <App>
      <AddCategoryModal>Create new category</AddCategoryModal>
      <Box>
        <NextLink href='/cms/products'>
          <Link>View Product</Link>
        </NextLink>
      </Box>
    </App>
  );
}
