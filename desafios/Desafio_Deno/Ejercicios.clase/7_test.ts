import{
    assertEquals,
    assertStrictEquals,
} from "https://deno.land/std/testing/asserts.ts"

Deno.test("example", ():void=>{
    assertEquals("world","world");
    assertEquals({saludo:"hola"}, {saludo:"hola"})
})
Deno.test("strictyEqual", ():void =>{
    const a={};
    const b=a;
    assertStrictEquals("world","world");
    assertStrictEquals(a,b)
})