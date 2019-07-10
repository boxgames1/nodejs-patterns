/*
 *  Substack pattern: Expose the main functionallity
 *  of a module by exporting only one function.
 *  Use the exported function as a namespace to
 *  expose any auxiliary functionallity.
 */

const logger = require("./logger");

logger("bla bla bla");
logger.verbose("bla bla bla");
