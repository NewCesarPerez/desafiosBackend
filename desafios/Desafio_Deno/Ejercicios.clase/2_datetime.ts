import {parse} from "https://deno.land/std@0.161.0/datetime/mod.ts";

const myDate=parse("04-07-2021", "dd-mm-yyyy");
console.log(myDate)