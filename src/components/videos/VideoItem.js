"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
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
exports.default = VideoItem;
