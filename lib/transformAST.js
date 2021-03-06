'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformAST = transformAST;

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformAST(metadata, schema, ast) {
  ast = (0, _clone2.default)(ast);

  var reduceAST = function reduceAST(type, fields) {
    Object.keys(fields).forEach(function (fieldName) {
      var field = fields[fieldName];
      var typeField = type.getFields()[fieldName];

      if (!typeField) {
        delete fields[fieldName];
      } else {
        reduceAST(typeField.type.ofType || typeField.type, field.fields);
      }
    });
  };

  reduceAST(schema.getQueryType(), ast.fields);

  return ast;
}