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
var Input = function (_a) {
    var label = _a.label, helpText = _a.helpText, error = _a.error, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, _c = _a.className, className = _c === void 0 ? '' : _c, id = _a.id, props = __rest(_a, ["label", "helpText", "error", "fullWidth", "className", "id"]);
    // Generate a unique ID if none is provided
    var inputId = id || "input-".concat(Math.random().toString(36).substr(2, 9));
    return (<div className={"".concat(fullWidth ? 'w-full' : '', " ").concat(className)}>
      {label && (<label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>)}
      
      <div className="relative rounded-md shadow-sm">
        <input id={inputId} className={"\n            block w-full rounded-md sm:text-sm\n            ".concat(error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-red-500 focus:border-red-500', "\n          ")} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? "".concat(inputId, "-error") : helpText ? "".concat(inputId, "-description") : undefined} {...props}/>
      </div>
      
      {helpText && !error && (<p className="mt-1 text-sm text-gray-500" id={"".concat(inputId, "-description")}>
          {helpText}
        </p>)}
      
      {error && (<p className="mt-1 text-sm text-red-600" id={"".concat(inputId, "-error")}>
          {error}
        </p>)}
    </div>);
};
exports.default = Input;
