* Revealing module pattern: Export as functions in an object to closure parts of the module and avoid expostion of the exterior
* Polluting the global scope is considered bad practice and nullifies the advantge if having module system. So, use it only if you really know what you are doing
* module.exports is for assign while exports is to access a property of it