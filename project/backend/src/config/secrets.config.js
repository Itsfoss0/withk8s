/*
 * provides a centralized file
 * to manage configuration data
 * for the applicaion
 *
 */

require('dotenv').config();

const PORT = process.env.PORT;

module.exports = {
  PORT
};
