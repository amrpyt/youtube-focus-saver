"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var react_1 = require("react");
var hooks_1 = require("../hooks");
var format_1 = require("../utils/format");
var Dashboard = function () {
    var _a = (0, hooks_1.useMetrics)(), metrics = _a.metrics, recentSessions = _a.recentSessions, loading = _a.loading, error = _a.error;
    var isAuthenticated = (0, hooks_1.useAuth)().isAuthenticated;
    var settings = (0, hooks_1.useSettings)().settings;
    if (!isAuthenticated) {
        return (<div className={"p-6 flex flex-col items-center justify-center h-full ".concat(settings.darkMode ? 'text-gray-300' : 'text-gray-700')}>
        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <h3 className="text-xl font-medium mb-2">Login Required</h3>
        <p className="text-center text-sm mb-4">
          Please log in to view your focus metrics and video history.
        </p>
        <button onClick={function () { }} // This should navigate to settings/login
         className={"px-4 py-2 text-sm font-medium rounded-md ".concat(settings.darkMode
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
          Go to Login
        </button>
      </div>);
    }
    if (loading) {
        return (<div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>);
    }
    if (error) {
        return (<div className="p-6 text-center text-red-500">
        <p>Error loading data: {error}</p>
      </div>);
    }
    return (<div className={"p-6 ".concat(settings.darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900')}>
      <h2 className="text-2xl font-bold mb-6">Your Focus Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Watch Time" value={metrics.formattedTotalWatchTime || '0m'} icon="⏱️" darkMode={settings.darkMode}/>
        <MetricCard title="Focused Watch Time" value={metrics.formattedFocusedWatchTime || '0m'} icon="🎯" darkMode={settings.darkMode}/>
        <MetricCard title="Focus Percentage" value={metrics.formattedFocusPercentage || '0%'} icon="📊" darkMode={settings.darkMode}/>
        <MetricCard title="Videos Watched" value={String(metrics.videoCount || '0')} icon="🎬" darkMode={settings.darkMode}/>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Recent Watch Sessions</h3>
      
      {recentSessions.length === 0 ? (<div className={"p-4 text-center rounded-lg ".concat(settings.darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500')}>
          No watch sessions recorded yet. Start watching YouTube videos with the extension active!
        </div>) : (<div className={"rounded-lg overflow-hidden ".concat(settings.darkMode ? 'bg-gray-800' : 'bg-gray-50')}>
          <table className="min-w-full divide-y divide-gray-700">
            <thead className={settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Video
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Focus
                </th>
              </tr>
            </thead>
            <tbody className={"divide-y ".concat(settings.darkMode ? 'divide-gray-700' : 'divide-gray-200')}>
              {recentSessions.map(function (session) { return (<tr key={session.id} className={settings.darkMode ? 'bg-gray-800' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium truncate max-w-xs">
                      {session.videoTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {(0, format_1.formatDate)(session.startTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {session.duration ? "".concat(Math.round(session.duration / 60), " min") : 'In progress'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={"text-sm px-2 py-1 rounded-full text-center w-16 ".concat(getFocusColorClass(session.focusPercentage, settings.darkMode))}>
                      {"".concat(Math.round(session.focusPercentage), "%")}
                    </div>
                  </td>
                </tr>); })}
            </tbody>
          </table>
        </div>)}
    </div>);
};
exports.Dashboard = Dashboard;
var MetricCard = function (_a) {
    var title = _a.title, value = _a.value, icon = _a.icon, darkMode = _a.darkMode;
    return (<div className={"p-6 rounded-lg ".concat(darkMode ? 'bg-gray-800' : 'bg-gray-50', " shadow-sm")}>
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <h3 className={"text-sm font-medium ".concat(darkMode ? 'text-gray-400' : 'text-gray-500')}>{title}</h3>
          <p className={"text-2xl font-bold ".concat(darkMode ? 'text-white' : 'text-gray-900')}>{value}</p>
        </div>
      </div>
    </div>);
};
function getFocusColorClass(percentage, darkMode) {
    if (percentage >= 80) {
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
    }
    else if (percentage >= 60) {
        return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
    }
    else if (percentage >= 40) {
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
    }
    else {
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
    }
}
