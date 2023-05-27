import { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import { BeatLoader } from "react-spinners";

interface Props {
  userId?: string;
}

interface flightTypeSeries {
  InstructorHours: number | null;
  SimulatorHours: number | null;
  CopilotHours: number | null;
  PilotHours: number | null;
}
interface flightConditionSeries {
  dayHours: number | null;
  nightHours: number | null;
  InstrumentsHours: number | null;
}

let options_flightTypeHours = {};
let options_flightConditionHours = {};

const StatsPilot = ({ userId }: Props) => {
  const [dataFlightType, setDataFlightType] = useState<flightTypeSeries>({
    InstructorHours: null,
    SimulatorHours: null,
    CopilotHours: null,
    PilotHours: null,
  });
  const [dataFlightCondition, setDataFlightCondition] =
    useState<flightConditionSeries>({
      dayHours: null,
      nightHours: null,
      InstrumentsHours: null,
    });

  // State variable to track if complete data was loaded from DB
  const [dataChart1Loaded, setDataChart1Loaded] = useState(false);
  const [dataChart2Loaded, setDataChart2Loaded] = useState(false);

  // Check if data was loaded
  // Chart1
  useEffect(() => {
    if (dataFlightType.InstructorHours !== null) setDataChart1Loaded(true);
  }, [dataFlightType.InstructorHours]);
  // Chart2
  useEffect(() => {
    if (dataFlightCondition.dayHours !== null) setDataChart2Loaded(true);
  }, [dataFlightCondition.dayHours]);



  // Initially get data from DB, to feed charts
  useEffect(() => {
    async function fetchData() {
      try {
        if (userId !== undefined) {
          // Get flights data by type
          let response = await axios.get(
            `/api/pilot/getFlightTypeHoursByUserId/${userId}`
          );
          setDataFlightType(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (userId !== undefined) {
          // Get flights data by condition
          let response = await axios.get(
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
      toolbox: {
        feature: {
          saveAsImage: {},
        },
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
      toolbox: {
        feature: {
          saveAsImage: {},
        },
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
      {/* Render this chart only if data loaded */}
      {!dataChart1Loaded ?
        <div className="mx-auto p-8 rounded-3xl shadow-xl my-auto bg-flightdeck-cream">
          <BeatLoader color={"black"} loading={true} />
        </div>
        :
        <div className="bg-white rounded-xl shadow-md">
          <ReactECharts
            option={options_flightTypeHours}
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              width: "100%",
              height: "400px",
            }}
          />
        </div>
      }
      {/* Render this chart only if data loaded */}
      {!dataChart2Loaded ?
        <div className="mx-auto p-8 rounded-3xl shadow-xl my-auto bg-flightdeck-cream">
          <BeatLoader color={"black"} loading={true} />
        </div>
        :
        <div className="bg-white rounded-xl shadow-md">
          <ReactECharts
            option={options_flightConditionHours}
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              width: "100%",
              height: "400px",
            }}
          />
        </div>
      }
    </div>
  );
};

export default StatsPilot;