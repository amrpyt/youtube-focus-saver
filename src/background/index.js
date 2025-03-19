"use strict";
/**
 * Background Script for YouTube Focus Saver
 *
 * This script runs in the background and:
 * 1. Listens for tab updates to detect YouTube video pages
 * 2. Handles syncing with Supabase if enabled
 * 3. Manages API requests to Gemini for summaries
 */
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
// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var _a;
    if (changeInfo.status === 'complete' && ((_a = tab.url) === null || _a === void 0 ? void 0 : _a.includes('youtube.com/watch'))) {
        chrome.tabs.sendMessage(tabId, {
            type: 'NEW_VIDEO',
            videoId: new URL(tab.url).searchParams.get('v')
        });
    }
});
// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'SAVE_VIDEO') {
        console.log('Background received request to save video:', message.videoData);
        // Store video in local storage
        chrome.storage.local.get(['videos'], function (result) {
            var videos = result.videos || [];
            var existingVideoIndex = videos.findIndex(function (v) { return v.videoId === message.videoData.videoId; });
            if (existingVideoIndex >= 0) {
                // Update existing video
                videos[existingVideoIndex] = __assign(__assign({}, videos[existingVideoIndex]), message.videoData);
            }
            else {
                // Add new video
                videos.push(message.videoData);
            }
            chrome.storage.local.set({ videos: videos }, function () {
                sendResponse({ success: true });
            });
        });
        return true; // Keep sendResponse valid
    }
});
/**
 * Handle a newly saved video
 */
function handleNewVideo(video) {
    return __awaiter(this, void 0, void 0, function () {
        var settings, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserSettings()];
                case 1:
                    settings = _a.sent();
                    // Check if Supabase sync is enabled
                    if (settings.cloudSyncEnabled) {
                        syncVideoToSupabase(video);
                    }
                    // Check if AI summaries are enabled
                    if (settings.generateSummaries && video.transcript && video.transcript.length > 0) {
                        generateVideoSummary(video);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error handling new video:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Get user settings from storage
 */
function getUserSettings() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    chrome.storage.local.get('youtubeFocusSaver:settings', function (result) {
                        var defaultSettings = {
                            cloudSyncEnabled: false,
                            autoSaveVideos: true,
                            darkMode: 'system',
                            generateSummaries: false,
                            apiKeys: {},
                            notifications: {
                                enabled: true,
                                frequency: 'always'
                            }
                        };
                        var settings = result['youtubeFocusSaver:settings'] || defaultSettings;
                        resolve(settings);
                    });
                })];
        });
    });
}
/**
 * Sync a video to Supabase if integration is enabled
 */
function syncVideoToSupabase(video) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // This would be implemented when Supabase integration is added
                console.log('Syncing video to Supabase:', video.id);
                // Update sync status in local storage
                updateVideoSyncStatus(video.id, 'synced');
            }
            catch (error) {
                console.error('Error syncing to Supabase:', error);
                updateVideoSyncStatus(video.id, 'failed');
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Update the sync status of a video
 */
function updateVideoSyncStatus(videoId, status) {
    chrome.storage.local.get('youtubeFocusSaver:videos', function (result) {
        var videos = result['youtubeFocusSaver:videos'] || [];
        var videoIndex = videos.findIndex(function (v) { return v.id === videoId; });
        if (videoIndex >= 0) {
            videos[videoIndex].syncStatus = status;
            chrome.storage.local.set({ 'youtubeFocusSaver:videos': videos });
        }
    });
}
/**
 * Generate an AI summary of the video using Gemini API
 */
function generateVideoSummary(video) {
    return __awaiter(this, void 0, void 0, function () {
        var settings, apiKey, summary, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserSettings()];
                case 1:
                    settings = _a.sent();
                    apiKey = settings.apiKeys.gemini;
                    if (!apiKey) {
                        console.warn('Gemini API key not configured. Skipping summary generation.');
                        return [2 /*return*/];
                    }
                    // This would call the Gemini API to generate a summary
                    console.log('Generating summary for video:', video.id);
                    summary = 'AI summary will be generated here when Gemini API is integrated.';
                    // Update video with summary
                    updateVideoWithSummary(video.id, summary);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error generating summary:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Update a video with its AI-generated summary
 */
function updateVideoWithSummary(videoId, summary) {
    chrome.storage.local.get('youtubeFocusSaver:videos', function (result) {
        var videos = result['youtubeFocusSaver:videos'] || [];
        var videoIndex = videos.findIndex(function (v) { return v.id === videoId; });
        if (videoIndex >= 0) {
            videos[videoIndex].summary = summary;
            chrome.storage.local.set({ 'youtubeFocusSaver:videos': videos });
        }
    });
}
// Initialize extension when installed or updated
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        // First-time installation
        var defaultSettings = {
            cloudSyncEnabled: false,
            autoSaveVideos: true,
            darkMode: 'system',
            generateSummaries: false,
            apiKeys: {},
            notifications: {
                enabled: true,
                frequency: 'always'
            }
        };
        // Save default settings
        chrome.storage.local.set({ 'youtubeFocusSaver:settings': defaultSettings });
        // Initialize videos array
        chrome.storage.local.set({ 'youtubeFocusSaver:videos': [] });
        // Log installation
        console.log('YouTube Focus Saver installed successfully!');
    }
    else if (details.reason === 'update') {
        // Extension was updated
        console.log('YouTube Focus Saver updated successfully!');
    }
});
