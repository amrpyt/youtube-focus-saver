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
exports.authService = exports.AuthService = void 0;
var supabase_1 = require("./supabase");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supabase_1.supabase.auth.signInWithPassword({
                                email: email,
                                password: password,
                            })];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            return [2 /*return*/, { user: null, error: error }];
                        }
                        if (!data || !data.user) {
                            return [2 /*return*/, { user: null, error: new Error('No user returned from login') }];
                        }
                        return [2 /*return*/, {
                                user: {
                                    id: data.user.id,
                                    email: data.user.email || '',
                                },
                                error: null,
                            }];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Login error:', error_1);
                        return [2 /*return*/, { user: null, error: error_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.signup = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supabase_1.supabase.auth.signUp({
                                email: email,
                                password: password,
                            })];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            return [2 /*return*/, { user: null, error: error }];
                        }
                        if (!data || !data.user) {
                            return [2 /*return*/, { user: null, error: new Error('No user returned from signup') }];
                        }
                        return [2 /*return*/, {
                                user: {
                                    id: data.user.id,
                                    email: data.user.email || '',
                                },
                                error: null,
                            }];
                    case 2:
                        error_2 = _b.sent();
                        console.error('Signup error:', error_2);
                        return [2 /*return*/, { user: null, error: error_2 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase.auth.signOut()];
                    case 1:
                        error = (_a.sent()).error;
                        if (error) {
                            console.error('Logout error:', error);
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            console.error('Get session error:', error);
                            throw error;
                        }
                        if (!data.session) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                user: {
                                    id: data.session.user.id,
                                    email: data.session.user.email || null,
                                },
                            }];
                }
            });
        });
    };
    AuthService.prototype.refreshSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supabase_1.supabase.auth.refreshSession()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            console.error('Refresh session error:', error);
                            return [2 /*return*/, null];
                        }
                        if (!data || !data.session) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                id: data.session.user.id,
                                email: data.session.user.email || '',
                            }];
                    case 2:
                        error_3 = _b.sent();
                        console.error('Refresh session error:', error_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.onAuthStateChange = function (callback) {
        var data = supabase_1.supabase.auth.onAuthStateChange(function (event, session) {
            if (session) {
                callback(event, {
                    user: {
                        id: session.user.id,
                        email: session.user.email || null,
                    },
                });
            }
            else {
                callback(event, null);
            }
        }).data;
        return data;
    };
    return AuthService;
}());
exports.AuthService = AuthService;
// Export a singleton instance
exports.authService = new AuthService();
