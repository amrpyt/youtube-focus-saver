"use strict";
/// <reference types="vite/client" />
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
var YouTubeService = /** @class */ (function () {
    function YouTubeService(config) {
        var _a;
        this.apiKey = ((_a = import.meta.env) === null || _a === void 0 ? void 0 : _a.VITE_YOUTUBE_API_KEY) || (config === null || config === void 0 ? void 0 : config.apiKey) || '';
    }
    // Add ID property to the returned object
    YouTubeService.prototype.getVideoDetails = function (inputVideoId) {
        return __awaiter(this, void 0, void 0, function () {
            var dateAdded, videoId, title, url, thumbnailUrl, channelName, description;
            return __generator(this, function (_a) {
                try {
                    // Mock video details fetch for now
                    console.log("Fetching video details for ".concat(inputVideoId));
                    dateAdded = new Date().toISOString();
                    videoId = inputVideoId || "dQw4w9WgXcQ";
                    title = "Sample Video Title";
                    url = "https://www.youtube.com/watch?v=".concat(videoId);
                    thumbnailUrl = "https://img.youtube.com/vi/".concat(videoId, "/maxresdefault.jpg");
                    channelName = "Sample Channel";
                    description = "This is a sample video description.";
                    return [2 /*return*/, {
                            id: Math.random().toString(36).substring(2, 15), // Generate a random ID
                            videoId: videoId,
                            title: title,
                            url: url,
                            thumbnailUrl: thumbnailUrl,
                            channelName: channelName,
                            description: description,
                            dateAdded: dateAdded,
                            status: 'saved',
                        }];
                }
                catch (error) {
                    console.error("Error fetching video details:", error);
                    throw new Error("Failed to fetch video details");
                }
                return [2 /*return*/];
            });
        });
    };
    // This would be done server-side in a real implementation
    YouTubeService.prototype.getTranscript = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // This is a placeholder - actual transcript fetching requires
                    // either YouTube Data API captions endpoint or a third-party service
                    console.warn('Transcript fetching not implemented in client-side service');
                    return [2 /*return*/, null];
                }
                catch (error) {
                    console.error('Error fetching transcript:', error);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    // Generate a summary (placeholder - would be done by an AI service)
    YouTubeService.prototype.generateSummary = function (videoId, transcript) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // This is a placeholder - actual summary generation would use
                    // an AI service like OpenAI's GPT API
                    console.warn('Summary generation not implemented in client-side service');
                    return [2 /*return*/, null];
                }
                catch (error) {
                    console.error('Error generating summary:', error);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    return YouTubeService;
}());
exports.default = new YouTubeService();
