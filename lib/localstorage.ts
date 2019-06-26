import { Storage } from "..";

export class LocalStorage implements Storage {
  protected storage = localStorage;

  constructor(
    private name: string
  ) { }

  private getItem() {
    return JSON.parse(this.storage.getItem(this.name));
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
