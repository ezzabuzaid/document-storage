import { SyncStorage } from "../types";

export class LocalStorage implements SyncStorage {
  protected storage = localStorage

  constructor(
    private name = 'storage',
  ) { }

  public dataSet() {
    const storage = JSON.parse(this.storage.getItem(this.name))
    return storage || {};
  }

  private presist<T>(name: string, value: T) {
    const item = this.dataSet();
    const temp = item[name];
    item[name] = value;
    this.storage.setItem(this.name, JSON.stringify(item));
    return temp as T;
  }

  /**
   * 
   * @param name name of the entity
   */
  public set<T>(name: string, value: any) {
    return this.presist<T>(name, value);
  }

  /**
   * 
   * @param name get an entity by it's key
   */
  public get<T>(name: string): T {
    return this.dataSet()[name] || null;
  }

  /**
   * 
   * clear out the entire dataSet
   * this will store the data set as plain object
   */
  public clear() {
    this.storage.removeItem(this.name);
    this.storage.setItem(this.name, JSON.stringify({}));
  }

  /**
   * 
   * @param name name of the entity,
   * store the value as null
   */
  public delete<T>(name: string) {
    return this.presist<T>(name, null);
  }

}
