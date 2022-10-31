/**
 * AdminApi.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'adminapi',
  attributes: {
    nombre: {type: 'string', required: true},
    apellido: {type: 'string', required: true},
    cargo: {type: 'string',required: true},
    acceso: {type: 'number', required: true},

  },
};

