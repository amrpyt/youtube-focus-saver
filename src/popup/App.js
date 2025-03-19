"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var hooks_1 = require("../hooks");
var App = function () {
    var _a = (0, hooks_1.useAuth)(), user = _a.user, isAuthenticated = _a.isAuthenticated, loading = _a.loading;
    if (loading) {
        return <div>Loading...</div>;
    }
    return (<div className="p-4">
      <h1 className="text-lg font-bold mb-4">YouTube Focus Saver</h1>
      
      {isAuthenticated ? (<div>
          <p>Welcome, {user === null || user === void 0 ? void 0 : user.email}</p>
          <p>Authenticated successfully!</p>
        </div>) : (<div>
          <p>Not authenticated</p>
          <p>Please login to access your saved videos and metrics.</p>
        </div>)}
    </div>);
};
exports.default = App;
