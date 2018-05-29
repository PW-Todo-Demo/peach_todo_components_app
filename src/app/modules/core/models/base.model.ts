import { DB_FIELDS } from '../../../app.const';
import * as _ from 'lodash';

export class BaseModel {

  protected _id: number;
  protected _created_at: string;
  protected _created_by: string;
  protected _updated_at: string;
  protected _updated_by: string;
  protected _is_deleted: boolean;
  protected _uri: string;

  constructor(rawData: object = {}) {

    _.each(
      _.pick(rawData, DB_FIELDS),
      (value, key) => {
        this[`_${key}`] = value;
      }
    );

  }

  forDB(): object {

    let dbObject: object = {
      id: this.id
    };

    return dbObject;

  }

  get id(): number {
    return this._id;
  }

  static getApiKey(): string {
    return '';
  }

  static fromRaw(data: any = null): BaseModel | Array<BaseModel> {

    if (_.isArray(data)) {

      let baseModels = [];

      _.each(
        data,
        (bm) => {
          baseModels.push(new BaseModel(bm));
        }
      );

      return baseModels;

    }

    if (_.isObject(data)) {

      let baseModel = new BaseModel(data);

      return baseModel;

    }

    return null;

  }

  static isValid(modelInstance: any = null): boolean {
    return modelInstance &&
      modelInstance instanceof BaseModel;
  }

}
