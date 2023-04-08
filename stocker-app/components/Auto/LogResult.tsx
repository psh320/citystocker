import { Box, Typography } from "@mui/material";

type Props = {
  logList?: string[];
};

export const LogResult = ({ logList }: Props) => {
  if (logList?.length === 0) {
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
        <Typography color="#AAAAAA">There are no logs</Typography>
      </Box>
    );
  }
  return (
    <Box>
      {logList?.map((log, index) => {
        if (!log) {
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
            <Typography sx={{ flex: 1 }}>{log}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
