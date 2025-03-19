"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoDetails = void 0;
var react_1 = require("react");
var hooks_1 = require("../hooks");
var format_1 = require("../utils/format");
var VideoDetails = function () {
    var _a = (0, hooks_1.useVideos)(), selectedVideo = _a.selectedVideo, deleteVideo = _a.deleteVideo, syncVideoToCloud = _a.syncVideoToCloud;
    var settings = (0, hooks_1.useSettings)().settings;
    var isAuthenticated = (0, hooks_1.useAuth)().isAuthenticated;
    var _b = (0, react_1.useState)('info'), activeTab = _b[0], setActiveTab = _b[1];
    if (!selectedVideo)
        return null;
    var handleDeleteVideo = function () {
        if (window.confirm('Are you sure you want to delete this video?')) {
            deleteVideo(selectedVideo.videoId);
        }
    };
    var handleSyncVideo = function () {
        syncVideoToCloud(selectedVideo.videoId)
            .then(function () {
            alert('Video synced to cloud successfully!');
        })
            .catch(function (error) {
            alert("Failed to sync video: ".concat(error.message));
        });
    };
    var handleOpenVideo = function () {
        window.open(selectedVideo.url, '_blank');
    };
    return (<div className={"flex-1 overflow-y-auto ".concat(settings.darkMode ? 'bg-gray-900' : 'bg-white')}>
      <div className="p-4">
        <div className="flex mb-4">
          <div className="mr-4">
            <img src={selectedVideo.thumbnailUrl} alt={selectedVideo.title} className="w-32 h-24 object-cover rounded"/>
          </div>
          <div className="flex-1">
            <h2 className={"text-lg font-semibold ".concat(settings.darkMode ? 'text-white' : 'text-gray-900')}>
              {selectedVideo.title}
            </h2>
            <p className={"text-sm ".concat(settings.darkMode ? 'text-gray-400' : 'text-gray-600')}>
              {selectedVideo.channelName}
            </p>
            <p className={"text-xs mt-1 ".concat(settings.darkMode ? 'text-gray-500' : 'text-gray-500')}>
              Saved on {(0, format_1.formatDate)(selectedVideo.dateAdded)}
            </p>
            <div className="mt-2 flex space-x-2">
              <button onClick={handleOpenVideo} className="px-3 py-1 text-xs text-white bg-red-600 hover:bg-red-700 rounded">
                Open in YouTube
              </button>
              
              {isAuthenticated && selectedVideo.syncStatus !== 'synced' && (<button onClick={handleSyncVideo} className="px-3 py-1 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded">
                  Sync to Cloud
                </button>)}
              
              <button onClick={handleDeleteVideo} className={"px-3 py-1 text-xs rounded ".concat(settings.darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}>
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className={"flex border-b ".concat(settings.darkMode ? 'border-gray-700' : 'border-gray-200')}>
            <button className={"py-2 px-4 text-sm font-medium ".concat(activeTab === 'info'
            ? (settings.darkMode
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-indigo-600 border-b-2 border-indigo-600')
            : (settings.darkMode ? 'text-gray-400' : 'text-gray-500'))} onClick={function () { return setActiveTab('info'); }}>
              Information
            </button>
            
            {selectedVideo.transcript && (<button className={"py-2 px-4 text-sm font-medium ".concat(activeTab === 'transcript'
                ? (settings.darkMode
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-indigo-600 border-b-2 border-indigo-600')
                : (settings.darkMode ? 'text-gray-400' : 'text-gray-500'))} onClick={function () { return setActiveTab('transcript'); }}>
                Transcript
              </button>)}
            
            {selectedVideo.summary && (<button className={"py-2 px-4 text-sm font-medium ".concat(activeTab === 'summary'
                ? (settings.darkMode
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-indigo-600 border-b-2 border-indigo-600')
                : (settings.darkMode ? 'text-gray-400' : 'text-gray-500'))} onClick={function () { return setActiveTab('summary'); }}>
                Summary
              </button>)}
          </div>
          
          <div className="py-4">
            {activeTab === 'info' && (<div className={"".concat(settings.darkMode ? 'text-gray-300' : 'text-gray-700')}>
                {selectedVideo.description ? (<p className="text-sm whitespace-pre-line">{selectedVideo.description}</p>) : (<p className="text-sm text-gray-500 italic">No description available</p>)}
              </div>)}
            
            {activeTab === 'transcript' && (<div className={"".concat(settings.darkMode ? 'text-gray-300' : 'text-gray-700')}>
                {selectedVideo.transcript ? (<p className="text-sm whitespace-pre-line">{selectedVideo.transcript}</p>) : (<p className="text-sm text-gray-500 italic">No transcript available</p>)}
              </div>)}
            
            {activeTab === 'summary' && (<div className={"".concat(settings.darkMode ? 'text-gray-300' : 'text-gray-700')}>
                {selectedVideo.summary ? (<p className="text-sm whitespace-pre-line">{selectedVideo.summary}</p>) : (<p className="text-sm text-gray-500 italic">No summary available</p>)}
              </div>)}
          </div>
        </div>
      </div>
    </div>);
};
exports.VideoDetails = VideoDetails;
