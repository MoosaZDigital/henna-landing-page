const key = process.env.API_KEY;
console.log("Key loaded:", key ? "yes" : "no");
console.log("First 4 characters:", key.slice(0, 4));