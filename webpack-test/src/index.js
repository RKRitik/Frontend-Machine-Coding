import { add, getFeatureFlag } from "./utils";
import { isNull } from "./ts-test.ts";

console.log(add(2, 3));
console.log(getFeatureFlag("fast"));
let val;
if (isNull(val)) {
  console.log("is null");
} else {
  console.log("not null");
}
