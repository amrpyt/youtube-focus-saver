"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MetricsOverview = function (_a) {
    var metrics = _a.metrics, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    var formatDuration = function (seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return "".concat(hours, "h ").concat(minutes, "m");
        }
        else {
            return "".concat(minutes, "m");
        }
    };
    if (isLoading) {
        return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {__spreadArray([], Array(4), true).map(function (_, i) { return (<div key={i} className="h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded mb-3"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-8 w-20 rounded mt-5"></div>
          </div>); })}
      </div>);
    }
    var getScoreColor = function (score) {
        if (score > 0.7)
            return 'bg-emerald-500';
        if (score > 0.4)
            return 'bg-amber-500';
        return 'bg-rose-500';
    };
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Watch Time</div>
        <div className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
          {formatDuration(metrics.totalWatchTime)}
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Focus Score</div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            {Math.round(metrics.averageFocusScore * 100)}%
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-1">
            <div className={"h-full ".concat(getScoreColor(metrics.averageFocusScore))} style={{ width: "".concat(Math.round(metrics.averageFocusScore * 100), "%") }}></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            {Math.round(metrics.averageCompletionRate * 100)}%
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-1">
            <div className="h-full bg-blue-500" style={{ width: "".concat(Math.round(metrics.averageCompletionRate * 100), "%") }}></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Videos Watched</div>
        <div className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
          {metrics.totalVideosWatched}
        </div>
      </div>
    </div>);
};
exports.default = MetricsOverview;
