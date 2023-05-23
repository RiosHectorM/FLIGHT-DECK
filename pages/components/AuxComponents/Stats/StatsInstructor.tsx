import { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

interface Props {
  userId?: string;
}

interface flightConditionSeries {
  dayHours: number;
  nightHours: number;
  InstrumentsHours: number;
}

let options_certifiedHours = {};
let options_flightConditionHours = {};

const StatsInstructor = ({ userId }: Props) => {
  const [certifiedHoursPilot, setCertifiedHoursPilot] = useState<string[]>([]);
  const [certifiedDayHours, setCertifiedDayHours] = useState<number[]>([]);
  const [certifiedNightHours, setCertifiedNightHours] = useState<number[]>([]);
  const [certifiedInstrumentsHours, setCertifiedInstrumentsHours] = useState<
    number[]
  >([]);

  const [dataFlightCondition, setDataFlightCondition] =
    useState<flightConditionSeries>({
      dayHours: 0,
      nightHours: 0,
      InstrumentsHours: 0,
    });

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Getting certified hours");

        if (userId !== undefined) {
          // Get certified hours by pilot
          let response = await axios.get(
            `/api/flight/getCertifiedFlightsByInstructorId/${userId}`
          );
          let pilots: string[] = [];
          let dayHours: number[] = [];
          let nightHours: number[] = [];
          let instrumentsHours: number[] = [];

          for (let i = 0; i < response.data.length; i++) {
            pilots[i] = response.data[i].pilot;
            dayHours[i] = response.data[i].dayCertifiedHours;
            nightHours[i] = response.data[i].nightCertifiedHours;
            instrumentsHours[i] = response.data[i].instrumentsCertifiedHours;
          }

          setCertifiedHoursPilot(pilots);
          setCertifiedDayHours(dayHours);
          setCertifiedNightHours(nightHours);
          setCertifiedInstrumentsHours(instrumentsHours);

          // Get flights data by condition
          response = await axios.get(
            `/api/pilot/getFlightConditionHoursByUserId/${userId}`
          );
          setDataFlightCondition(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Set certified hours chart options on data's change
  useEffect(() => {
    options_certifiedHours = {
      title: {
        text: "Certified Hours By Pilot",
        subtext: "Disaggregated by Condition",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        bottom: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        padding: 14,
      },
      yAxis: {
        type: "category",
        data: certifiedHoursPilot,
      },
      series: [
        {
          name: "Day Hours",
          type: "bar",
          stack: "total",
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: certifiedDayHours,
          // showBackground: true,
          // backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
        },
        {
          name: "Night Hours",
          type: "bar",
          stack: "total",
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: certifiedNightHours,
          // showBackground: true,
          // backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
        },
        {
          name: "Instruments Hours",
          type: "bar",
          stack: "total",
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: certifiedInstrumentsHours,
          // showBackground: true,
          // backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
        },
      ],
    };
  }, [certifiedDayHours, certifiedNightHours, certifiedInstrumentsHours]);

  // Set flight condition chart options on data's change
  useEffect(() => {
    options_flightConditionHours = {
      title: {
        text: "Hours By Flight Condition",
        subtext: "Including all flights",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: 30,
        bottom: 0,
      },
      series: [
        {
          // name: "Flight Hours",
          type: "pie",
          radius: "50%",
          data: [
            { value: dataFlightCondition.dayHours, name: "Day Hours" },
            { value: dataFlightCondition.nightHours, name: "Night Hours" },
            {
              value: dataFlightCondition.InstrumentsHours,
              name: "Instrument Hours",
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }, [dataFlightCondition]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
      <div className="bg-white rounded-xl shadow-md">
        <ReactECharts
          option={options_certifiedHours}
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "0.5rem",
            width: "100%",
            height: "400px",
          }}
        />
      </div>
      <div className="bg-white rounded-xl shadow-md">
        <ReactECharts
          option={options_flightConditionHours}
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "0.5rem",
            width: "100%",
            height: "400px",
          }}
        />
      </div>
    </div>
  );
};

export default StatsInstructor;
