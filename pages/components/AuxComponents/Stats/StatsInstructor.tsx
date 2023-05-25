import { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import { DateTime } from "luxon";

interface Props {
  userId?: string;
  toggleRerenderCharts: () => void;
}

interface flightConditionSeries {
  dayHours: number[];
  nightHours: number[];
  instHours: number[];
}

const now = DateTime.now();
const monthCountToShow: number = 6; // Set the number of previous months to show in chart
const monthYears: (string | null)[] = []; // Array to set in the xAxis
const startDates: DateTime[] = []; // Array with start dates to query
const endDates: DateTime[] = []; // Array with end dates to query

// Populate monthYears, startDates, and endDates arrays
for (let i = 0; i < monthCountToShow; i++) {
  monthYears.unshift(
    now.minus({ months: i }).toLocaleString({ month: "short" }) + "'" + now.minus({ months: i }).toLocaleString({ year: "2-digit" })
  );
  startDates.unshift(now.minus({ months: i }).startOf("month"));
  endDates.unshift(now.minus({ months: i - 1 }).startOf("month"));
}

let options_certifiedHoursByPilot = {};
let options_certifiedHoursByDate = {};

const StatsInstructor = ({ userId, toggleRerenderCharts }: Props) => {
  // State variables for 'Certified Hours by Pilot' chart
  const [certifiedHoursPilot, setCertifiedHoursPilot] = useState<string[]>([]);
  const [certifiedDayHours, setCertifiedDayHours] = useState<number[]>([]);
  const [certifiedNightHours, setCertifiedNightHours] = useState<number[]>([]);
  const [certifiedInstrumentsHours, setCertifiedInstrumentsHours] = useState<number[]>([]);

  // State variable for 'Certified Hours by Dates' chart
  const [certifiedHoursByDate, setCertifiedHoursByDate] = useState<flightConditionSeries>({
    dayHours: [],
    nightHours: [],
    instHours: [],
  });

  // Initially get data from DB, to feed charts
  useEffect(() => {
    async function fetchData() {
      try {
        if (userId !== undefined) {
          // Get certified hours by pilot
          let response = await axios.get(`/api/flight/getCertifiedFlightsByInstructorId/${userId}`);
          let pilots: string[] = [];
          let dayHours: number[] = [];
          let nightHours: number[] = [];
          let instrumentsHours: number[] = [];

          for (let i = 0; i < response.data.length; i++) {
            pilots[i] = response.data[i].pilotName + " " + response.data[i].pilotLastName + "\n" + response.data[i].pilotMail;
            dayHours[i] = response.data[i].dayCertifiedHours;
            nightHours[i] = response.data[i].nightCertifiedHours;
            instrumentsHours[i] = response.data[i].instrumentsCertifiedHours;
          }

          setCertifiedHoursPilot(pilots);
          setCertifiedDayHours(dayHours);
          setCertifiedNightHours(nightHours);
          setCertifiedInstrumentsHours(instrumentsHours);
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
          // Get certified hours by date
          let auxData: flightConditionSeries = {
            dayHours: [],
            nightHours: [],
            instHours: [],
          };

          // // Parallelized version
          // const requests: any[] = [];
          // // Create array of promises
          // for (let i = 0; i < monthCountToShow; i++) {
          //   requests.push(
          //     await axios.get(
          //       `/api/flight/getCertifiedFlightsByInstructorIdAndDates?certifierId=${userId}&startDate=${startDates[i]?.toISODate()}&endDate=${endDates[i]?.toISODate()}`
          //     )
          //   );
          // }
          // const responses = await Promise.all(requests);

          // // Load retrieved values in auxData before setting state variable
          // for (let i = 0; i < monthCountToShow; i++) {
          //   auxData.dayHours[i] = responses[i].data.dayHours;
          //   auxData.nightHours[i] = responses[i].data.nightHours;
          //   auxData.instHours[i] = responses[i].data.instHours;
          // }

          // setCertifiedHoursByDate(auxData);

          for (let i = 0; i < monthCountToShow; i++) {
            const responses = await axios.get(
              `/api/flight/getCertifiedFlightsByInstructorIdAndDates?certifierId=${userId}&startDate=${startDates[i]?.toISODate()}&endDate=${endDates[i]?.toISODate()}`
            );
            auxData.dayHours[i] = responses.data.dayHours;
            auxData.nightHours[i] = responses.data.nightHours;
            auxData.instHours[i] = responses.data.instHours;

            setCertifiedHoursByDate(auxData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Set 'certified hours by pilot' chart options on data's change
  useEffect(() => {
    options_certifiedHoursByPilot = {
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
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "9%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        padding: 14,
        sort: "descending",
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
            show: true,
          },
          emphasis: {
            focus: "series",
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
            show: true,
          },
          emphasis: {
            focus: "series",
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
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: certifiedInstrumentsHours,
          // showBackground: true,
          // backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
        },
      ],
    };
  }, [certifiedDayHours, certifiedNightHours, certifiedInstrumentsHours]);

  // Set 'certified hours by date' chart options on data's change
  useEffect(() => {
    console.log("--------ENTERING CERT BY DATE CHART OPTIONS--------");

    if (certifiedHoursByDate?.dayHours.length === 6) toggleRerenderCharts();

    options_certifiedHoursByDate = {
      title: {
        text: "Certified Hours in Last " + monthCountToShow + " Months",
        subtext: "Disaggregated by Condition",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Day Hours", "Night Hours", "Instruments Hours"],
        bottom: 0,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "8%",
        bottom: "9%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: monthYears,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Day Hours",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: certifiedHoursByDate.dayHours,
        },
        {
          name: "Night Hours",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: certifiedHoursByDate.nightHours,
        },
        {
          name: "Instruments Hours",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: certifiedHoursByDate.instHours,
        },
      ],
    };

    console.log('USEEFFECT THAT SETS CHART STATUS FINISHED');
    console.log(certifiedHoursByDate);


  }, [certifiedHoursByDate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
      <div className="bg-white rounded-xl shadow-md">
        <ReactECharts
          option={options_certifiedHoursByPilot}
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
      {/* (LEO: didn't like it): Check if data was completely retrieved from backend before rendering */}
      {/* {certifiedHoursByDate?.dayHours.length === 6 && */}
      <div className="bg-white rounded-xl shadow-md">
        <ReactECharts
          option={options_certifiedHoursByDate}
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
      {/* } */}
    </div>
  );
};

export default StatsInstructor;

// version 2023.05.25 17:30
