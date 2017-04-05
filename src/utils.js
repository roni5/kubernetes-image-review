import fs from 'fs';
import yaml from 'js-yaml';

function loadYamlFile(name) {
  return yaml.load(
    fs.readFileSync(name, {encoding: 'utf-8'})
  )
}