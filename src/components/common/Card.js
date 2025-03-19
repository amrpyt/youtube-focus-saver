"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Card = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, title = _a.title, footer = _a.footer, _c = _a.noPadding, noPadding = _c === void 0 ? false : _c;
    return (<div className={"bg-white rounded-lg shadow-sm overflow-hidden ".concat(className)}>
      {title && (<div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>)}
      <div className={noPadding ? '' : 'px-5 py-4'}>
        {children}
      </div>
      {footer && (<div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>)}
    </div>);
};
exports.default = Card;
