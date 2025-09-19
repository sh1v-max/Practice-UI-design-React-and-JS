import React from 'react';
import { chartData } from '../Data/mockData';

// TypeScript ignore for CanvasJS import (required for TypeScript)
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

// Extract CanvasJS components
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Define types for better TypeScript support
interface ChartDataPoint {
  month: string;
  income: number;
  growth: number;
}

// Define the labelFormatter parameter type based on CanvasJS documentation
interface LabelFormatterParameter {
  chart: any;
  axis: any;
  value: number;
  label?: string;
}

const IncomeChart: React.FC = () => {
  // Chart configuration options
  const options = {
    animationEnabled: true,
    theme: "light2",
    backgroundColor: "transparent", // Remove chart background to match original
    title: {
      text: "Income Trend",
      fontSize: 18,
      fontColor: "#111827", // Gray-900
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: "600",
      horizontalAlign: "left",
      margin: 10
    },
    subtitles: [{
      text: "Your monthly income and growth for the last 6 months.",
      fontSize: 14,
      fontColor: "#6B7280", // Gray-500  
      fontFamily: "system-ui, -apple-system, sans-serif",
      horizontalAlign: "left",
      margin: 15
    }],
    axisX: {
      labelFontSize: 15,
      labelFontColor: "#6B7280",
      tickLength: 0,
      lineThickness: 0,
      gridThickness: 0,
      margin: 10
    },
    // Primary Y-axis (left side) - for Income
    axisY: {
      title: "",
      labelFontSize: 15,
      labelFontColor: "#6B7280",
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
      minimum: 0,
      maximum: 80000,
      interval: 20000,
      margin: 10,
      labelFormatter: function(e: LabelFormatterParameter): string {
        return "$" + (e.value / 1000) + "k";
      }
    },
    // Secondary Y-axis (right side) - for Growth percentages
    axisY2: {
      title: "",
      labelFontSize: 15, 
      labelFontColor: "#6B7280",
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
      minimum: -100,
      maximum: 100,
      interval: 50,
      margin: 10,
      labelFormatter: function(e: LabelFormatterParameter): string {
        return e.value + "%";
      }
    },
    legend: {
      horizontalAlign: "center",
      verticalAlign: "bottom",
      fontSize: 18,
      fontFamily: "system-ui, -apple-system, sans-serif",
      margin: 15
    },
    data: [{
      type: "column",
      name: "Income",
      // No axisYType specified = uses primary axis (left side)
      showInLegend: true,
      color: "#9333EA", // Purple-600
      dataPointWidth: 35, // Make columns narrower to increase spacing
      dataPoints: chartData.map((item: ChartDataPoint) => ({
        label: item.month,
        y: item.income
      }))
    }, {
      type: "line",
      name: "MomGrowth", 
      axisYType: "secondary", // This attaches to axisY2 (right side)
      showInLegend: true,
      color: "#7F1D1D", // Red-900
      lineThickness: 2,
      markerType: "circle",
      markerSize: 8,
      markerColor: "#7F1D1D",
      markerBorderColor: "#7F1D1D",
      markerBorderThickness: 2,
      dataPoints: chartData.map((item: ChartDataPoint) => ({
        label: item.month,
        y: item.growth
      }))
    }]
  };

  return (
    <div className="bg-gray-200 rounded-[26px] p-4 mb-4">
      {/* Custom title and subtitle outside of chart for better control */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Income Trend</h3>
      <p className="text-sm text-gray-500 mb-6">
        Your monthly income and growth for the last 6 months.
      </p>
      
      <div style={{ height: "420px", width: "100%" }}>
        <CanvasJSChart 
          options={{
            ...options,
            title: { text: "" }, // Remove title from chart since we have it outside
            subtitles: [] // Remove subtitle from chart since we have it outside
          }} 
        />
      </div>
    </div>
  );
};

export default IncomeChart;
