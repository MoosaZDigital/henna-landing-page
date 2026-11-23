export default {
  fetch(req) {

    console.log("Someone called my function!");
    return Response.json(
      { message: "Hello from my server" },
      {headers: { "Access-Control-Allow-Origin": "*"} }
    );
  },
};