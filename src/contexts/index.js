"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = void 0;
var react_1 = require("react");
var AuthContext_1 = require("./AuthContext");
var VideoContext_1 = require("./VideoContext");
var MetricsContext_1 = require("./MetricsContext");
var SettingsContext_1 = require("./SettingsContext");
/**
 * AppProvider combines all context providers into a single component
 * for easier use in the app entry point.
 */
var AppProvider = function (_a) {
    var children = _a.children;
    return (<AuthContext_1.AuthProvider>
      <SettingsContext_1.SettingsProvider>
        <VideoContext_1.VideoProvider>
          <MetricsContext_1.MetricsProvider>
            {children}
          </MetricsContext_1.MetricsProvider>
        </VideoContext_1.VideoProvider>
      </SettingsContext_1.SettingsProvider>
    </AuthContext_1.AuthProvider>);
};
exports.AppProvider = AppProvider;
// Export all contexts for ease of use
__exportStar(require("./AuthContext"), exports);
__exportStar(require("./VideoContext"), exports);
__exportStar(require("./MetricsContext"), exports);
__exportStar(require("./SettingsContext"), exports);
