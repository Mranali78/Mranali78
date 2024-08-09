
try {
    let age = prompt("what's the age?")
    age = Number.parseInt(age)
    if(age > 150){

        throw new ReferenceError("this is not true");
    }
//   console.log(thor);
  //   throw new Error("your skills are dull");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error.stack);
}

console.log("abhi bhi ghume ja rha hai")
