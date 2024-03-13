"use client";

import { AppointmentStatus } from "@/enums";
import type { ICounts } from "@/interfaces";
import type { QueryData } from "@/redux/features/statistics/statisticsSlice";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Listgroup } from "./ui";

interface IProps {
  appointment_status: AppointmentStatus;
}

function ListerStatistics({ appointment_status }: IProps): React.ReactNode {
  const t = useTranslations("Statistics");

  const mostAgendatedOnRangeState: Array<ICounts> = useAppSelector(
    ({ statistics }) => statistics[appointment_status].mostAgendatedOnRange
  );
  const mostAgendatedAllTimeState: Array<ICounts> = useAppSelector(
    ({ statistics }) => statistics[appointment_status].mostAgendatedAllTime
  );
  const queryDataState: QueryData = useAppSelector(
    ({ statistics }) => statistics[appointment_status].queryData
  );

  const titleText: string = t(
    appointment_status === AppointmentStatus.daily ? "daily" : "scheduled"
  );

  return (
    <>
      <Listgroup
        title={t("inrange", { type: titleText })}
        data={mostAgendatedOnRangeState}
        end_time={queryDataState.end_time}
      />

      <Listgroup
        title={t("alldate", { type: titleText })}
        data={mostAgendatedAllTimeState}
        end_time={queryDataState.end_time}
      />
    </>
  );
}

export default memo(ListerStatistics);
