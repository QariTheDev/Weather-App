import React, { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import { apikey } from "./config";
import { getDayNameFromDate } from "./config";

const chartsParams = {
  margin: { bottom: 20, left: 25, right: 5 },
  height: 300,
};

export default function Forecast(props) {

  const [hrdata, setHrData] = useState(null);
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${props.City}&appid=${apikey}`
    )
    .then((res) => {
        if (res.status === 200) {
        error && setError(false);
        return res.json();
        } else {
        throw new Error("Something went wrong");
        }
    })
    .then((hrdata) => {
        setHrData(hrdata);
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
}, [props.City, error]);

  return (
    <div className="chart" style={{marginTop: '10.75rem'}}>
      { hrdata && 
      <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <LineChart
            {...chartsParams}
        
            series={[
            {
                data: [
                      (hrdata.list[7].main.temp - 273.15).toFixed(0), 
                      (hrdata.list[15].main.temp - 273.15).toFixed(0), 
                      (hrdata.list[23].main.temp - 273.15).toFixed(0), 
                      (hrdata.list[31].main.temp - 273.15).toFixed(0),
                      (hrdata.list[39].main.temp - 273.15).toFixed(0)
                    ],
                color: '#ffd700',
                area: false,
            },
            ]}

            xAxis={[{ scaleType: 'point', data: [
                                                (getDayNameFromDate((hrdata.list[7].dt_txt).slice(0, 10))).slice(0, 3),
                                                (getDayNameFromDate((hrdata.list[15].dt_txt).slice(0, 10))).slice(0, 3),
                                                (getDayNameFromDate((hrdata.list[23].dt_txt).slice(0, 10))).slice(0, 3),
                                                (getDayNameFromDate((hrdata.list[31].dt_txt).slice(0, 10))).slice(0, 3),
                                                (getDayNameFromDate((hrdata.list[39].dt_txt).slice(0, 10))).slice(0, 3)
                                              ] }]}

            sx={{
                '.recharts-cartesian-axis-tick-value': {
                  fill: '#FFFFFF', 
                },
              }}
        />
      </Stack>
            }
    </div>
  );
}
