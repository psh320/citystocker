import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { coinList } from "../../constant/CoinData";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { lib, TradeResult } from "../../components/Auto/type";
import { useMutation } from "react-query";
import { ScriptResult } from "../../components/Auto/ScriptResult";
import { submitCode } from "../../api/binanceAPI";
import { algorithmList } from "../../constant/algorithm";
import { convertIntervalToMili, INTERVAL } from "../../utils";

const Auto = () => {
  const [coin, setCoin] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [budget, setBudget] = useState("");
  const [error, setError] = useState(false);
  const [defaultCode, setDefaultCode] = useState(2);
  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setError(false);
  }, [coin, startDate, endDate, budget]);

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.getModels().forEach((model) => model.dispose());

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
    });
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    const uri = monaco.Uri.file("dir/market.d.ts");
    monaco.editor.createModel(lib, "typescript", uri);
  }

  const runScriptMutation = useMutation((code: string) =>
    submitCode(coin, code, String(startDate), String(endDate), budget)
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginTop: 4,
        marginX: 1,
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          marginX: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
          <InputLabel id="demo-simple-select-label">Coin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coin}
            label="Coin"
            onChange={handleChange}
          >
            {coinList.map((item, index) => {
              return (
                <MenuItem key={index} value={item.symbol}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ minWidth: 200, marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="budget"
            variant="outlined"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          />
        </Box>

        {startDate && endDate && (
          <Typography color="#6B6970" fontSize={14}>
            Interval should be one of the following. <br />
            {INTERVAL.map((item) => {
              const time =
                new Date(endDate).getTime() - new Date(startDate).getTime();
              if (time / convertIntervalToMili(item) < 1000) {
                return `${item} `;
              }
            })}
          </Typography>
        )}

        {error && (
          <Typography color="red" fontSize={14} marginTop={1}>
            All of the fields are required to run the trade.
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          border: "solid 1px #DFDFDF",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 1,
        }}
      >
        <Box>
          <Button
            variant={defaultCode === 2 ? "contained" : "outlined"}
            sx={{ marginRight: 1 }}
            onClick={() => {
              setDefaultCode(2);
            }}
          >
            Blank
          </Button>
          <Button
            variant={defaultCode === 0 ? "contained" : "outlined"}
            sx={{ marginRight: 1 }}
            onClick={() => {
              setDefaultCode(0);
            }}
          >
            LW Volatility
          </Button>
          <Button
            variant={defaultCode === 1 ? "contained" : "outlined"}
            sx={{ marginRight: 1 }}
            onClick={() => {
              setDefaultCode(1);
            }}
          >
            Trend Following
          </Button>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            padding: 1,
            flex: 0.7,
          }}
        >
          <Editor
            height={400}
            width="100%"
            defaultLanguage="typescript"
            defaultValue={algorithmList[defaultCode]}
            value={algorithmList[defaultCode]}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            options={options}
            loading={<CircularProgress color="primary" />}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button
              onClick={() => {
                if (coin && startDate && endDate && budget) {
                  runScriptMutation.mutate(editorRef.current.getValue());
                } else {
                  setError(true);
                }
              }}
            >
              RUN
            </Button>
          </Box>
        </Box>

        <ScriptResult
          scriptData={runScriptMutation.data}
          loading={runScriptMutation.isLoading}
        />
      </Box>
    </Box>
  );
};

export default Auto;
