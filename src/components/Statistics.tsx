"use client";

import { notify } from "@/libs/notify";
import { AppointmentStatus } from "@/redux/features/appointments/appointmentsSlice";
import {
  setMostAgendatedAllTime,
  setMostAgendatedOnRange,
  type QueryData,
} from "@/redux/features/statistics/statisticsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { statisticService } from "@/services";
import { Typography } from "@mui/material";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartTypeRegistry,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";
import { memo, useEffect, useRef, useState } from "react";
import { useQueries, type UseQueryResult } from "react-query";
import DaterStatistics from "./DaterStatistics";
import StatisticsData from "./StatisticsData";

ChartJS.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  Tooltip
);

interface IProps {
  appointment_status: AppointmentStatus;
}

function Statistics({ appointment_status }: IProps): React.ReactNode {
  const [chartJS, setChartJS] = useState<ChartJS<
    keyof ChartTypeRegistry,
    Array<string>,
    string
  > | null>(null);

  const ctxRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useAppDispatch();

  const queryDataState: QueryData = useAppSelector(
    ({ statistics }) => statistics[appointment_status].queryData
  );

  const labelText =
    appointment_status === AppointmentStatus.daily ? "diario" : "programado";

  const refreshChart = (labels: Array<string>, data: Array<string>) => {
    if (chartJS) chartJS.destroy();

    const newChart = new ChartJS(ctxRef.current!, {
      type: queryDataState.chart_type as keyof ChartTypeRegistry,
      data: {
        labels,
        datasets: [
          {
            label: `Agendamiento ${labelText} - Cantidad persona(s)`,
            data,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(54, 162, 235)",
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            hoverOffset: 4,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
        plugins: {
          datalabels: {
            formatter(value: number, ctx: Context): string {
              let sum = 0;
              const data = ctx.dataset.data;
              data.forEach((n) => (sum += Number(n)));
              const percent = Math.round((value / sum) * 100);
              return (isNaN(percent) ? 0 : percent).toString().concat("%");
            },
            labels: { title: { font: { size: 20 } } },
            align: "end",
          },
        },
      },
    });

    setChartJS(newChart);
  };

  const queries = useQueries([
    {
      queryKey: [
        "statistics",
        queryDataState.start_time,
        queryDataState.end_time,
        queryDataState.chart_type,
      ],
      queryFn: () =>
        statisticService.getStatistics(appointment_status, queryDataState),
    },
    {
      queryKey: [
        "statisticsOnRange",
        queryDataState.start_time,
        queryDataState.end_time,
        queryDataState.chart_type,
      ],
      queryFn: () =>
        statisticService.getMostAgendatedOnRange(
          appointment_status,
          queryDataState
        ),
    },
    {
      queryKey: [
        "statisticsAllTime",
        queryDataState.start_time,
        queryDataState.end_time,
        queryDataState.chart_type,
      ],
      queryFn: () =>
        statisticService.getMostAgendatedAllTime(appointment_status),
    },
  ]);

  useEffect(
    () => {
      for (let i = 0; i < queries.length; i++) {
        const { data, error } = queries[i] as UseQueryResult<any, any>;

        if (data) {
          if (i === 0) {
            const labels: Array<string> = data.map(
              ({ category_name }: { category_name: string }) => category_name
            );
            const dataset: Array<string> = data.map(
              ({ scheduling_count }: { scheduling_count: string }) =>
                scheduling_count
            );
            refreshChart(labels, dataset);
          }
          if (i === 1) {
            dispatch(setMostAgendatedOnRange([appointment_status, data]));
          }
          if (i === 2) {
            dispatch(setMostAgendatedAllTime([appointment_status, data]));
          }
        }

        if (error) {
          notify(error.response.data.error, { type: "error" });
        }
      }
    },
    queries.flatMap(({ data, error }) => [data, error])
  );

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        Estadísticas de agendamiento {labelText}
      </Typography>

      <DaterStatistics appointment_status={appointment_status} />

      <StatisticsData appointment_status={appointment_status} ctxRef={ctxRef} />
    </>
  );
}

export default memo(Statistics);
