"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPercentage = exports.formatDateTime = exports.formatDate = exports.formatMinutes = void 0;
/**
 * Format a number of minutes into a human-readable time string
 */
var formatMinutes = function (minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    if (hours > 0) {
        return "".concat(hours, "h ").concat(mins, "m");
    }
    return "".concat(mins, "m");
};
exports.formatMinutes = formatMinutes;
/**
 * Format a date in a human-readable format
 */
var formatDate = function (date) {
    var dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
exports.formatDate = formatDate;
/**
 * Format a timestamp in a human-readable format
 */
var formatDateTime = function (date) {
    var dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
exports.formatDateTime = formatDateTime;
/**
 * Format a percentage (0-100)
 */
var formatPercentage = function (value) {
    return "".concat(Math.round(value), "%");
};
exports.formatPercentage = formatPercentage;
