"use strict";
/**
 * YouTube Service
 *
 * A hybrid service that combines:
 * 1. Official YouTube Data API v3 for metadata
 * 2. Transcript extraction for captions
 */
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
exports.YouTubeService = void 0;
var YouTubeService = /** @class */ (function () {
    function YouTubeService(config) {
        if (config === void 0) { config = {}; }
        this.config = config;
    }
    /**
     * Extract YouTube video ID from URL
     */
    YouTubeService.prototype.extractVideoId = function (url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };
    /**
     * Get complete video data including metadata and transcript
     */
    YouTubeService.prototype.getCompleteVideoData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var videoId, result, _a, error_1, _b, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        videoId = this.extractVideoId(url);
                        if (!videoId) {
                            throw new Error("Could not extract video ID from URL");
                        }
                        result = {
                            videoId: videoId,
                            url: url
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (!this.config.apiKey) return [3 /*break*/, 3];
                        _a = result;
                        return [4 /*yield*/, this.fetchVideoMetadataFromApi(videoId)];
                    case 2:
                        _a.metadata = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // Fallback to DOM extraction
                        result.metadata = this.extractMetadataFromPage();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        console.error("Error fetching video metadata:", error_1);
                        // Fallback to DOM extraction if API fails
                        result.metadata = this.extractMetadataFromPage();
                        return [3 /*break*/, 6];
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        // Get transcript
                        _b = result;
                        return [4 /*yield*/, this.fetchTranscript(videoId)];
                    case 7:
                        // Get transcript
                        _b.transcript = _c.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _c.sent();
                        console.error("Error fetching transcript:", error_2);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Fetch video metadata using YouTube API
     */
    YouTubeService.prototype.fetchVideoMetadataFromApi = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, item, snippet, metadata, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.apiKey) {
                            throw new Error("YouTube API key not configured");
                        }
                        url = "https://www.googleapis.com/youtube/v3/videos?id=".concat(videoId, "&part=snippet,contentDetails,statistics&key=").concat(this.config.apiKey);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("YouTube API returned ".concat(response.status, ": ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        if (!data.items || data.items.length === 0) {
                            throw new Error("No video found with the given ID");
                        }
                        item = data.items[0];
                        snippet = item.snippet;
                        metadata = {
                            videoId: videoId,
                            title: snippet.title,
                            description: snippet.description,
                            thumbnails: snippet.thumbnails,
                            channelTitle: snippet.channelTitle,
                            publishedAt: snippet.publishedAt,
                            tags: snippet.tags || []
                        };
                        if (item.contentDetails) {
                            metadata.duration = item.contentDetails.duration;
                        }
                        if (item.statistics) {
                            metadata.viewCount = parseInt(item.statistics.viewCount, 10) || 0;
                            metadata.likeCount = parseInt(item.statistics.likeCount, 10) || 0;
                        }
                        return [2 /*return*/, metadata];
                    case 4:
                        error_3 = _a.sent();
                        console.error("Error fetching from YouTube API:", error_3);
                        throw error_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Extract metadata directly from the YouTube page DOM
     */
    YouTubeService.prototype.extractMetadataFromPage = function () {
        var _a, _b;
        // Basic fallback when API is not available
        var metadata = {
            videoId: this.extractVideoId(window.location.href) || "",
            title: document.title.replace(" - YouTube", ""),
            description: "",
            thumbnails: {},
            channelTitle: "",
            publishedAt: new Date().toISOString()
        };
        // Try to get channel name
        var channelElement = document.querySelector("ytd-video-owner-renderer .ytd-channel-name a");
        if (channelElement) {
            metadata.channelTitle = ((_a = channelElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        }
        // Try to get description (simplified, might need adjustments based on YouTube's DOM)
        var descriptionElement = document.querySelector("#description-inline-expander");
        if (descriptionElement) {
            metadata.description = ((_b = descriptionElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        }
        // Try to get thumbnails
        var thumbnailUrl = "https://i.ytimg.com/vi/".concat(metadata.videoId, "/hqdefault.jpg");
        metadata.thumbnails = {
            default: { url: "https://i.ytimg.com/vi/".concat(metadata.videoId, "/default.jpg"), width: 120, height: 90 },
            medium: { url: "https://i.ytimg.com/vi/".concat(metadata.videoId, "/mqdefault.jpg"), width: 320, height: 180 },
            high: { url: thumbnailUrl, width: 480, height: 360 }
        };
        return metadata;
    };
    /**
     * Fetch video transcript
     */
    YouTubeService.prototype.fetchTranscript = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var transcript, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getTranscriptFromCurrentTrack()];
                    case 1:
                        transcript = _a.sent();
                        if (transcript && transcript.length > 0) {
                            return [2 /*return*/, transcript];
                        }
                        return [4 /*yield*/, this.getAutoGeneratedTranscript()];
                    case 2:
                        // If that fails, try to get auto-generated transcript
                        transcript = _a.sent();
                        return [2 /*return*/, transcript || []];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error fetching transcript:", error_4);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get transcript from the currently selected caption track
     */
    YouTubeService.prototype.getTranscriptFromCurrentTrack = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        // This is a simplified implementation
                        // In a real extension, you would need to interact with YouTube's caption system
                        // For simplicity, we'll try to extract captions from the DOM
                        var captionWindows = document.querySelectorAll(".ytp-caption-segment");
                        if (captionWindows && captionWindows.length > 0) {
                            var transcript_1 = [];
                            // Rough timestamp estimation - this would need refinement in a real app
                            var currentTime_1 = 0;
                            captionWindows.forEach(function (caption) {
                                var text = caption.textContent || "";
                                if (text.trim()) {
                                    transcript_1.push({
                                        text: text.trim(),
                                        start: currentTime_1,
                                        duration: 2 // Assuming 2 seconds per caption segment
                                    });
                                    currentTime_1 += 2;
                                }
                            });
                            resolve(transcript_1);
                        }
                        else {
                            // If no captions in DOM, we can't get them this way
                            resolve([]);
                        }
                    })];
            });
        });
    };
    /**
     * Get auto-generated transcript if available
     */
    YouTubeService.prototype.getAutoGeneratedTranscript = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // In a real implementation, this would interact with YouTube's
                // transcript API or parse the transcript data from the page
                // For now, this is a placeholder that returns an empty array
                // A real implementation would need to use Chrome extension capabilities
                // to extract transcript data from YouTube's internal API
                return [2 /*return*/, []];
            });
        });
    };
    return YouTubeService;
}());
exports.YouTubeService = YouTubeService;
