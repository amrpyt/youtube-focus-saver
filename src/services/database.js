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
exports.DatabaseService = void 0;
var supabase_1 = require("./supabase");
var uuid_1 = require("uuid");
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
    }
    /**
     * Save a video to Supabase
     */
    DatabaseService.prototype.saveVideo = function (video, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var existingVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('videos')
                            .select('id')
                            .eq('user_id', userId)
                            .eq('video_id', video.videoId)
                            .limit(1)];
                    case 1:
                        existingVideos = (_a.sent()).data;
                        if (!(existingVideos && existingVideos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, supabase_1.supabase
                                .from('videos')
                                .update({
                                title: video.title,
                                description: video.description,
                                thumbnail_url: video.thumbnailUrl,
                                channel_name: video.channelName,
                                summary: video.summary,
                                transcript: video.transcript,
                                updated_at: new Date().toISOString()
                            })
                                .eq('id', existingVideos[0].id)];
                    case 2: 
                    // Update existing video
                    return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, supabase_1.supabase
                            .from('videos')
                            .insert({
                            id: (0, uuid_1.v4)(),
                            user_id: userId,
                            video_id: video.videoId,
                            title: video.title,
                            url: video.url,
                            thumbnail_url: video.thumbnailUrl,
                            channel_name: video.channelName,
                            description: video.description,
                            transcript: video.transcript,
                            summary: video.summary,
                            date_added: new Date(video.dateAdded).toISOString(),
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        })];
                    case 4: 
                    // Insert new video
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get all videos for a user
     */
    DatabaseService.prototype.getVideos = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('videos')
                            .select('*')
                            .eq('user_id', userId)
                            .order('date_added', { ascending: false })];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            console.error('Error fetching videos:', error);
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, data || []];
                }
            });
        });
    };
    /**
     * Save a watch session
     */
    DatabaseService.prototype.saveWatchSession = function (session, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('watch_sessions')
                            .insert({
                            id: (0, uuid_1.v4)(),
                            user_id: userId,
                            video_id: session.videoId,
                            video_title: session.videoTitle,
                            start_time: session.startTime,
                            end_time: session.endTime,
                            watch_duration: session.watchDuration,
                            focus_score: session.focusScore,
                            pause_count: session.pauseCount,
                            tab_switch_count: session.tabSwitchCount,
                            completion_rate: session.completionRate
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update a watch session with end time and metrics
     */
    DatabaseService.prototype.updateWatchSession = function (sessionId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('watch_sessions')
                            .update({
                            end_time: data.endTime,
                            watch_duration: data.watchDuration,
                            focus_score: data.focusScore,
                            pause_count: data.pauseCount,
                            tab_switch_count: data.tabSwitchCount,
                            completion_rate: data.completionRate
                        })
                            .eq('id', sessionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get recent watch sessions for a user
     */
    DatabaseService.prototype.getRecentSessions = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, limit) {
            var _a, data, error;
            if (limit === void 0) { limit = 5; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('watch_sessions')
                            .select('*')
                            .eq('user_id', userId)
                            .order('start_time', { ascending: false })
                            .limit(limit)];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            console.error('Error fetching watch sessions:', error);
                            return [2 /*return*/, []];
                        }
                        if (!data)
                            return [2 /*return*/, []];
                        return [2 /*return*/, this.mapDbSessionsToClientFormat(data)];
                }
            });
        });
    };
    /**
     * Get aggregated user metrics
     */
    DatabaseService.prototype.getUserMetrics = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error, totalWatchTime, totalFocusScore, totalPauseCount, totalTabSwitchCount, totalCompletionRate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('watch_sessions')
                            .select('*')
                            .eq('user_id', userId)];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            console.error('Error fetching user metrics:', error);
                            return [2 /*return*/, null];
                        }
                        if (!data || data.length === 0) {
                            return [2 /*return*/, {
                                    totalWatchTime: 0,
                                    focusScore: 0,
                                    pauseCount: 0,
                                    tabSwitchCount: 0,
                                    completionRate: 0
                                }];
                        }
                        totalWatchTime = 0;
                        totalFocusScore = 0;
                        totalPauseCount = 0;
                        totalTabSwitchCount = 0;
                        totalCompletionRate = 0;
                        data.forEach(function (session) {
                            totalWatchTime += session.watch_duration || 0;
                            totalFocusScore += session.focus_score || 0;
                            totalPauseCount += session.pause_count || 0;
                            totalTabSwitchCount += session.tab_switch_count || 0;
                            totalCompletionRate += session.completion_rate || 0;
                        });
                        return [2 /*return*/, {
                                totalWatchTime: totalWatchTime,
                                focusScore: totalFocusScore / data.length,
                                pauseCount: totalPauseCount,
                                tabSwitchCount: totalTabSwitchCount,
                                completionRate: totalCompletionRate / data.length
                            }];
                }
            });
        });
    };
    /**
     * Sync local videos with Supabase
     */
    DatabaseService.prototype.syncVideosToCloud = function (videos, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var succeeded, failed, _i, videos_1, video, error, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        succeeded = 0;
                        failed = 0;
                        _i = 0, videos_1 = videos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < videos_1.length)) return [3 /*break*/, 6];
                        video = videos_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.saveVideo(video, userId)];
                    case 3:
                        error = (_a.sent()).error;
                        if (error) {
                            console.error('Error syncing video:', error);
                            failed++;
                        }
                        else {
                            succeeded++;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('Exception syncing video:', e_1);
                        failed++;
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, { succeeded: succeeded, failed: failed }];
                }
            });
        });
    };
    // Update this method to properly handle null values
    DatabaseService.prototype.mapDbSessionsToClientFormat = function (data) {
        return data.map(function (session) { return ({
            id: session.id,
            videoId: session.video_id,
            videoTitle: session.video_title,
            startTime: session.start_time,
            endTime: session.end_time, // Cast null to undefined
            watchDuration: session.watch_duration,
            focusScore: session.focus_score,
            pauseCount: session.pause_count,
            tabSwitchCount: session.tab_switch_count,
            completionRate: session.completion_rate
        }); });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
