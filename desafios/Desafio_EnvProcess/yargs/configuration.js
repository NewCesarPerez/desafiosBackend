import Yargs from "yargs";
const yargs = Yargs(process.argv.slice(2));
const args = yargs
  .alias({
    p: "puerto",
  })
  .default({
    puerto: 8090,
  }).argv;

 
  export default args.puerto