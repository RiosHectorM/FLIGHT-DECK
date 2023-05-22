import { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

interface Props {
  userId?: string;
}

interface flightTypeSeries {
  InstructorHours: number;
  SimulatorHours: number;
  CopilotHours: number;
  PilotHours: number;
}
interface flightConditionSeries {
  dayHours: number;
  nightHours: number;
  InstrumentsHours: number;
}

let options_flightTypeHours = {};
let options_flightConditionHours = {};

const StatsPilot = ({ userId }: Props) => {
  const [dataFlightType, setDataFlightType] = useState<flightTypeSeries>({
    InstructorHours: 0,
    SimulatorHours: 0,
    CopilotHours: 0,
    PilotHours: 0,
  });
  const [dataFlightCondition, setDataFlightCondition] =
    useState<flightConditionSeries>({
      dayHours: 0,
      nightHours: 0,
      InstrumentsHours: 0,
    });

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Getting flight hours");

        if (userId !== undefined) {
          // Get flights data by type
          let response = await axios.get(
            `/api/pilot/getFlightTypeHoursByUserId/${userId}`
          );
          setDataFlightType(response.data);

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

  // Set flight type chart options on data's change
  useEffect(() => {
    options_flightTypeHours = {
      title: {
        text: "Hours By Flight Type",
        subtext: "Including all flights",
        left: "center",
      },
      legend: {
        data: ["Flight Hours"],
        bottom: 0, // Set the bottom position of the legend
      },
      xAxis: {
        type: "category",
        data: ["Instructor", "Simulator", "Copilot", "Pilot"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Flight Hours",
          type: "bar",
          data: [
            dataFlightType.InstructorHours,
            dataFlightType.SimulatorHours,
            dataFlightType.CopilotHours,
            dataFlightType.PilotHours,
          ],
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
          label: {
            show: true, // Display the label
            position: "top", // Set the position of the label inside the bar
          },
        },
      ],
    };
  }, [dataFlightType]);

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
            { value: dataFlightCondition.InstrumentsHours, name: "Instrument Hours" },
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
          option={options_flightTypeHours}
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

export default StatsPilot;
