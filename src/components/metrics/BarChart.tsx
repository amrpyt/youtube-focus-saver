import React from 'react';

interface BarChartProps {
  data: { label: string, value: number }[];
  title: string;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, className = '' }) => {
  const maxValue = Math.max(...data.map(item => item.value), 1); // Prevent division by zero
  
  return (
    <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart; 