import { Box } from "@chakra-ui/core";

const Map = (props) => {
  return (
    <Box
      as='svg'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke={"#fff"}
      strokeLinecap='square'
      fill='none'
      color={"#fff"}
      {...props}>
      <path d='M9 19l-6 2V5l6-2 6 2 6-2v15.5L15 21z' />
      <path strokeLinecap='round' d='M15 5v16M9 3v16' />
    </Box>
  );
};

export default Map;
