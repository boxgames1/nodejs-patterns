const fs = require("fs");
const ini = require("ini");
const objectPath = require("object-path");

class Config {
  constructor(strategy) {
    this.data = {};
    this.strategy = strategy;
  }
  get(path) {
    return objectPath.get(this.data, path);
  }

  set(path, value) {
    return objectPath.set(this.data, path, value);
  }

  read(file) {
    console.log(`Deserializing to ${file}`);
    this.data = this.strategy.deserialize(fs.readFileSync(file, "utf-8"));
  }

  save(file) {
    console.log(`Serializing to ${file}`);
    fs.writeFileSync(file, this.strategy.serialize(this.data));
  }
}

const jsonStrategies = {
  serialize: data => JSON.stringify(data, null, " "),
  deserialize: data => JSON.parse(data)
};

const iniStrategies = {
  serialize: data => ini.stringify(data),
  deserialize: data => ini.parse(data)
};

const jsonConfig = new Config(jsonStrategies);
jsonConfig.read("package.json");
jsonConfig.set("test.nodejs", "design patterns");
jsonConfig.save("new.json");

const iniConfig = new Config(iniStrategies);
iniConfig.read("package.json");
iniConfig.set("test.nodejs", "design patterns INI");
iniConfig.save("new.ini");
