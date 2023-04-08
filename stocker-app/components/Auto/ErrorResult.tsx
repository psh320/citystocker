import { Box, Typography } from "@mui/material";

type Props = {
  errorList?: string[];
};

export const ErrorResult = ({ errorList }: Props) => {
  if (errorList?.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="#AAAAAA">There are no Errors</Typography>
      </Box>
    );
  }
  return (
    <Box>
      {errorList?.map((error, index) => {
        if (!error) {
          return <></>;
        }
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              paddingY: 1,
              borderBottom: "1px solid #DFDFDF",
            }}
          >
            <Typography color={"red"} sx={{ flex: 1 }}>
              {error}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
