"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var BarChart = function (_a) {
    var data = _a.data, title = _a.title, _b = _a.className, className = _b === void 0 ? '' : _b;
    var maxValue = Math.max.apply(Math, __spreadArray(__spreadArray([], data.map(function (item) { return item.value; }), false), [1], false)); // Prevent division by zero
    return (<div className={"bg-white rounded-lg shadow p-5 ".concat(className)}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map(function (item, index) { return (<div key={index}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "".concat((item.value / maxValue) * 100, "%") }}></div>
            </div>
          </div>); })}
      </div>
    </div>);
};
exports.default = BarChart;
