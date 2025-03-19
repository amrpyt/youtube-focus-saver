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
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
    }
    // Videos methods
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
                            throw error;
                        }
                        return [2 /*return*/, data.map(function (video) { return ({
                                id: video.id,
                                videoId: video.video_id,
                                title: video.title,
                                url: video.url,
                                thumbnailUrl: video.thumbnail_url,
                                channelName: video.channel_name,
                                description: video.description,
                                transcript: video.transcript,
                                summary: video.summary,
                                dateAdded: video.date_added,
                                status: video.status,
                                userId: video.user_id
                            }); })];
                }
            });
        });
    };
    DatabaseService.prototype.saveVideo = function (userId, video) {
        return __awaiter(this, void 0, void 0, function () {
            var existingVideos, videoData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('videos')
                            .select('id')
                            .eq('video_id', video.videoId)
                            .eq('user_id', userId)];
                    case 1:
                        existingVideos = (_a.sent()).data;
                        videoData = {
                            video_id: video.videoId,
                            title: video.title,
                            url: video.url,
                            thumbnail_url: video.thumbnailUrl,
                            channel_name: video.channelName || '',
                            description: video.description || '',
                            transcript: video.transcript || '',
                            summary: video.summary || '',
                            date_added: video.dateAdded,
                            status: video.status,
                            user_id: userId
                        };
                        if (!(existingVideos && existingVideos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, supabase_1.supabase
                                .from('videos')
                                .update(videoData)
                                .eq('id', existingVideos[0].id)];
                    case 2: 
                    // Update existing record
                    return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, supabase_1.supabase
                            .from('videos')
                            .insert([videoData])];
                    case 4: 
                    // Insert new record
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.deleteVideo = function (userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('videos')
                            .delete()
                            .eq('video_id', videoId)
                            .eq('user_id', userId)];
                    case 1:
                        error = (_a.sent()).error;
                        if (error) {
                            console.error('Error deleting video:', error);
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Watch sessions methods
    DatabaseService.prototype.startWatchSession = function (userId, session) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionData = {
                            user_id: userId,
                            video_id: session.videoId,
                            video_title: session.videoTitle,
                            start_time: session.startTime,
                            end_time: null,
                            duration: null,
                            focus_percentage: session.focusPercentage
                        };
                        return [4 /*yield*/, supabase_1.supabase
                                .from('watch_sessions')
                                .insert([sessionData])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.endWatchSession = function (sessionId, endTime, watchDuration, focusPercentage) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionData = {
                            end_time: endTime,
                            duration: watchDuration,
                            focus_percentage: focusPercentage
                        };
                        return [4 /*yield*/, supabase_1.supabase
                                .from('watch_sessions')
                                .update(sessionData)
                                .eq('id', sessionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getRecentWatchSessions = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, limit) {
            var _a, data, error;
            if (limit === void 0) { limit = 10; }
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
                            throw error;
                        }
                        return [2 /*return*/, data.map(function (session) { return ({
                                id: session.id,
                                userId: session.user_id,
                                videoId: session.video_id,
                                videoTitle: session.video_title,
                                startTime: session.start_time,
                                endTime: session.end_time,
                                duration: session.duration,
                                focusPercentage: session.focus_percentage,
                                distractionCount: session.distraction_count || 0
                            }); })];
                }
            });
        });
    };
    // Metrics methods
    DatabaseService.prototype.getUserMetrics = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('user_metrics')
                            .select('*')
                            .eq('user_id', userId)
                            .single()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            if (error.code === 'PGRST116') { // No rows returned
                                return [2 /*return*/, null];
                            }
                            console.error('Error fetching user metrics:', error);
                            throw error;
                        }
                        return [2 /*return*/, {
                                totalWatchTime: data.total_watch_time,
                                focusedWatchTime: data.focused_watch_time,
                                focusPercentage: data.focus_percentage,
                                videoCount: data.video_count,
                                sessionsCount: data.sessions_count,
                                lastVideoDate: data.last_video_date
                            }];
                }
            });
        });
    };
    DatabaseService.prototype.recordFocusMetrics = function (metricsData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingMetrics, focusPercentage, now, current, updatedMetrics, newMetrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('user_metrics')
                            .select('*')
                            .eq('user_id', metricsData.userId)];
                    case 1:
                        existingMetrics = (_a.sent()).data;
                        focusPercentage = metricsData.watchDuration > 0
                            ? (metricsData.focusedTime / metricsData.watchDuration) * 100
                            : 0;
                        now = new Date().toISOString();
                        if (!(existingMetrics && existingMetrics.length > 0)) return [3 /*break*/, 3];
                        current = existingMetrics[0];
                        updatedMetrics = {
                            total_watch_time: current.total_watch_time + (metricsData.watchDuration / 60), // convert to minutes
                            focused_watch_time: current.focused_watch_time + (metricsData.focusedTime / 60), // convert to minutes
                            focus_percentage: ((current.focused_watch_time + (metricsData.focusedTime / 60)) /
                                (current.total_watch_time + (metricsData.watchDuration / 60))) * 100,
                            video_count: current.video_count + 1,
                            sessions_count: current.sessions_count + 1,
                            last_video_date: now
                        };
                        return [4 /*yield*/, supabase_1.supabase
                                .from('user_metrics')
                                .update(updatedMetrics)
                                .eq('user_id', metricsData.userId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        newMetrics = {
                            user_id: metricsData.userId,
                            total_watch_time: metricsData.watchDuration / 60, // convert to minutes
                            focused_watch_time: metricsData.focusedTime / 60, // convert to minutes
                            focus_percentage: focusPercentage,
                            video_count: 1,
                            sessions_count: 1,
                            last_video_date: now
                        };
                        return [4 /*yield*/, supabase_1.supabase
                                .from('user_metrics')
                                .insert([newMetrics])];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Settings methods
    DatabaseService.prototype.getUserSettings = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('user_settings')
                            .select('*')
                            .eq('user_id', userId)
                            .single()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            if (error.code === 'PGRST116') { // No rows returned
                                return [2 /*return*/, null];
                            }
                            console.error('Error fetching user settings:', error);
                            throw error;
                        }
                        return [2 /*return*/, {
                                cloudSync: data.cloud_sync,
                                autoSaveVideos: data.auto_save_videos,
                                darkMode: data.dark_mode,
                                generateSummary: data.generate_summary,
                                openAiApiKey: data.openai_api_key || '',
                                notifyNewFeatures: data.notify_new_features
                            }];
                }
            });
        });
    };
    DatabaseService.prototype.saveUserSettings = function (userId, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var existingSettings, settingsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('user_settings')
                            .select('*')
                            .eq('user_id', userId)];
                    case 1:
                        existingSettings = (_a.sent()).data;
                        settingsData = {
                            user_id: userId,
                            cloud_sync: settings.cloudSync,
                            auto_save_videos: settings.autoSaveVideos,
                            dark_mode: settings.darkMode,
                            generate_summary: settings.generateSummary,
                            openai_api_key: settings.openAiApiKey,
                            notify_new_features: settings.notifyNewFeatures
                        };
                        if (!(existingSettings && existingSettings.length > 0)) return [3 /*break*/, 3];
                        // Update existing settings
                        return [4 /*yield*/, supabase_1.supabase
                                .from('user_settings')
                                .update(settingsData)
                                .eq('user_id', userId)];
                    case 2:
                        // Update existing settings
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: 
                    // Create new settings record
                    return [4 /*yield*/, supabase_1.supabase
                            .from('user_settings')
                            .insert([settingsData])];
                    case 4:
                        // Create new settings record
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
