import React, { useEffect, useState } from "react";
import { Account } from "../../stocker-core/sdk/Types/Account";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { getCoinInfo } from "../../constant/CoinData";

type Props = {
  account: Account | null;
};

Chart.register(CategoryScale);

type DoughnutData = {
  labels: string[];
  datasets: [{ data: number[]; backgroundColor: string[] }];
};

export const DoughnutChart = ({ account }: Props) => {
  const [chartData, setChartData] = useState<DoughnutData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#0074D9",
          "#FF4136",
          "#2ECC40",
          "#FF851B",
          "#7FDBFF",
          "#B10DC9",
          "#FFDC00",
          "#001f3f",
          "#39CCCC",
          "#01FF70",
          "#85144b",
          "#F012BE",
          "#3D9970",
          "#111111",
          "#AAAAAA",
        ],
      },
    ],
  });

  useEffect(() => {
    let doughnutData: DoughnutData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#0074D9",
            "#FF4136",
            "#2ECC40",
            "#FF851B",
            "#7FDBFF",
            "#B10DC9",
            "#FFDC00",
            "#001f3f",
            "#39CCCC",
            "#01FF70",
            "#85144b",
            "#F012BE",
            "#3D9970",
            "#111111",
            "#AAAAAA",
          ],
        },
      ],
    };
    account?.wallets.forEach((item, index) => {
      if (index === 0) {
        doughnutData.datasets[0].data.push(Number(item.amount));
        doughnutData.labels.push(String(getCoinInfo(item.symbol)?.name));
      } else if (item.amount > 0) {
        doughnutData.datasets[0].data.push(
          Number(item.avgPrice) * Number(item.amount)
        );
        doughnutData.labels.push(String(getCoinInfo(item.symbol)?.name));
      }
      setChartData(doughnutData);
    });
  }, [account?.wallets]);

  return <Doughnut data={chartData} />;
};
