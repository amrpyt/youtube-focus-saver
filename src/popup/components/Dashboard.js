"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var database_1 = require("../../services/database");
var Dashboard = function (_a) {
    var user = _a.user, onSignOut = _a.onSignOut, onBackToVideos = _a.onBackToVideos;
    var _b = (0, react_1.useState)(null), metrics = _b[0], setMetrics = _b[1];
    var _c = (0, react_1.useState)([]), recentSessions = _c[0], setRecentSessions = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)('overview'), activeView = _e[0], setActiveView = _e[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var dbService, userMetrics, sessions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        dbService = new database_1.DatabaseService();
                        return [4 /*yield*/, dbService.getUserMetrics(user.id)];
                    case 2:
                        userMetrics = _a.sent();
                        if (userMetrics) {
                            setMetrics(userMetrics);
                        }
                        return [4 /*yield*/, dbService.getRecentSessions(user.id, 5)];
                    case 3:
                        sessions = _a.sent();
                        if (sessions) {
                            setRecentSessions(sessions);
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error fetching dashboard data:', error_1);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [user.id]);
    var formatDuration = function (seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return "".concat(hours, "h ").concat(minutes, "m");
        }
        else if (minutes > 0) {
            return "".concat(minutes, "m ").concat(secs, "s");
        }
        else {
            return "".concat(secs, "s");
        }
    };
    return (<div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button onClick={onBackToVideos} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="font-bold text-lg text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {user.email}
          </div>
          <button onClick={onSignOut} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex border-b dark:border-gray-700">
        <button className={"flex-1 py-2 text-center text-sm ".concat(activeView === 'overview'
            ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
            : 'text-gray-600 dark:text-gray-400')} onClick={function () { return setActiveView('overview'); }}>
          Overview
        </button>
        <button className={"flex-1 py-2 text-center text-sm ".concat(activeView === 'sessions'
            ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
            : 'text-gray-600 dark:text-gray-400')} onClick={function () { return setActiveView('sessions'); }}>
          Recent Sessions
        </button>
        <button className={"flex-1 py-2 text-center text-sm ".concat(activeView === 'trends'
            ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
            : 'text-gray-600 dark:text-gray-400')} onClick={function () { return setActiveView('trends'); }}>
          Trends
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (<div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>) : activeView === 'overview' ? (<div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Focus Overview</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Watch Time</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics ? formatDuration(metrics.totalWatchTime) : '0h 0m'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Focus Score</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics ? "".concat(Math.round(metrics.focusScore * 100), "%") : '0%'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Completion Rate</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metrics ? "".concat(Math.round(metrics.completionRate * 100), "%") : '0%'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pause Count</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metrics ? metrics.pauseCount : 0}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tab Switches</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metrics ? metrics.tabSwitchCount : 0}
                </p>
              </div>
            </div>
          </div>) : activeView === 'sessions' ? (<div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Sessions</h2>
            
            {recentSessions.length > 0 ? (<div className="space-y-4">
                {recentSessions.map(function (session) { return (<div key={session.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {session.videoTitle}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>
                        {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>{formatDuration(session.watchDuration)}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm mr-2">Focus Score:</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={"h-2 rounded-full ".concat(session.focusScore > 0.7 ? 'bg-green-500' :
                        session.focusScore > 0.4 ? 'bg-yellow-500' : 'bg-red-500')} style={{ width: "".concat(Math.round(session.focusScore * 100), "%") }}></div>
                      </div>
                      <div className="ml-2 text-sm font-medium">
                        {Math.round(session.focusScore * 100)}%
                      </div>
                    </div>
                  </div>); })}
              </div>) : (<div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No watch sessions recorded yet. Start watching videos to track your focus!
              </div>)}
          </div>) : (<div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Focus Trends</h2>
            
            {/* Placeholder for chart - in a real implementation, you would use a chart library */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-48 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Focus trends visualization will be shown here.<br />
                Coming soon in the next update.
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Your focus has been improving over time. Keep up the good work!</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Best focus time: Mornings (9-11 AM)</li>
                <li>Most watched category: Educational</li>
                <li>Average session length: {metrics ? formatDuration(metrics.totalWatchTime / (recentSessions.length || 1)) : '0m'}</li>
              </ul>
            </div>
          </div>)}
      </div>
    </div>);
};
exports.default = Dashboard;
