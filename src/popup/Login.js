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
var react_1 = require("react");
var AuthContext_1 = require("../contexts/AuthContext");
var Login = function () {
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)('signIn'), mode = _c[0], setMode = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), formError = _e[0], setFormError = _e[1];
    var _f = (0, AuthContext_1.useAuth)(), signIn = _f.signIn, signUp = _f.signUp, error = _f.error;
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, error_2, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setFormError(null);
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    if (!(mode === 'signUp')) return [3 /*break*/, 3];
                    return [4 /*yield*/, signUp(email, password)];
                case 2:
                    error_1 = (_a.sent()).error;
                    if (error_1)
                        throw error_1;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, signIn(email, password)];
                case 4:
                    error_2 = (_a.sent()).error;
                    if (error_2)
                        throw error_2;
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_1 = _a.sent();
                    console.error('Auth error:', err_1);
                    setFormError(err_1 instanceof Error ? err_1.message : 'Authentication failed');
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="w-full max-w-md p-4">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold">YouTube Focus Saver</h1>
        <p className="text-gray-600 text-sm">
          {mode === 'signIn' ? 'Sign in to your account' : 'Create a new account'}
        </p>
      </div>
      
      {(formError || error) && (<div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError || error}
        </div>)}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input type="email" id="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input type="password" id="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        
        <div className="mb-4">
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
            {loading
            ? 'Loading...'
            : mode === 'signIn'
                ? 'Sign In'
                : 'Sign Up'}
          </button>
        </div>
      </form>
      
      <div className="text-center text-sm">
        {mode === 'signIn' ? (<p>
            Don't have an account?{' '}
            <button type="button" onClick={function () { return setMode('signUp'); }} className="text-blue-600 hover:text-blue-800 focus:outline-none">
              Sign Up
            </button>
          </p>) : (<p>
            Already have an account?{' '}
            <button type="button" onClick={function () { return setMode('signIn'); }} className="text-blue-600 hover:text-blue-800 focus:outline-none">
              Sign In
            </button>
          </p>)}
      </div>
    </div>);
};
exports.default = Login;
