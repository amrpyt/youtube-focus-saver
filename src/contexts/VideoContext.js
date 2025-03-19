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
exports.useVideos = exports.VideoProvider = void 0;
var react_1 = require("react");
var AuthContext_1 = require("./AuthContext");
var DatabaseService_1 = require("../services/DatabaseService");
var VideoContext = (0, react_1.createContext)(undefined);
var VideoProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), videos = _b[0], setVideos = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), refreshing = _d[0], setRefreshing = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)(null), selectedVideo = _f[0], setSelectedVideo = _f[1];
    var _g = (0, react_1.useState)(''), searchQuery = _g[0], setSearchQuery = _g[1];
    var _h = (0, AuthContext_1.useAuth)(), user = _h.user, isAuthenticated = _h.isAuthenticated;
    var dbService = new DatabaseService_1.DatabaseService();
    // Fetch videos when user changes
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            fetchVideos();
        }
        else {
            setVideos([]);
            setSelectedVideo(null);
            setLoading(false);
        }
    }, [isAuthenticated, user]);
    var fetchVideos = function () { return __awaiter(void 0, void 0, void 0, function () {
        var fetchedVideos, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !user) {
                        setVideos([]);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, dbService.getVideos(user.id)];
                case 2:
                    fetchedVideos = _a.sent();
                    setVideos(fetchedVideos);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error fetching videos:', err_1);
                    setError('Failed to load videos');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var refreshVideos = function () { return __awaiter(void 0, void 0, void 0, function () {
        var fetchedVideos, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !user)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setRefreshing(true);
                    setError(null);
                    return [4 /*yield*/, dbService.getVideos(user.id)];
                case 2:
                    fetchedVideos = _a.sent();
                    setVideos(fetchedVideos);
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error('Error refreshing videos:', err_2);
                    setError('Failed to refresh videos');
                    return [3 /*break*/, 5];
                case 4:
                    setRefreshing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var deleteVideo = function (videoId) { return __awaiter(void 0, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !user)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setError(null);
                    return [4 /*yield*/, dbService.deleteVideo(user.id, videoId)];
                case 2:
                    _a.sent();
                    // Update local state
                    setVideos(function (prevVideos) { return prevVideos.filter(function (video) { return video.videoId !== videoId; }); });
                    // Clear selected video if it was deleted
                    if ((selectedVideo === null || selectedVideo === void 0 ? void 0 : selectedVideo.videoId) === videoId) {
                        setSelectedVideo(null);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.error('Error deleting video:', err_3);
                    setError('Failed to delete video');
                    throw err_3;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var updateVideo = function (updatedVideo) { return __awaiter(void 0, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !user)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setError(null);
                    // Update in database
                    return [4 /*yield*/, dbService.saveVideo(user.id, updatedVideo)];
                case 2:
                    // Update in database
                    _a.sent();
                    // Update local state
                    setVideos(function (prevVideos) {
                        return prevVideos.map(function (video) {
                            return video.id === updatedVideo.id ? updatedVideo : video;
                        });
                    });
                    // Update selected video if it was the one updated
                    if ((selectedVideo === null || selectedVideo === void 0 ? void 0 : selectedVideo.id) === updatedVideo.id) {
                        setSelectedVideo(updatedVideo);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.error('Error updating video:', err_4);
                    setError('Failed to update video');
                    throw err_4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var selectVideo = function (video) {
        setSelectedVideo(video);
    };
    var updateSearchQuery = function (query) {
        setSearchQuery(query);
    };
    var value = {
        videos: videos,
        loading: loading,
        error: error,
        selectedVideo: selectedVideo,
        searchQuery: searchQuery,
        refreshing: refreshing,
        fetchVideos: fetchVideos,
        deleteVideo: deleteVideo,
        selectVideo: selectVideo,
        updateSearchQuery: updateSearchQuery,
        updateVideo: updateVideo,
    };
    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
exports.VideoProvider = VideoProvider;
var useVideos = function () {
    var context = (0, react_1.useContext)(VideoContext);
    if (context === undefined) {
        throw new Error('useVideos must be used within a VideoProvider');
    }
    return context;
};
exports.useVideos = useVideos;
