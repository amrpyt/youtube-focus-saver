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
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = require("react");
var AuthService_1 = require("../services/AuthService");
var AuthContext = (0, react_1.createContext)(undefined);
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(false), isAuthenticated = _e[0], setIsAuthenticated = _e[1];
    // Check for an existing session on component mount
    (0, react_1.useEffect)(function () {
        checkSession();
    }, []);
    var checkSession = function () { return __awaiter(void 0, void 0, void 0, function () {
        var session, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, AuthService_1.authService.getSession()];
                case 1:
                    session = _a.sent();
                    if (session === null || session === void 0 ? void 0 : session.user) {
                        setUser({
                            id: session.user.id,
                            email: session.user.email || '',
                        });
                        setIsAuthenticated(true);
                    }
                    else {
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error('Session check error:', err_1);
                    setUser(null);
                    setIsAuthenticated(false);
                    setError('Failed to check authentication status');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Setup auth state change listener
    (0, react_1.useEffect)(function () {
        var subscription = AuthService_1.authService.onAuthStateChange(function (event, session) {
            if (session === null || session === void 0 ? void 0 : session.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                });
                setIsAuthenticated(true);
            }
            else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        });
        // Cleanup subscription on unmount
        return function () {
            subscription.subscription.unsubscribe();
        };
    }, []);
    var signIn = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, authUser, authError, err_2, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, AuthService_1.authService.login(email, password)];
                case 1:
                    _a = _b.sent(), authUser = _a.user, authError = _a.error;
                    if (authError) {
                        setError(authError.message);
                        return [2 /*return*/, { error: authError }];
                    }
                    if (authUser) {
                        setUser({
                            id: authUser.id,
                            email: authUser.email,
                        });
                        setIsAuthenticated(true);
                    }
                    return [2 /*return*/, {}];
                case 2:
                    err_2 = _b.sent();
                    console.error('Login error:', err_2);
                    error_1 = new Error('An error occurred during login');
                    setError(error_1.message);
                    return [2 /*return*/, { error: error_1 }];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var signUp = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, authUser, authError, err_3, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, AuthService_1.authService.signup(email, password)];
                case 1:
                    _a = _b.sent(), authUser = _a.user, authError = _a.error;
                    if (authError) {
                        setError(authError.message);
                        return [2 /*return*/, { error: authError }];
                    }
                    if (authUser) {
                        setUser({
                            id: authUser.id,
                            email: authUser.email,
                        });
                        setIsAuthenticated(true);
                    }
                    return [2 /*return*/, {}];
                case 2:
                    err_3 = _b.sent();
                    console.error('Signup error:', err_3);
                    error_2 = new Error('An error occurred during signup');
                    setError(error_2.message);
                    return [2 /*return*/, { error: error_2 }];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var signOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, AuthService_1.authService.logout()];
                case 1:
                    _a.sent();
                    setUser(null);
                    setIsAuthenticated(false);
                    return [3 /*break*/, 4];
                case 2:
                    err_4 = _a.sent();
                    console.error('Logout error:', err_4);
                    setError('An error occurred during logout');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var value = {
        user: user,
        loading: loading,
        error: error,
        isAuthenticated: isAuthenticated,
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
exports.AuthProvider = AuthProvider;
var useAuth = function () {
    var context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
exports.useAuth = useAuth;
