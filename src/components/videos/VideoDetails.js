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
var Button_1 = require("../common/Button");
var VideoContext_1 = require("../../contexts/VideoContext");
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
          <Button_1.default onClick={openVideo} variant="primary">
            Open in YouTube
          </Button_1.default>
          
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
exports.default = VideoDetails;
