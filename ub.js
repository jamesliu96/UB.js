/*!
 * UB.js - U2B & B2U polyfill
 * https://github.com/jamesliu96/UB.js
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(c) {
    c.utob = c.utob || function(c) {
        return c.replace(/[\ud800-\udbff][\udc00-\udffff]|[^\x00-\x7f]/g, function(a) {
            if (2 > a.length) {
                var b = a.charCodeAt(0);
                return 128 > b ? a : 2048 > b ? String.fromCharCode(192 | b >>> 6) + String.fromCharCode(128 | b & 63) : String.fromCharCode(224 | b >>> 12 & 15) + String.fromCharCode(128 | b >>> 6 & 63) + String.fromCharCode(128 | b & 63);
            }
            b = 65536 + 1024 * (a.charCodeAt(0) - 55296) + (a.charCodeAt(1) - 56320);
            return String.fromCharCode(240 | b >>> 18 & 7) + String.fromCharCode(128 | b >>> 12 & 63) + String.fromCharCode(128 | b >>> 6 & 63) + String.fromCharCode(128 | b & 63);
        });
    };
    c.btou = c.btou || function(c) {
        return c.replace(/[\u00c0-\u00df][\u0080-\u00bf]|[\u00e0-\u00ef][\u0080-\u00bf]{2}|[\u00f0-\u00f7][\u0080-\u00bf]{3}/g, function(a) {
            switch (a.length) {
                case 4:
                    return a = ((7 & a.charCodeAt(0)) << 18 | (63 & a.charCodeAt(1)) << 12 | (63 & a.charCodeAt(2)) << 6 | 63 & a.charCodeAt(3)) - 65536, String.fromCharCode((a >>> 10) + 55296) + String.fromCharCode((a & 1023) + 56320);
                case 3:
                    return String.fromCharCode((15 & a.charCodeAt(0)) << 12 | (63 & a.charCodeAt(1)) << 6 | 63 & a.charCodeAt(2));
                default:
                    return String.fromCharCode((31 & a.charCodeAt(0)) << 6 | 63 & a.charCodeAt(1));
            }
        });
    };
})(this);