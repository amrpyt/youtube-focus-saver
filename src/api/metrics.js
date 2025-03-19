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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWatchSession = exports.addWatchSession = exports.fetchWatchSessions = exports.fetchDailyMetrics = void 0;
var supabase_1 = require("./supabase");
/**
 * Fetch daily metrics for a user
 */
var fetchDailyMetrics = function (userId_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([userId_1], args_1, true), void 0, function (userId, days) {
        var startDate, _a, data, error;
        if (days === void 0) { days = 30; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - days);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('user_metrics')
                            .select('*')
                            .eq('user_id', userId)
                            .gte('date', startDate.toISOString().split('T')[0])
                            .order('date', { ascending: false })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error fetching daily metrics:', error);
                        throw error;
                    }
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.fetchDailyMetrics = fetchDailyMetrics;
/**
 * Fetch watch sessions for a user
 */
var fetchWatchSessions = function (userId_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([userId_1], args_1, true), void 0, function (userId, limit) {
        var _a, data, error;
        if (limit === void 0) { limit = 50; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase_1.supabase
                        .from('watch_sessions')
                        .select('*, videos(title)')
                        .eq('user_id', userId)
                        .order('start_time', { ascending: false })
                        .limit(limit)];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error fetching watch sessions:', error);
                        throw error;
                    }
                    // Process the joined data to include video_title
                    return [2 /*return*/, data.map(function (session) {
                            var _a;
                            return (__assign(__assign({}, session), { video_title: ((_a = session.videos) === null || _a === void 0 ? void 0 : _a.title) || 'Unknown Video' }));
                        })];
            }
        });
    });
};
exports.fetchWatchSessions = fetchWatchSessions;
/**
 * Add a new watch session
 */
var addWatchSession = function (session, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var newSession, _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newSession = __assign(__assign({}, session), { user_id: userId });
                return [4 /*yield*/, supabase_1.supabase
                        .from('watch_sessions')
                        .insert([newSession])
                        .select()
                        .single()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error('Error adding watch session:', error);
                    throw error;
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.addWatchSession = addWatchSession;
/**
 * Update an existing watch session
 */
var updateWatchSession = function (sessionId, updates, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase_1.supabase
                    .from('watch_sessions')
                    .update(updates)
                    .eq('id', sessionId)
                    .eq('user_id', userId)
                    .select()
                    .single()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error('Error updating watch session:', error);
                    throw error;
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.updateWatchSession = updateWatchSession;
