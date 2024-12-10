import React, { useState, useCallback } from 'react';
import { parse } from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PowerData {
  Site: string;
  Date: string;
  'Power (kW)': number;
}

interface DataSet {
  id: number;
  name: string;
  data: PowerData[];
}

export function DataPage() {
  const [dataSets, setDataSets] = useState<DataSet[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parse(file, {
        header: true,
        complete: (results) => {
          const parsedData = results.data as PowerData[];
          setDataSets(prev => [
            ...prev,
            {
              id: Date.now(),
              name: file.name,
              data: parsedData
            }
          ].slice(-2)); // Keep only the last two datasets
        },
      });
    }
  }, []);

  // Combine all data points for the chart
  const chartData = dataSets[0]?.data.map((item, index) => ({
    Date: item.Date,
    [dataSets[0].name]: item['Power (kW)'],
    ...(dataSets[1]?.data[index] && {
      [dataSets[1].name]: dataSets[1].data[index]['Power (kW)']
    })
  })) || [];

  const colors = ['#8884d8', '#82ca9d'];

  return (
    <div className="content">
      <h1 className="main-title">Power Data Visualization</h1>
      
      <div className="file-upload">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="file-input"
        />
        <p className="upload-info">
          {dataSets.length === 0 
            ? "Upload a CSV file to visualize power data" 
            : dataSets.length === 1 
              ? "Upload another CSV file to compare" 
              : "Maximum of two files can be compared"}
        </p>
      </div>

      {chartData.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              {dataSets.map((dataset, index) => (
                <Line
                  key={dataset.id}
                  type="monotone"
                  dataKey={dataset.name}
                  stroke={colors[index]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}