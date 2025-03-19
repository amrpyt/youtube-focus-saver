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
var client_1 = require("react-dom/client");
require("../styles/tailwind.css");
var auth_1 = require("../services/auth");
var App_1 = require("./App");
require("./index.css");
var contexts_1 = require("../contexts");
// Simple video item component with Apple HIG inspired design
var VideoItem = function (_a) {
    var video = _a.video;
    var openVideo = function () {
        chrome.tabs.create({ url: video.url });
    };
    return (<button onClick={openVideo} className="w-full flex items-start gap-3 p-3 text-left rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
      <div className="relative w-24 h-14 rounded-md overflow-hidden flex-shrink-0">
        <img src={video.thumbnailUrl || 'default-thumbnail.jpg'} alt={video.title} className="w-full h-full object-cover"/>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate leading-tight">{video.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{video.channelName}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {new Date(video.dateAdded).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        })}
        </p>
      </div>
      {video.syncStatus && (<div className="flex-shrink-0">
          {video.syncStatus === 'synced' && (<span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-600/30">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-1"></span>
              Synced
            </span>)}
          {video.syncStatus === 'pending' && (<span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300 ring-1 ring-inset ring-yellow-700/10 dark:ring-yellow-600/30">
              <span className="inline-block w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-1"></span>
              Pending
            </span>)}
        </div>)}
    </button>);
};
// Simple empty state component
var EmptyState = function () { return (<div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    </div>
    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No saved videos</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">
      Watch YouTube videos and they'll appear here automatically
    </p>
  </div>); };
// Add a safe transcript rendering function to handle all possible cases
var renderTranscript = function (transcript) {
    if (!transcript) {
        return <p>No transcript available</p>;
    }
    if (Array.isArray(transcript)) {
        return (<div>
        {transcript.map(function (line, index) { return (<p key={index} className="mb-2">{line}</p>); })}
      </div>);
    }
    if (typeof transcript === 'string') {
        return <p>{transcript}</p>;
    }
    return <p>No transcript available</p>;
};
// Main app component
var App = function () {
    var _a = (0, react_1.useState)([]), videos = _a[0], setVideos = _a[1];
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(false), settingsLoaded = _d[0], setSettingsLoaded = _d[1];
    var _e = (0, react_1.useState)(false), cloudSyncEnabled = _e[0], setCloudSyncEnabled = _e[1];
    // Dashboard URL - this would be your deployed web app
    var dashboardUrl = chrome.runtime.getURL('dashboard.html');
    // Load videos and settings when component mounts
    (0, react_1.useEffect)(function () {
        var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, auth_1.authService.getCurrentUser()];
                    case 2:
                        currentUser = _a.sent();
                        setUser(currentUser);
                        // Load videos
                        chrome.storage.local.get('youtubeFocusSaver:videos', function (result) {
                            var loadedVideos = result['youtubeFocusSaver:videos'] || [];
                            setVideos(loadedVideos);
                        });
                        // Check if cloud sync is enabled
                        chrome.storage.local.get('youtubeFocusSaver:settings', function (result) {
                            var loadedSettings = result['youtubeFocusSaver:settings'];
                            if (loadedSettings) {
                                setCloudSyncEnabled(loadedSettings.cloudSyncEnabled || false);
                            }
                            setSettingsLoaded(true);
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error loading data:', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadData();
    }, []);
    // Apply theme based on system preference
    (0, react_1.useEffect)(function () {
        var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        var handleChange = function () {
            if (mediaQuery.matches) {
                document.documentElement.classList.add('dark');
            }
            else {
                document.documentElement.classList.remove('dark');
            }
        };
        // Set initial theme
        handleChange();
        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);
        return function () { return mediaQuery.removeEventListener('change', handleChange); };
    }, []);
    // Open dashboard in new tab
    var openDashboard = function () {
        chrome.tabs.create({ url: dashboardUrl });
    };
    return (<div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-sm font-semibold">YouTube Focus Saver</h1>
        <button onClick={openDashboard} className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 h-8 px-3">
          Open Dashboard
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (<div className="flex justify-center items-center h-full py-8">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500"></div>
          </div>) : videos.length > 0 ? (<div className="py-1 divide-y divide-gray-100 dark:divide-gray-800">
            {videos.map(function (video) { return (<VideoItem key={video.id} video={video}/>); })}
          </div>) : (<EmptyState />)}
      </div>

      {/* Footer with sync status */}
      {settingsLoaded && cloudSyncEnabled && (<div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            {user ? (<>
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                <span>Synced</span>
              </>) : (<>
                <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                <span>Cloud sync off</span>
              </>)}
          </div>
          <button onClick={openDashboard} className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            Manage
          </button>
        </div>)}
    </div>);
};
// Create root element
var rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Root element not found');
var root = (0, client_1.createRoot)(rootElement);
// Render the app
root.render(<react_1.default.StrictMode>
    <contexts_1.AppProvider>
      <App_1.default />
    </contexts_1.AppProvider>
  </react_1.default.StrictMode>);
