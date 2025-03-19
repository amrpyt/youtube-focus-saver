"use strict";
/**
 * Content Script for YouTube Focus Saver
 *
 * This script runs on YouTube pages and extracts video information.
 * It detects when users are watching a video and automatically
 * saves the video data for later viewing.
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
var youtube_1 = require("../services/youtube");
var auth_1 = require("../services/auth");
var database_1 = require("../services/database");
// Initialize services
var youtubeService = new youtube_1.YouTubeService();
var dbService = new database_1.DatabaseService();
// Track processed videos to avoid duplicates
var processedVideos = new Set();
// Track watch sessions
var currentWatchSession = null;
// Track focus metrics
var focusMetrics = {
    tabSwitches: 0,
    pauses: 0,
    rewinds: 0
};
/**
 * Save video data to extension storage and Supabase
 */
function saveVideoData(data) {
    return __awaiter(this, void 0, void 0, function () {
        var id_1, videoToSave_1, currentUser, supabaseVideoData, savedVideo, error_1;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    _p.trys.push([0, 4, , 5]);
                    id_1 = data.videoId;
                    videoToSave_1 = {
                        videoId: data.videoId,
                        title: ((_a = data.metadata) === null || _a === void 0 ? void 0 : _a.title) || 'Unknown Title',
                        url: data.url,
                        thumbnailUrl: ((_d = (_c = (_b = data.metadata) === null || _b === void 0 ? void 0 : _b.thumbnails) === null || _c === void 0 ? void 0 : _c.medium) === null || _d === void 0 ? void 0 : _d.url) || '',
                        channelName: ((_e = data.metadata) === null || _e === void 0 ? void 0 : _e.channelTitle) || 'Unknown Channel',
                        description: ((_f = data.metadata) === null || _f === void 0 ? void 0 : _f.description) || '',
                        transcript: JSON.stringify(data.transcript || []),
                        dateAdded: Date.now(),
                        status: 'saved'
                    };
                    // Save to Chrome storage regardless of login status
                    // This ensures videos are saved even if user isn't logged in yet
                    chrome.storage.local.get('youtubeFocusSaver:videos', function (result) {
                        var videos = result['youtubeFocusSaver:videos'] || [];
                        // Check if video already exists
                        var existingIndex = videos.findIndex(function (v) { return v.videoId === id_1; });
                        if (existingIndex >= 0) {
                            // Update existing video
                            videos[existingIndex] = __assign(__assign(__assign({}, videos[existingIndex]), videoToSave_1), { dateAdded: videos[existingIndex].dateAdded });
                        }
                        else {
                            // Add new video
                            videos.push(videoToSave_1);
                        }
                        // Save back to storage
                        chrome.storage.local.set({ 'youtubeFocusSaver:videos': videos }, function () {
                            console.log('Video saved to local storage:', videoToSave_1.title);
                        });
                    });
                    return [4 /*yield*/, ensureAuth()];
                case 1:
                    currentUser = _p.sent();
                    if (!currentUser) return [3 /*break*/, 3];
                    supabaseVideoData = {
                        user_id: currentUser.id,
                        video_id: data.videoId,
                        title: ((_g = data.metadata) === null || _g === void 0 ? void 0 : _g.title) || 'Unknown Title',
                        description: ((_h = data.metadata) === null || _h === void 0 ? void 0 : _h.description) || '',
                        thumbnail_url: ((_l = (_k = (_j = data.metadata) === null || _j === void 0 ? void 0 : _j.thumbnails) === null || _k === void 0 ? void 0 : _k.medium) === null || _l === void 0 ? void 0 : _l.url) || '',
                        channel_name: ((_m = data.metadata) === null || _m === void 0 ? void 0 : _m.channelTitle) || 'Unknown Channel',
                        duration: ((_o = data.metadata) === null || _o === void 0 ? void 0 : _o.duration) || 0,
                        transcript: JSON.stringify(data.transcript || [])
                    };
                    return [4 /*yield*/, dbService.saveVideo(supabaseVideoData, currentUser.id)];
                case 2:
                    savedVideo = _p.sent();
                    if (savedVideo) {
                        console.log('Video saved to Supabase:', savedVideo.title);
                        showSavedNotification(videoToSave_1.title);
                        // Start tracking watch session
                        startWatchSession(data.videoId);
                    }
                    _p.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _p.sent();
                    console.error('Error saving video data:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Start tracking a watch session for this video
 */
function startWatchSession(videoId) {
    return __awaiter(this, void 0, void 0, function () {
        var currentUser, sessionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureAuth()];
                case 1:
                    currentUser = _a.sent();
                    if (!currentUser)
                        return [2 /*return*/];
                    // If already watching this video, don't create a new session
                    if (currentWatchSession && currentWatchSession.videoId === videoId)
                        return [2 /*return*/];
                    if (!currentWatchSession) return [3 /*break*/, 3];
                    return [4 /*yield*/, endWatchSession()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, dbService.startWatchSession(currentUser.id, videoId)];
                case 4:
                    sessionId = _a.sent();
                    if (sessionId) {
                        currentWatchSession = {
                            id: sessionId,
                            videoId: videoId,
                            startTime: Date.now()
                        };
                        // Reset focus metrics for new session
                        resetFocusMetrics();
                        // Setup focus tracking
                        setupFocusTracking();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * End the current watch session
 */
function endWatchSession() {
    return __awaiter(this, void 0, void 0, function () {
        var durationWatched;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!currentWatchSession || !currentWatchSession.id)
                        return [2 /*return*/];
                    durationWatched = Math.floor((Date.now() - currentWatchSession.startTime) / 1000);
                    return [4 /*yield*/, dbService.endWatchSession(currentWatchSession.id, durationWatched)];
                case 1:
                    _a.sent();
                    // Record focus metrics
                    return [4 /*yield*/, recordFocusMetrics()];
                case 2:
                    // Record focus metrics
                    _a.sent();
                    currentWatchSession = null;
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Reset focus metrics for a new session
 */
function resetFocusMetrics() {
    focusMetrics = {
        tabSwitches: 0,
        pauses: 0,
        rewinds: 0
    };
}
/**
 * Setup focus tracking events
 */
function setupFocusTracking() {
    // Track tab visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Track video player events
    var videoElement = document.querySelector('video');
    if (videoElement) {
        videoElement.addEventListener('pause', function () { focusMetrics.pauses++; });
        videoElement.addEventListener('seeking', handleVideoSeeking);
    }
}
/**
 * Handle visibility change events (tab switching)
 */
function handleVisibilityChange() {
    if (document.hidden) {
        focusMetrics.tabSwitches++;
    }
}
/**
 * Handle video seeking events (to detect rewinds)
 */
function handleVideoSeeking(e) {
    var video = e.target;
    var currentTime = video.currentTime;
    var previousTime = video.dataset.previousTime ? parseFloat(video.dataset.previousTime) : 0;
    // If seeking backwards by more than 2 seconds, count as a rewind
    if (previousTime > 0 && currentTime < previousTime - 2) {
        focusMetrics.rewinds++;
    }
    // Update previous time
    video.dataset.previousTime = currentTime.toString();
}
/**
 * Record focus metrics for the session
 */
function recordFocusMetrics() {
    return __awaiter(this, void 0, void 0, function () {
        var currentUser, focusScore, metricsData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!currentWatchSession || !currentWatchSession.id)
                        return [2 /*return*/];
                    return [4 /*yield*/, ensureAuth()];
                case 1:
                    currentUser = _a.sent();
                    if (!currentUser)
                        return [2 /*return*/];
                    focusScore = 1.0;
                    focusScore -= Math.min(0.5, focusMetrics.tabSwitches * 0.05); // Lose up to 0.5 for tab switches
                    focusScore -= Math.min(0.3, focusMetrics.pauses * 0.05); // Lose up to 0.3 for pauses
                    // Rewinds can be good (reviewing content) or bad (distraction)
                    // Currently treating as neutral, can be refined with more data
                    // Ensure score is between 0 and 1
                    focusScore = Math.max(0, Math.min(1, focusScore));
                    metricsData = {
                        user_id: currentUser.id,
                        video_id: currentWatchSession.videoId,
                        session_id: currentWatchSession.id,
                        focus_score: focusScore,
                        tab_switches: focusMetrics.tabSwitches,
                        pauses: focusMetrics.pauses,
                        rewinds: focusMetrics.rewinds
                    };
                    return [4 /*yield*/, dbService.recordFocusMetrics(metricsData)];
                case 2:
                    _a.sent();
                    console.log('Focus metrics recorded:', metricsData);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Ensure user is authenticated or prompt for login
 */
function ensureAuth() {
    return __awaiter(this, void 0, void 0, function () {
        var currentUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = auth_1.authService.getCurrentUser();
                    if (!!currentUser) return [3 /*break*/, 2];
                    return [4 /*yield*/, auth_1.authService.refreshSession()];
                case 1:
                    // Try to refresh session
                    currentUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!currentUser) {
                        // If still not authenticated, prompt to login via popup
                        chrome.runtime.sendMessage({
                            action: 'promptLogin',
                            source: 'content',
                            data: { returnUrl: window.location.href }
                        });
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, currentUser];
            }
        });
    });
}
/**
 * Show a subtle notification that a video was saved
 */
function showSavedNotification(title) {
    // Create notification element
    var notification = document.createElement('div');
    notification.className = 'youtube-focus-saver-notification';
    notification.textContent = "Saved: ".concat(title);
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '4px',
        zIndex: '9999',
        fontSize: '14px',
        maxWidth: '300px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'opacity 0.3s ease-in-out',
        opacity: '0'
    });
    // Add to page
    document.body.appendChild(notification);
    // Animate in
    setTimeout(function () {
        notification.style.opacity = '1';
    }, 10);
    // Remove after a few seconds
    setTimeout(function () {
        notification.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(notification);
        }, 300); // Wait for fade out animation
    }, 3000);
}
/**
 * Process the current YouTube video
 */
function processCurrentVideo() {
    return __awaiter(this, void 0, void 0, function () {
        var url, videoId, currentUser, videoData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!window.location.href.includes('youtube.com/watch')) return [3 /*break*/, 3];
                    if (!currentWatchSession) return [3 /*break*/, 2];
                    return [4 /*yield*/, endWatchSession()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
                case 3:
                    url = window.location.href;
                    videoId = youtubeService.extractVideoId(url);
                    if (!videoId) {
                        console.error('Could not extract video ID from URL:', url);
                        return [2 /*return*/];
                    }
                    if (!(currentWatchSession && currentWatchSession.videoId !== videoId)) return [3 /*break*/, 5];
                    return [4 /*yield*/, endWatchSession()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!processedVideos.has(videoId)) return [3 /*break*/, 9];
                    return [4 /*yield*/, ensureAuth()];
                case 6:
                    currentUser = _a.sent();
                    if (!(currentUser && (!currentWatchSession || currentWatchSession.videoId !== videoId))) return [3 /*break*/, 8];
                    return [4 /*yield*/, startWatchSession(videoId)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
                case 9:
                    // Mark as processed to avoid duplicates
                    processedVideos.add(videoId);
                    console.log('Processing YouTube video:', videoId);
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 14, , 15]);
                    return [4 /*yield*/, youtubeService.getCompleteVideoData(url)];
                case 11:
                    videoData = _a.sent();
                    if (!(videoData && videoData.metadata)) return [3 /*break*/, 13];
                    return [4 /*yield*/, saveVideoData(videoData)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    error_2 = _a.sent();
                    console.error('Error processing video:', error_2);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
/**
 * Main initialization function
 */
function init() {
    console.log('YouTube Focus Saver content script initialized');
    // Process the initial video (if on a watch page)
    processCurrentVideo();
    // Setup listener for URL changes (YouTube is a SPA)
    var lastUrl = location.href;
    // Create a new observer for URL changes
    var observer = new MutationObserver(function () {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            // URL changed, check if it's a video
            setTimeout(function () {
                processCurrentVideo();
            }, 1000); // Small delay to ensure page is loaded
        }
    });
    // Start observing
    observer.observe(document, { subtree: true, childList: true });
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === 'extractVideoData') {
            processCurrentVideo().then(function () {
                sendResponse({ success: true });
            }).catch(function (error) {
                sendResponse({ success: false, error: error.message });
            });
            return true; // Indicates async response
        }
        // Handle auth state changes from popup
        if (message.type === 'AUTH_STATE_CHANGE') {
            if (message.payload) {
                // User logged in, try to process current video for logged-in user
                processCurrentVideo();
            }
            else {
                // User logged out, end current session
                if (currentWatchSession) {
                    endWatchSession();
                }
            }
        }
    });
    // Handle page unload to end session
    window.addEventListener('beforeunload', function () {
        if (currentWatchSession) {
            endWatchSession();
        }
    });
}
// Initialize when the page is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
