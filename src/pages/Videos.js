"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var VideoContext_1 = require("../contexts/VideoContext");
var VideoItem = function (_a) {
    var video = _a.video, isSelected = _a.isSelected, onClick = _a.onClick;
    return (<div className={"border rounded-md overflow-hidden cursor-pointer transition-shadow hover:shadow-md ".concat(isSelected ? 'ring-2 ring-red-500' : '')} onClick={onClick}>
      <div className="relative pb-[56.25%]">
        <img src={video.thumbnailUrl} alt={video.title} className="absolute h-full w-full object-cover"/>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{video.channelName}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            {new Date(video.dateAdded).toLocaleDateString()}
          </span>
          <span className={"text-xs px-2 py-1 rounded-full ".concat(video.status === 'saved' ? 'bg-blue-100 text-blue-800' :
            video.status === 'watched' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800')}>
            {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
          </span>
        </div>
      </div>
    </div>);
};
var VideoDetails = function (_a) {
    var video = _a.video, onClose = _a.onClose;
    var _b = (0, react_1.useState)('details'), activeTab = _b[0], setActiveTab = _b[1];
    var updateVideo = (0, VideoContext_1.useVideos)().updateVideo;
    var handleStatusChange = function (status) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateVideo(__assign(__assign({}, video), { status: status }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var openVideo = function () {
        window.open(video.url, '_blank');
    };
    return (<div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative pb-[56.25%] bg-gray-900">
        <img src={video.thumbnailUrl} alt={video.title} className="absolute h-full w-full object-cover"/>
        <button onClick={onClose} className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
        <p className="text-sm text-gray-700 mt-1">{video.channelName}</p>
        
        <div className="flex justify-between items-center mt-4">
          <button onClick={openVideo} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Open in YouTube
          </button>
          
          <div className="flex items-center space-x-2">
            <select value={video.status} onChange={function (e) { return handleStatusChange(e.target.value); }} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
              <option value="saved">Saved</option>
              <option value="processing">Processing</option>
              <option value="watched">Watched</option>
            </select>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mt-6">
          <nav className="-mb-px flex" aria-label="Tabs">
            {['details', 'transcript', 'summary'].map(function (tab) { return (<button key={tab} onClick={function () { return setActiveTab(tab); }} className={"".concat(activeTab === tab
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', " whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm capitalize")}>
                {tab}
              </button>); })}
          </nav>
        </div>
        
        <div className="mt-4">
          {activeTab === 'details' && (<div className="prose max-w-none">
              <p>{video.description || 'No description available.'}</p>
            </div>)}
          
          {activeTab === 'transcript' && (<div className="prose max-w-none">
              {video.transcript ? (<p>{video.transcript}</p>) : (<p className="text-gray-500 italic">No transcript available.</p>)}
            </div>)}
          
          {activeTab === 'summary' && (<div className="prose max-w-none">
              {video.summary ? (<p>{video.summary}</p>) : (<p className="text-gray-500 italic">No summary available.</p>)}
            </div>)}
        </div>
      </div>
    </div>);
};
var Videos = function () {
    var _a = (0, VideoContext_1.useVideos)(), videos = _a.videos, loading = _a.loading, error = _a.error, selectedVideo = _a.selectedVideo, setSelectedVideo = _a.setSelectedVideo;
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)('all'), statusFilter = _c[0], setStatusFilter = _c[1];
    var filteredVideos = videos.filter(function (video) {
        var matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.channelName.toLowerCase().includes(searchTerm.toLowerCase());
        var matchesStatus = statusFilter === 'all' || video.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
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
            <h3 className="text-sm font-medium text-red-800">Error loading videos</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Your Saved Videos</h1>
      
      <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </div>
            <input type="text" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Search videos..."/>
          </div>
        </div>
        
        <div>
          <select value={statusFilter} onChange={function (e) { return setStatusFilter(e.target.value); }} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
            <option value="all">All Status</option>
            <option value="saved">Saved</option>
            <option value="processing">Processing</option>
            <option value="watched">Watched</option>
          </select>
        </div>
      </div>
      
      {filteredVideos.length === 0 ? (<div className="mt-16 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No videos found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by saving YouTube videos while watching them.'}
          </p>
        </div>) : (<div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map(function (video) { return (<VideoItem key={video.id} video={video} isSelected={(selectedVideo === null || selectedVideo === void 0 ? void 0 : selectedVideo.id) === video.id} onClick={function () { return setSelectedVideo(video); }}/>); })}
          </div>
        </div>)}
      
      {selectedVideo && (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div className="max-w-4xl w-full">
            <VideoDetails video={selectedVideo} onClose={function () { return setSelectedVideo(null); }}/>
          </div>
        </div>)}
    </div>);
};
exports.default = Videos;
