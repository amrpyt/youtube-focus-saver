"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Card_1 = require("../common/Card");
var SessionsList = function (_a) {
    var sessions = _a.sessions, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<Card_1.default title="Recent Watch Sessions" className={className} noPadding>
      <div className="divide-y divide-gray-200">
        {sessions.length === 0 ? (<p className="px-5 py-4 text-sm text-gray-500 italic">No watch sessions recorded yet.</p>) : (sessions.map(function (session, index) { return (<div key={session.id || index} className="px-5 py-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate" style={{ maxWidth: '250px' }}>
                    {session.videoTitle || 'Unknown Video'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(session.startTime).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Focus: {Math.round(session.focusPercentage)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Distractions: {session.distractionCount || 0}
                  </p>
                </div>
              </div>
            </div>); }))}
      </div>
    </Card_1.default>);
};
exports.default = SessionsList;
