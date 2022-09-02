import Yargs from "yargs";
const yargs = Yargs(process.argv.slice(2));
const args = yargs
  .alias({
    p: "puerto",
    m: "modo"
  })
  .default({
    puerto: 8090,
    modo: 'fork'
  }).argv;

 
  export default args