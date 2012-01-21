/**
 * Copyright (C) 2012 Ansvia Inc.
 * Ported to closure-library based on Andrea Giamarchi's code.
 * Author: Robin Syihab.
 */
/**
 * Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

goog.provide("mt.compression.Jsonh");
goog.require("goog.array");

/**
 * @constructor
 */
mt.compression.Jsonh = function(list){
	/*@reserved*/
	this.list_ = list;
};

/**
 * @private
 */
mt.compression.Jsonh.prototype.objectKeys_ = function(obj){
	var Object_keys = Object.keys || function (o) {
        var keys = [], key;
        for (key in o) o.hasOwnProperty(key) && keys.push(key);
        return keys;
    }
	return Object_keys(obj);
};

/**
 * @private
 */
mt.compression.Jsonh.prototype.hpack_ = function(list){
	var length = list.length,
		keys = this.objectKeys_(length ? list[0] : {}),
		klength = keys.length,
		result = Array(length * klength),
		i, j = 0, ki, o;
	
	for(i = 0; i < length; ++i){
		o = list[i];
		for ( ki = 0; ki < klength; ki++ ){
			result[j++] = o[keys[ki]];
		}
	}
	return goog.array.concat([klength], keys, result);
};

/**
 * @private
 */
mt.compression.Jsonh.prototype.hunpack_ = function(hlist){
	var length = hlist.length,
		klength = hlist[0],
		result = Array(((length - klength - 1) / klength) || 0),
		i = 1 + klength,
		j = 0, z,
		ki;
	
	for (; i < length; ){
		z = {};
		result[j++] = z;
		for(ki = 0; ki < klength; ){
			z[hlist[++ki]] = hlist[i++];
		}
	}
	return result;
};

/**
 * @private
 */
mt.compression.Jsonh.prototype.iteratingWith_ = function(method){
	return function(item){
		var path = this,
			current = item,
			i, 
			length = path.length,
			j, k, tmp;
		for(i=0; i < length; ++i){
			k = path[i];
			tmp = current[k];
			if( isArray(tmp) ){
				j = i + 1;
				current[k] = j < length ? goog.array.map(tmp, method, path.slice(j)) : method(tmp);
			}
			current = current[k];
		}
		return item;
	};
};

/**
 * @private
 */
mt.compression.Jsonh.prototype.packOrUnpack_ = function(method){
	return function(o, schema){
		var wasArray = isArray(o),
			result = goog.array.concat(arr, o),
			path = goog.array.concat(arr, schema),
			i, length = path.length;
		for(i=0;i<length;++i){
			//result = map.call(result, method, path[i].split("."));
			result = goog.array.map(result, method, path[i].split("."));
		}
		return wasArray ? result : result[0];
	};
};

mt.compression.Jsonh.prototype.pack = function(list, schema){
	return schema ? 
		this.packOrUnpack_(this.iteratingWith_(this.hpack_)) : 
		this.hpack_(list);
};

mt.compression.Jsonh.prototype.unpack = function(hlist, schema){
	return schema ? 
		this.packOrUnpack_(this.iteratingWith_(this.hunpack_)) : 
		this.hunpack_(hlist);
};

mt.compression.Jsonh.prototype.stringify = function(list, replacer, space, schema){
	JSON.stringify(this.pack(list, schema), replacer, space);
};

mt.compression.Jsonh.prototype.parse = function(hlist, reviver, schema){
	this.unpack(JSON.parse(hlist, reviver), schema);
};

