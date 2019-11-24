import { SyncStorage } from "../types";

export class LocalStorage implements SyncStorage {
  protected storage = localStorage

  constructor(
    private name = 'storage',
  ) { }

  private getItem() {
    const storage = JSON.parse(this.storage.getItem(this.name))
    return storage || {};
  }

  private presist<T>(name: string, value: T) {
    const item = this.getItem();
    const temp = item[name];
    item[name] = value;
    this.storage.setItem(this.name, item);
    return temp as T;
  }

  set<T>(name: string, value: any) {
    return this.presist<T>(name, value);
  }

  get<T>(name: string): T {
    return this.getItem()[name];
  }

  clear() {
    this.storage.removeItem(this.name);
  }

  delete<T>(name: string) {
    return this.presist<T>(name, null);
  }

}
