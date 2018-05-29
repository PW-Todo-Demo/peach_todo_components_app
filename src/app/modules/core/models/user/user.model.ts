import { BaseModel } from '../base.model';
import * as _ from 'lodash';

const API_KEY = 'users';
const DEFAULT_USERNAME = '[Unknown user]';
const FIELDS = ['first_name', 'last_name'];

export class User extends BaseModel {

  protected _first_name: string = null;
  protected _last_name: string = null;

  constructor(rawData: object = {}) {

    super(rawData);

    _.each(
      _.pick(rawData, FIELDS),
      (value, key) => {
        this[`_${key}`] = value;
      }
    );

  }

  public get firstName(): string {
    return this._first_name;
  }

  public get lastName(): string {
    return this._last_name;
  }

  public get userName(): string {
    return (this.firstName || this.lastName) ? `${this.firstName} ${this.lastName}` : DEFAULT_USERNAME;
  }

  public forDB(): object {

    let dbObject: object = {};

    _.each(
      FIELDS,
      (fieldName) => {
        dbObject[fieldName] = this[`_${fieldName}`];
      }
    );

    if (this.id) {
      dbObject['id'] = this.id;
    }

    return dbObject;

  }

  public static getApiKey(): string {
    return API_KEY;
  }

  public static getDefaultUserName(): string {
    return DEFAULT_USERNAME;
  }

  public static fromRaw(data: any = null): User | Array<User> {

    if (_.isArray(data)) {

      let users = [];

      _.each(
        data,
        (u) => {
          users.push(new User(u));
        }
      );

      return users;

    }

    if (_.isObject(data)) {

      let user = new User(data);

      return user;

    }

    return null;

  }

  public static isValid(user: any = null): boolean {

    return user &&
      user instanceof User &&
      _.isString(user.firstName) &&
      _.isString(user.lastName) &&
      _.isNumber(user.id);

  }

}
