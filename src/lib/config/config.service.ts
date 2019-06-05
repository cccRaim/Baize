import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as lodash from 'lodash';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = yaml.safeLoad(fs.readFileSync(filePath));
  }

  get(key: string): any {
    return lodash.get(this.envConfig, key);
  }
}
