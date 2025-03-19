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
var DatabaseService = require('./services/database').DatabaseService;
// Test user ID (matches the one we created in SQL)
var TEST_USER_ID = 'd0e8c347-c5a7-4a18-90e4-e2d23b646a9d';
// Initialize database service
var dbService = new DatabaseService();
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var savedVideos, preferences, metrics, newTheme, updateSuccess, updatedPreferences, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🧪 Running database tests...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    // Test getting saved videos
                    console.log('\n📺 Testing getSavedVideos...');
                    return [4 /*yield*/, dbService.getSavedVideos(TEST_USER_ID)];
                case 2:
                    savedVideos = _a.sent();
                    console.log("Found ".concat(savedVideos.length, " saved videos"));
                    savedVideos.forEach(function (video) {
                        console.log("- ".concat(video.title, " (").concat(video.video_id, ")"));
                    });
                    // Test getting user preferences
                    console.log('\n⚙️ Testing getUserPreferences...');
                    return [4 /*yield*/, dbService.getUserPreferences(TEST_USER_ID)];
                case 3:
                    preferences = _a.sent();
                    console.log('User preferences:', preferences);
                    // Test getting focus metrics
                    console.log('\n📊 Testing getFocusMetrics...');
                    return [4 /*yield*/, dbService.getFocusMetrics(TEST_USER_ID)];
                case 4:
                    metrics = _a.sent();
                    console.log("Found ".concat(metrics.length, " focus metrics records"));
                    metrics.forEach(function (metric) {
                        console.log("- Video ".concat(metric.video_id, ": Focus score ").concat(metric.focus_score, ", ").concat(metric.tab_switches, " tab switches"));
                    });
                    // Test updating preferences
                    console.log('\n✏️ Testing updateUserPreferences...');
                    newTheme = (preferences === null || preferences === void 0 ? void 0 : preferences.theme) === 'light' ? 'dark' : 'light';
                    console.log("Changing theme from ".concat(preferences === null || preferences === void 0 ? void 0 : preferences.theme, " to ").concat(newTheme));
                    return [4 /*yield*/, dbService.updateUserPreferences({
                            user_id: TEST_USER_ID,
                            theme: newTheme
                        })];
                case 5:
                    updateSuccess = _a.sent();
                    console.log("Update ".concat(updateSuccess ? 'successful' : 'failed'));
                    return [4 /*yield*/, dbService.getUserPreferences(TEST_USER_ID)];
                case 6:
                    updatedPreferences = _a.sent();
                    console.log('Updated preferences:', updatedPreferences);
                    console.log('\n✅ All tests completed!');
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('❌ Test failed with error:', error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Run the tests
runTests().catch(console.error);
