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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AuthContext_1 = require("../contexts/AuthContext");
var SettingsContext_1 = require("../contexts/SettingsContext");
var Login_1 = require("./Login");
var Settings = function () {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, isAuthenticated = _a.isAuthenticated, signOut = _a.signOut;
    var _b = (0, SettingsContext_1.useSettings)(), settings = _b.settings, updateSettings = _b.updateSettings, resetSettings = _b.resetSettings, loading = _b.loading, error = _b.error;
    var handleToggle = function (key) {
        var _a;
        updateSettings((_a = {}, _a[key] = !settings[key], _a));
    };
    var handleApiKeyChange = function (e) {
        updateSettings({ openAiApiKey: e.target.value });
    };
    var handleReset = function () {
        if (window.confirm('Are you sure you want to reset all settings to default values?')) {
            resetSettings();
        }
    };
    var handleToggleDarkMode = function () {
        updateSettings(__assign(__assign({}, settings), { darkMode: !settings.darkMode }));
    };
    var handleFocusThresholdChange = function (e) {
        var value = parseInt(e.target.value, 10);
        updateSettings(__assign(__assign({}, settings), { focusThreshold: value }));
    };
    return (<div className={"p-6 ".concat(settings.darkMode ? 'text-white' : 'text-gray-900')}>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      {!isAuthenticated ? (<div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">User Account</h3>
          <Login_1.default />
        </div>) : (<div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">User Account</h3>
          <div className={"p-4 rounded-lg ".concat(settings.darkMode ? 'bg-gray-800' : 'bg-gray-50')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user === null || user === void 0 ? void 0 : user.email}</p>
                <p className={"text-sm ".concat(settings.darkMode ? 'text-gray-400' : 'text-gray-500')}>
                  Logged in
                </p>
              </div>
              <button onClick={function () { return signOut(); }} className={"px-3 py-1 text-sm rounded-md ".concat(settings.darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}>
                Sign Out
              </button>
            </div>
          </div>
        </div>)}
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">General Settings</h3>
        <div className={"space-y-4 p-4 rounded-lg ".concat(settings.darkMode ? 'bg-gray-800' : 'bg-gray-50')}>
          <div className="flex items-center justify-between">
            <label htmlFor="darkMode" className="font-medium">
              Dark Mode
            </label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input type="checkbox" id="darkMode" name="darkMode" checked={settings.darkMode} onChange={handleToggleDarkMode} className="sr-only"/>
              <div className={"block w-10 h-6 rounded-full ".concat(settings.darkMode ? 'bg-indigo-600' : 'bg-gray-300')}></div>
              <div className={"absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform ".concat(settings.darkMode ? 'translate-x-4' : '')}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="autoSaveVideos" className="font-medium">
              Auto-Save Watched Videos
            </label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input type="checkbox" id="autoSaveVideos" name="autoSaveVideos" checked={settings.autoSaveVideos} onChange={function () { return handleToggle('autoSaveVideos'); }} className="sr-only"/>
              <div className={"block w-10 h-6 rounded-full ".concat(settings.autoSaveVideos ? 'bg-indigo-600' : 'bg-gray-300')}></div>
              <div className={"absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform ".concat(settings.autoSaveVideos ? 'translate-x-4' : '')}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="notifyNewFeatures" className="font-medium">
              Notify About New Features
            </label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input type="checkbox" id="notifyNewFeatures" name="notifyNewFeatures" checked={settings.notifyNewFeatures} onChange={function () { return handleToggle('notifyNewFeatures'); }} className="sr-only"/>
              <div className={"block w-10 h-6 rounded-full ".concat(settings.notifyNewFeatures ? 'bg-indigo-600' : 'bg-gray-300')}></div>
              <div className={"absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform ".concat(settings.notifyNewFeatures ? 'translate-x-4' : '')}></div>
            </div>
          </div>
        </div>
      </div>
      
      {isAuthenticated && (<div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Cloud Sync</h3>
          <div className={"space-y-4 p-4 rounded-lg ".concat(settings.darkMode ? 'bg-gray-800' : 'bg-gray-50')}>
            <div className="flex items-center justify-between">
              <label htmlFor="cloudSync" className="font-medium">
                Enable Cloud Sync
              </label>
              <div className="relative inline-block w-10 align-middle select-none">
                <input type="checkbox" id="cloudSync" name="cloudSync" checked={settings.cloudSync} onChange={function () { return handleToggle('cloudSync'); }} className="sr-only"/>
                <div className={"block w-10 h-6 rounded-full ".concat(settings.cloudSync ? 'bg-indigo-600' : 'bg-gray-300')}></div>
                <div className={"absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform ".concat(settings.cloudSync ? 'translate-x-4' : '')}></div>
              </div>
            </div>
            <p className={"text-xs ".concat(settings.darkMode ? 'text-gray-400' : 'text-gray-500')}>
              Sync your saved videos and settings across all your devices.
            </p>
          </div>
        </div>)}
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">AI Features</h3>
        <div className={"space-y-4 p-4 rounded-lg ".concat(settings.darkMode ? 'bg-gray-800' : 'bg-gray-50')}>
          <div className="flex items-center justify-between">
            <label htmlFor="generateSummary" className="font-medium">
              Generate Video Summaries
            </label>
            <div className="relative inline-block w-10 align-middle select-none">
              <input type="checkbox" id="generateSummary" name="generateSummary" checked={settings.generateSummary} onChange={function () { return handleToggle('generateSummary'); }} className="sr-only"/>
              <div className={"block w-10 h-6 rounded-full ".concat(settings.generateSummary ? 'bg-indigo-600' : 'bg-gray-300')}></div>
              <div className={"absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform ".concat(settings.generateSummary ? 'translate-x-4' : '')}></div>
            </div>
          </div>
          
          {settings.generateSummary && (<div>
              <label htmlFor="openAiApiKey" className="block text-sm font-medium mb-1">
                OpenAI API Key
              </label>
              <input type="password" id="openAiApiKey" value={settings.openAiApiKey} onChange={handleApiKeyChange} placeholder="sk-..." className={"w-full px-3 py-2 border rounded-md ".concat(settings.darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900', " focus:outline-none focus:ring-2 focus:ring-indigo-500")}/>
              <p className={"mt-1 text-xs ".concat(settings.darkMode ? 'text-gray-400' : 'text-gray-500')}>
                Required for generating video summaries using OpenAI's API. Your key is stored locally on your device.
              </p>
            </div>)}
        </div>
      </div>
      
      <div className="mt-6">
        <button onClick={handleReset} className={"px-4 py-2 text-sm font-medium rounded-md ".concat(settings.darkMode
            ? 'bg-red-900 text-red-100 hover:bg-red-800'
            : 'bg-red-100 text-red-700 hover:bg-red-200')}>
          Reset to Defaults
        </button>
        
        {error && (<p className="mt-2 text-red-500 text-sm">{error}</p>)}
      </div>
    </div>);
};
exports.default = Settings;
