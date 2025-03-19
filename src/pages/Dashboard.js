"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MetricsContext_1 = require("../contexts/MetricsContext");
// Chart components would be better implemented with a library
// like Chart.js, React-vis, or Recharts in a real implementation
var MetricCard = function (_a) {
    var title = _a.title, value = _a.value, subtitle = _a.subtitle, icon = _a.icon;
    return (<div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="bg-red-100 rounded-full p-3 text-red-600">
          {icon}
        </div>
      </div>
    </div>);
};
var BarChart = function (_a) {
    var data = _a.data, title = _a.title;
    var maxValue = Math.max.apply(Math, data.map(function (item) { return item.value; }));
    return (<div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map(function (item, index) { return (<div key={index}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "".concat((item.value / maxValue) * 100, "%") }}></div>
            </div>
          </div>); })}
      </div>
    </div>);
};
var SessionsList = function (_a) {
    var sessions = _a.sessions;
    return (<div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Watch Sessions</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {sessions.length === 0 ? (<p className="px-5 py-4 text-sm text-gray-500 italic">No watch sessions recorded yet.</p>) : (sessions.map(function (session, index) { return (<div key={index} className="px-5 py-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate" style={{ maxWidth: '250px' }}>
                    {session.video_title || 'Unknown Video'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(session.start_time).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Focus: {Math.round(session.focus_percentage)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Distractions: {session.distraction_count}
                  </p>
                </div>
              </div>
            </div>); }))}
      </div>
    </div>);
};
var Dashboard = function () {
    var _a = (0, MetricsContext_1.useMetrics)(), dailyMetrics = _a.dailyMetrics, watchSessions = _a.watchSessions, loading = _a.loading, error = _a.error;
    var _b = (0, react_1.useState)('week'), timeRange = _b[0], setTimeRange = _b[1];
    // Filter metrics based on time range
    var filteredMetrics = dailyMetrics.slice(0, timeRange === 'week' ? 7 : 30);
    // Calculate overall stats
    var totalWatchTime = filteredMetrics.reduce(function (sum, metric) { return sum + metric.total_watch_time; }, 0);
    var totalFocusTime = filteredMetrics.reduce(function (sum, metric) { return sum + metric.focus_time; }, 0);
    var totalVideosWatched = filteredMetrics.reduce(function (sum, metric) { return sum + metric.videos_watched; }, 0);
    var totalDistractions = filteredMetrics.reduce(function (sum, metric) { return sum + metric.distraction_count; }, 0);
    // Calculate average focus percentage
    var avgFocusPercentage = totalWatchTime > 0
        ? Math.round((totalFocusTime / totalWatchTime) * 100)
        : 0;
    // Format watch time for display
    var formatTimeDisplay = function (minutes) {
        var hours = Math.floor(minutes / 60);
        var mins = minutes % 60;
        return hours > 0 ? "".concat(hours, "h ").concat(mins, "m") : "".concat(mins, "m");
    };
    // Prepare data for charts
    var dailyWatchTimeData = filteredMetrics
        .slice()
        .reverse()
        .map(function (metric) { return ({
        label: new Date(metric.date).toLocaleDateString(undefined, { weekday: 'short' }),
        value: Math.round(metric.total_watch_time / 60) // convert to hours
    }); });
    var dailyFocusPercentageData = filteredMetrics
        .slice()
        .reverse()
        .map(function (metric) { return ({
        label: new Date(metric.date).toLocaleDateString(undefined, { weekday: 'short' }),
        value: metric.total_watch_time > 0
            ? Math.round((metric.focus_time / metric.total_watch_time) * 100)
            : 0
    }); });
    if (loading) {
        return (<div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>);
    }
    if (error) {
        return (<div className="rounded-md bg-red-50 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading metrics</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>);
    }
    // If no metrics, show an empty state
    if (dailyMetrics.length === 0) {
        return (<div className="mt-16 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No metrics available</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start watching videos to track your focus metrics.
        </p>
      </div>);
    }
    return (<div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Focus Dashboard</h1>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button type="button" onClick={function () { return setTimeRange('week'); }} className={"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ".concat(timeRange === 'week'
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50')}>
            Last Week
          </button>
          <button type="button" onClick={function () { return setTimeRange('month'); }} className={"relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ".concat(timeRange === 'month'
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50', " -ml-px")}>
            Last Month
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <MetricCard title="Total Watch Time" value={formatTimeDisplay(totalWatchTime)} subtitle={"Last ".concat(timeRange === 'week' ? '7' : '30', " days")} icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>}/>
        
        <MetricCard title="Focus Rate" value={"".concat(avgFocusPercentage, "%")} subtitle="Time focused vs. total time" icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>}/>
        
        <MetricCard title="Videos Watched" value={totalVideosWatched} subtitle={"Last ".concat(timeRange === 'week' ? '7' : '30', " days")} icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>}/>
        
        <MetricCard title="Distractions" value={totalDistractions} subtitle="Number of times distracted" icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>}/>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChart title="Daily Watch Time (hours)" data={dailyWatchTimeData}/>
        
        <BarChart title="Daily Focus Percentage" data={dailyFocusPercentageData}/>
      </div>
      
      <div className="mb-6">
        <SessionsList sessions={watchSessions.slice(0, 5)}/>
      </div>
    </div>);
};
exports.default = Dashboard;
