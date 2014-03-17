define(function(require, exports, module){

	"use strict";

	exports = {};

	var StringProto = String.prototype;
	var ObjProto = Object.prototype;
	var ArrayProto = Array.prototype;
	var toString = ObjProto.toString;
	var slice = ArrayProto.slice;
	var hasOwnProperty = ObjProto.hasOwnProperty;
	var nativeKeys = Object.keys;
	var nativeForEach = ArrayProto.forEach;
	var nativeIsArray = Array.isArray;
	var nativeTrim = String.prototype.trim;
	var breaker = false;

	var keyfn = exports.keys = function(obj) {
		if (!isObject(obj)) return [];
		if (nativeKeys) return nativeKeys(obj);
		var keys = [];
		for (var key in obj) if (has(obj, key)) keys.push(key);
		return keys;
	};

	var isObject = exports.isObject = function(obj) {
		return obj === Object(obj);
	};

	var isArray = exports.isArray = nativeIsArray || function(obj) {
		return toString.call(obj) === '[object Array]';
	};

	var isUndefined = exports.isUndefined = function(obj) {
		return obj === void 0;
	};

	var has = exports.has = function(obj, key) {
		return hasOwnProperty.call(obj, key);
	};

	var trim = exports.trim = function(str, characters){
		if (str === null) return '';
		if (!characters && nativeTrim) return nativeTrim.call(str);
		characters = defaultToWhiteSpace(characters);
		return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
	};

	var partial = exports.partial = function(func) {

		var boundArgs = slice.call(arguments, 1);

		return function() {

			var position = 0;
			var args = boundArgs.slice();

			for (var i = 0, length = args.length; i < length; i++)
				if (args[i] === partial.placeholder)
					args[i] = arguments[position++];

			while (position < arguments.length)
				args.push(arguments[position++]);

			return func.apply(this, args);

		};

	};

	partial.placeholder = '?';

	var each = exports.each = exports.forEach = function(obj, iterator, context) {
		var i, length;
		if (obj === null) return obj;
		if (nativeForEach && obj.forEach === nativeForEach) {
			obj.forEach(iterator, context);
		} else if (obj.length === +obj.length) {
			for (i = 0, length = obj.length; i < length; i++) {
				if (iterator.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			var keys = keyfn(obj);
			for (i = 0, length = keys.length; i < length; i++) {
				if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
			}
		}
		return obj;
	};

	function defaultToWhiteSpace(characters) {
		if (characters === null)
			return '\\s';
		else if (characters.source)
			return characters.source;
		else
			return '[' + _s.escapeRegExp(characters) + ']';
	}

	return exports;

});