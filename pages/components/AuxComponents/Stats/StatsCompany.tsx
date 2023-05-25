import { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

interface pilotsByNationalityObj {
  name: string; // nationality
  value: number; // count
}

let options_numPilotsByNationality = {};

const StatsCompany = () => {
  // state variable for 'pilots by nationality' chart
  const [dataPilotsByNationality, setDataPilotsByNationality] = useState<pilotsByNationalityObj[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Getting pilot count by nationality");

        // Get number of pilots by nationality
        const response = await axios.get(`/api/pilot/getNumPilotsByNationality`);

        if (!response.data) {
          setDataPilotsByNationality([]);
        } else {
          // format response to fit in chart's options, and set state
          const formattedResult: pilotsByNationalityObj[] = response.data.map((elem: any) => {
            return {
              name: elem.nationality,
              value: elem.count,
            };
          });

          setDataPilotsByNationality(formattedResult);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // Set 'number of pilots by nationality' chart options on state variable's change
  useEffect(() => {
    options_numPilotsByNationality = {
      title: {
        text: "Number of Pilots by Nationality",
        // subtext: "Registered users only",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      legend: {
        bottom: "1.5%", // Set the bottom position of the legend
        left: "center",
      },
      series: [
        {
          name: "Nationality",
          type: "pie",
          radius: ["40%", "65%"],
          center: ["50%", "47.5%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter(param: any) {
              return param.name + " (" + param.value + ")";
            },
          },
          data: dataPilotsByNationality,
        },
      ],
    };
  }, [dataPilotsByNationality]);

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-white rounded-xl shadow-md">
        <ReactECharts
          option={options_numPilotsByNationality}
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
    </div>
  );
};

export default StatsCompany;

// version 2023.05.25 13:20