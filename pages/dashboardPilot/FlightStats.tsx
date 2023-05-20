import { useEffect, useState } from "react";
import axios from "axios";
import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // Dataset
  DatasetComponent,
  // Built-in transform (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type {
  // The series option types are defined with the SeriesOption suffix
  BarSeriesOption,
  LineSeriesOption,
} from "echarts/charts";
import type {
  // The component option types are defined with the ComponentOption suffix
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

interface Props {
  userId?: string;
}
// Create an Option type with only the required components and charts via ComposeOption
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const option: ECOption = {
  // ...
};

const FlightStats = ({ userId }: Props) => {
  // const [certifiedHours, setCertifiedHours] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (userId !== undefined) {
          const response = await axios.get(
            `/api/pilot/getHoursByUserId/${userId}`
          );
          const data = response.data;
          // setCertifiedHours(data.CertifiedHours || 0);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <p>{userId}</p>
    </div>
  );
};

export default FlightStats;
