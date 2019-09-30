import { UserSettingsDataset } from "./lib/async/async.example";
import { AsyncDatabase } from "./lib/async/async.database";

const myAsync = new AsyncDatabase(new UserSettingsDataset());
const collection = myAsync.collection('Filters.leads');

myAsync.clear();