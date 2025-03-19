"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.isLoading, isLoading = _d === void 0 ? false : _d, _e = _a.fullWidth, fullWidth = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? '' : _f, props = __rest(_a, ["children", "variant", "size", "isLoading", "fullWidth", "className"]);
    // Base classes
    var baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
    // Variant classes
    var variantClasses = {
        primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-transparent',
        outline: 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-red-500 border border-gray-300',
        danger: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500 border border-transparent',
    };
    // Size classes
    var sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
    };
    // Width classes
    var widthClasses = fullWidth ? 'w-full' : '';
    // Disabled classes
    var disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';
    // Loading indicator
    var loadingIndicator = isLoading ? (<svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>) : null;
    return (<button className={"".concat(baseClasses, " ").concat(variantClasses[variant], " ").concat(sizeClasses[size], " ").concat(widthClasses, " ").concat(disabledClasses, " ").concat(className)} disabled={isLoading || props.disabled} {...props}>
      {isLoading && loadingIndicator}
      {children}
    </button>);
};
exports.default = Button;
