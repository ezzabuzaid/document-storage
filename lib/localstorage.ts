import { Storage } from "..";

export class LocalStorage implements Storage {
  private storage = localStorage;

  constructor(
    private name: string
  ) { }

  private getItem() {
    return JSON.parse(this.storage.getItem(this.name));
  }

  private presist<T>(item: any) {
    this.storage.setItem(this.name, item);
  }

  set(name: string, value: any) {
    const item = this.getItem();
    item[name] = value;
    this.presist(item);
  }

  get<T>(name: string): T {
    return this.getItem()[name];
  }

  clear() {
    this.storage.removeItem(this.name);
  }

  delete<T>(name: string) {
    const item = this.getItem();
    const temp = item[name];
    item[name] = null;
    this.presist<T>(item);
    return temp;
  }

}
