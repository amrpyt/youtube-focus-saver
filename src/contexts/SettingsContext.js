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
exports.useSettings = exports.SettingsProvider = void 0;
var react_1 = require("react");
var useLocalStorage_1 = require("../hooks/useLocalStorage");
var AuthContext_1 = require("./AuthContext");
var DatabaseService_1 = require("../services/DatabaseService");
var defaultSettings = {
    cloudSync: false,
    autoSaveVideos: true,
    darkMode: false,
    generateSummary: false,
    openAiApiKey: '',
    notifyNewFeatures: true,
};
var SettingsContext = (0, react_1.createContext)(undefined);
var SettingsProvider = function (_a) {
    var children = _a.children;
    var _b = (0, useLocalStorage_1.useLocalStorage)('app_settings', defaultSettings), settings = _b[0], setSettingsLocal = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, AuthContext_1.useAuth)(), user = _e.user, isAuthenticated = _e.isAuthenticated;
    var dbService = new DatabaseService_1.DatabaseService();
    // Sync with database when user changes
    (0, react_1.useEffect)(function () {
        if (isAuthenticated && user) {
            syncSettingsWithDatabase();
        }
    }, [isAuthenticated, user]);
    var syncSettingsWithDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
        var dbSettings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !user)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, dbService.getUserSettings(user.id)];
                case 2:
                    dbSettings = _a.sent();
                    if (!dbSettings) return [3 /*break*/, 3];
                    // Database settings take precedence over local
                    setSettingsLocal(__assign(__assign({}, settings), dbSettings));
                    return [3 /*break*/, 5];
                case 3: 
                // Save local settings to database if no db settings exist
                return [4 /*yield*/, dbService.saveUserSettings(user.id, settings)];
                case 4:
                    // Save local settings to database if no db settings exist
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_1 = _a.sent();
                    console.error('Error syncing settings with database:', err_1);
                    setError('Failed to sync settings');
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var updateSettings = function (newSettings) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedSettings, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    setError(null);
                    updatedSettings = __assign(__assign({}, settings), newSettings);
                    setSettingsLocal(updatedSettings);
                    if (!(isAuthenticated && user)) return [3 /*break*/, 2];
                    return [4 /*yield*/, dbService.saveUserSettings(user.id, updatedSettings)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error('Error updating settings:', err_2);
                    setError('Failed to update settings');
                    throw err_2;
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var resetSettings = function () {
        setSettingsLocal(defaultSettings);
        if (isAuthenticated && user) {
            dbService.saveUserSettings(user.id, defaultSettings)
                .catch(function (err) {
                console.error('Error resetting settings in database:', err);
                setError('Failed to reset settings in cloud');
            });
        }
    };
    var value = {
        settings: settings,
        loading: loading,
        error: error,
        updateSettings: updateSettings,
        resetSettings: resetSettings,
    };
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
exports.SettingsProvider = SettingsProvider;
var useSettings = function () {
    var context = (0, react_1.useContext)(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
exports.useSettings = useSettings;
