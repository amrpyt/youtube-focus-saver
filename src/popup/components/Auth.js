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
var auth_1 = require("../../services/auth");
var AuthMode;
(function (AuthMode) {
    AuthMode["LOGIN"] = "login";
    AuthMode["REGISTER"] = "register";
    AuthMode["FORGOT_PASSWORD"] = "forgot_password";
    AuthMode["RESET_PASSWORD"] = "reset_password";
})(AuthMode || (AuthMode = {}));
var Auth = function (_a) {
    var onAuthSuccess = _a.onAuthSuccess;
    var _b = (0, react_1.useState)(''), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(''), confirmPassword = _d[0], setConfirmPassword = _d[1];
    var _e = (0, react_1.useState)(AuthMode.LOGIN), mode = _e[0], setMode = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)(false), loading = _g[0], setLoading = _g[1];
    var _h = (0, react_1.useState)(null), message = _h[0], setMessage = _h[1];
    var handleLogin = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, user, error_1, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.authService.signIn(email, password)];
                case 2:
                    _a = _b.sent(), user = _a.user, error_1 = _a.error;
                    if (error_1) {
                        setError(error_1);
                    }
                    else if (user) {
                        onAuthSuccess(user);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    setError('An unexpected error occurred. Please try again.');
                    console.error(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleRegister = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, user, error_2, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (password !== confirmPassword) {
                        setError('Passwords do not match');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.authService.signUp(email, password)];
                case 2:
                    _a = _b.sent(), user = _a.user, error_2 = _a.error;
                    if (error_2) {
                        setError(error_2);
                    }
                    else if (user) {
                        setMessage('Registration successful! Please check your email for verification.');
                        setTimeout(function () { return setMode(AuthMode.LOGIN); }, 3000);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _b.sent();
                    setError('An unexpected error occurred. Please try again.');
                    console.error(err_2);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleForgotPassword = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.authService.resetPassword(email)];
                case 2:
                    error_3 = (_a.sent()).error;
                    if (error_3) {
                        setError(error_3);
                    }
                    else {
                        setMessage('If your email exists in our system, you will receive a reset link shortly.');
                        setTimeout(function () { return setMode(AuthMode.LOGIN); }, 3000);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_3 = _a.sent();
                    setError('An unexpected error occurred. Please try again.');
                    console.error(err_3);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 text-white p-2 rounded-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8,8.001c0,0-0.195-1.378-0.795-1.985c-0.76-0.797-1.613-0.801-2.004-0.847c-2.799-0.202-6.997-0.202-6.997-0.202 h-0.009c0,0-4.198,0-6.997,0.202c-0.39,0.047-1.242,0.051-2.003,0.847C2.395,6.623,2.2,8.001,2.2,8.001S2,9.62,2,11.238v1.517 c0,1.618,0.2,3.237,0.2,3.237s0.195,1.378,0.795,1.985c0.761,0.797,1.76,0.771,2.205,0.855c1.6,0.153,6.8,0.201,6.8,0.201 s4.203-0.006,7.001-0.209c0.391-0.047,1.243-0.051,2.004-0.847c0.6-0.607,0.795-1.985,0.795-1.985s0.2-1.618,0.2-3.237v-1.517 C22,9.62,21.8,8.001,21.8,8.001z M9.935,14.594l-0.001-5.62l5.404,2.82L9.935,14.594z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">YouTube Focus Saver</h1>
        </div>
      </div>

      {message && (<div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>)}

      {error && (<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>)}

      {mode === AuthMode.LOGIN && (<form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input id="email" type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button type="button" onClick={function () { return setMode(AuthMode.REGISTER); }} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Create an account
            </button>
            <button type="button" onClick={function () { return setMode(AuthMode.FORGOT_PASSWORD); }} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot password?
            </button>
          </div>
        </form>)}

      {mode === AuthMode.REGISTER && (<form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input id="reg-email" type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>
          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input id="reg-password" type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={function (e) { return setConfirmPassword(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={function () { return setMode(AuthMode.LOGIN); }} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Already have an account? Sign in
            </button>
          </div>
        </form>)}

      {mode === AuthMode.FORGOT_PASSWORD && (<form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input id="reset-email" type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
              {loading ? 'Sending reset link...' : 'Send password reset link'}
            </button>
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={function () { return setMode(AuthMode.LOGIN); }} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Back to sign in
            </button>
          </div>
        </form>)}
    </div>);
};
exports.default = Auth;
