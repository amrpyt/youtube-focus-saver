"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = exports.useLocalStorage = exports.useSettings = exports.useMetrics = exports.useVideos = exports.useAuth = void 0;
// Re-export hooks from context files
var AuthContext_1 = require("../contexts/AuthContext");
Object.defineProperty(exports, "useAuth", { enumerable: true, get: function () { return AuthContext_1.useAuth; } });
var VideoContext_1 = require("../contexts/VideoContext");
Object.defineProperty(exports, "useVideos", { enumerable: true, get: function () { return VideoContext_1.useVideos; } });
var MetricsContext_1 = require("../contexts/MetricsContext");
Object.defineProperty(exports, "useMetrics", { enumerable: true, get: function () { return MetricsContext_1.useMetrics; } });
var SettingsContext_1 = require("../contexts/SettingsContext");
Object.defineProperty(exports, "useSettings", { enumerable: true, get: function () { return SettingsContext_1.useSettings; } });
// Export custom hooks
var useLocalStorage_1 = require("./useLocalStorage");
Object.defineProperty(exports, "useLocalStorage", { enumerable: true, get: function () { return useLocalStorage_1.useLocalStorage; } });
var useWindowSize_1 = require("./useWindowSize");
Object.defineProperty(exports, "useWindowSize", { enumerable: true, get: function () { return useWindowSize_1.useWindowSize; } });
