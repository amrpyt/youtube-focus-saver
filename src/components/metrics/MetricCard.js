"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MetricCard = function (_a) {
    var title = _a.title, value = _a.value, subtitle = _a.subtitle, icon = _a.icon, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"bg-white rounded-lg shadow p-5 ".concat(className)}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="bg-red-100 rounded-full p-3 text-red-600">
          {icon}
        </div>
      </div>
    </div>);
};
exports.default = MetricCard;
