/**
 * Simple media type parsing and formatting.
 * @see https://tools.ietf.org/html/rfc6838/
 *
 * Based on work by:
 *
 * 	Copyright(c) 2015 Douglas Christopher Wilson
 *  MIT Licensed
 *
 * @see https://github.com/jshttp/content-type/.
 *
 * Use it like:
 *
 * @example
 * var mediaType = meaty.parse('application/vnd.mayfield.msg.v1+json; chunksize=512');
 * assert(mediaType.type === 'application'));
 * assert(mediaType.subType === 'mayfield.msg.v1');
 * assert(mediaType.tree === 'vnd');
 * assert(mediaType.suffix === 'json');
 * assert(mediaType.parameters === {'chunksize': '512'});
 * assert(mediaType.format() === 'application/vnd.mayfield.msg.v1+json; chunksize=512');
 */

var meaty = meaty || {};

/**
 * Pattern for parsing the type, subType, tree and suffx parts of a type.
 * @type {RegExp}
 * @see https://tools.ietf.org/html/rfc6838#section-4.2
 */
meaty.typeRegExp = /^([a-zA-Z0-9][a-zA-Z0-9!#\$&-\^_\.\+]*)\/([a-zA-Z0-9][a-zA-Z0-9!#\$&-\^_\.\+]*)?$/;

/**
 * Pattern for parsing the key and value parts of a parameter.
 * @type {RegExp}
 * @see https://tools.ietf.org/html/rfc6838#section-4.3
 */
meaty.parameterRegExp = /([a-zA-Z0-9][a-zA-Z0-9!#\$&-\^_\.\+]*)\s*=\s*([a-zA-Z0-9][a-zA-Z0-9!#\$&-\^_\.\+]*)$/g;

/**
 * [parse description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
meaty.parse = function (string) {
  var obj = {};

  // partition
  var parametersIndex = string.indexOf(';');
  var type = (parametersIndex !== -1 ? string.substr(0, parametersIndex) : string).trim();

  // parse type
  var match = meaty.typeRegExp.exec(type);
  if (match === null) {
    throw new Error('Invalid media type "' + string + '".');
  }
  obj.type = match[1];
  obj.subType = match[2];
  obj.suffix = null;
  obj.tree = null;
  var index = obj.subType.lastIndexOf('+');
  if (index !== -1) {
    obj.suffix = obj.subType.substr(index + 1);
    obj.subType = obj.subType.substr(0, index);
  }
  index = obj.subType.indexOf('.');
  if (index !== -1) {
    obj.tree = obj.subType.substr(0, index);
    obj.subType = obj.subType.substr(index + 1);
  }

  // parse parameters
  obj.parameters = {};
  meaty.parameterRegExp.lastIndex = parametersIndex;
  var key, value;
  while ((match = meaty.parameterRegExp.exec(string)) !== null) {
    key = match[1];
    value = match[2];
    obj.parameters[key] = value;
  }

  return new meaty.MediaType(obj);
};

/**
 * [format description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
meaty.format = function (obj) {
    var parts = [obj.type, '/'];
    if ('tree' in obj && obj.tree !== null)
        parts.push(obj.tree, '.');
    parts.push(obj.subType);
    if ('suffix' in obj && obj.suffix !== null)
        parts.push('+', obj.suffix);
    if (obj.parameters) {
      if (obj.parameters.length !== 0) {
        parts.push(';');
        for (var key in obj.parameters) {
            if (!obj.parameters.hasOwnProperty(key))
              continue;
            var value = obj.parameters[key];
            parts.push(' ', key, '=', value);
        }
      }
    }
    return parts.join('');
};

/**
 * [MediaType description]
 * @param {[type]} obj [description]
 */
meaty.MediaType = function (obj) {
  if (typeof obj == 'string' || obj instanceof String) {
    return meaty.parse(obj);
  }
  this.type = obj.type;
  this.tree = obj.tree;
  this.subType = obj.subType;
  this.suffix = obj.suffix;
  this.parameters = obj.parameters;
};

/**
 * [hasTree description]
 */
meaty.MediaType.hasTree = function () {
  return this.tree !== null;
};

/**
 * [hasSuffix description]
 */
meaty.MediaType.hasSuffix = function () {
  return this.suffix !== null;
};

/**
 * [format description]
 * @return {[type]} [description]
 */
meaty.MediaType.format = function () {
    meaty.format(this);
};
