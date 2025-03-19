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
var client_1 = require("react-dom/client");
var Layout_1 = require("./components/Layout");
var MetricsOverview_1 = require("./components/MetricsOverview");
var VideoCard_1 = require("./components/VideoCard");
// Import global styles
require("../styles/tailwind.css");
var Dashboard = function () {
    var _a = (0, react_1.useState)([]), videos = _a[0], setVideos = _a[1];
    var _b = (0, react_1.useState)({
        totalWatchTime: 0,
        averageFocusScore: 0,
        averageCompletionRate: 0,
        totalVideosWatched: 0
    }), metrics = _b[0], setMetrics = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(true), isMetricsLoading = _d[0], setIsMetricsLoading = _d[1];
    // Load mock data immediately without delay
    (0, react_1.useEffect)(function () {
        try {
            // Get runtime URL for icon to use as fallback
            var iconUrl = chrome.runtime.getURL('icons/icon128.png');
            console.log('Icon URL:', iconUrl);
            // Mock videos data with local icons
            var mockVideos = [
                {
                    id: '1',
                    videoId: 'dQw4w9WgXcQ',
                    title: 'Introduction to React Hooks',
                    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                    thumbnailUrl: iconUrl,
                    channelName: 'React Tutorials',
                    dateAdded: Date.now() - 86400000,
                    watchDuration: 1245,
                    focusScore: 0.85
                },
                {
                    id: '2',
                    videoId: 'Ke90Tje7VS0',
                    title: 'TypeScript for Beginners',
                    url: 'https://youtube.com/watch?v=Ke90Tje7VS0',
                    thumbnailUrl: iconUrl,
                    channelName: 'Programming with TS',
                    dateAdded: Date.now() - 172800000,
                    watchDuration: 2874,
                    focusScore: 0.72
                },
                {
                    id: '3',
                    videoId: 'X7IBa7vZjmo',
                    title: 'Design Systems with Tailwind CSS',
                    url: 'https://youtube.com/watch?v=X7IBa7vZjmo',
                    thumbnailUrl: iconUrl,
                    channelName: 'Frontend Masters',
                    dateAdded: Date.now() - 259200000,
                    watchDuration: 1782,
                    focusScore: 0.91
                },
                {
                    id: '4',
                    videoId: 'jS4aFq5-91M',
                    title: 'Next.js App Router Tutorial',
                    url: 'https://youtube.com/watch?v=jS4aFq5-91M',
                    thumbnailUrl: iconUrl,
                    channelName: 'Next.js Official',
                    dateAdded: Date.now() - 345600000,
                    watchDuration: 4320,
                    focusScore: 0.65
                }
            ];
            console.log('Setting mock videos:', mockVideos);
            setVideos(mockVideos);
            setIsLoading(false);
            // Mock metrics data
            var mockMetrics = {
                totalWatchTime: 10221,
                averageFocusScore: 0.78,
                averageCompletionRate: 0.83,
                totalVideosWatched: 24
            };
            console.log('Setting mock metrics:', mockMetrics);
            setMetrics(mockMetrics);
            setIsMetricsLoading(false);
        }
        catch (error) {
            console.error('Error loading mock data:', error);
            // Set data anyway to ensure UI renders
            setIsLoading(false);
            setIsMetricsLoading(false);
        }
    }, []);
    var handleViewVideo = function (id) {
        console.log("View video details for ID: ".concat(id));
    };
    return (<Layout_1.default>
      <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Dashboard</h2>
          <MetricsOverview_1.default metrics={metrics} isLoading={isMetricsLoading}/>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Recent Videos</h2>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 h-9 px-4">
              View All
            </button>
          </div>
          
          {isLoading ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {__spreadArray([], Array(4), true).map(function (_, i) { return (<div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between mt-4">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>); })}
            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.length === 0 ? (<div className="col-span-full text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No videos found</p>
                </div>) : (videos.map(function (video) { return (<VideoCard_1.default key={video.id} id={video.id} title={video.title} channelName={video.channelName} thumbnailUrl={video.thumbnailUrl} dateAdded={video.dateAdded} watchDuration={video.watchDuration} focusScore={video.focusScore} onView={handleViewVideo}/>); }))}
            </div>)}
        </div>
        
        <div className="pb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Focus Insights</h2>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4">
              <p>Based on your focus metrics, you focus best during videos that are 10-15 minutes long.</p>
              <p className="font-medium text-gray-900 dark:text-white">Recommendations:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Try watching videos in the morning to improve focus</li>
                <li>Videos from "React Tutorials" channel show your highest engagement</li>
                <li>Consider enabling fewer browser tabs while watching to reduce distractions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout_1.default>);
};
// Use React 18's createRoot API
document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('root');
    if (container) {
        var root = (0, client_1.createRoot)(container);
        root.render(<react_1.default.StrictMode>
        <Dashboard />
      </react_1.default.StrictMode>);
    }
    else {
        console.error('Root element not found');
    }
});
