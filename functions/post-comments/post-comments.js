/* eslint-disable */
exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, "")
  const segments = path.split("/").filter(e => e)

  switch (event.httpMethod) {
    case "GET":
      // e.g. GET /.netlify/functions/fauna-crud/123456
      if (segments.length === 1) {
        event.id = segments[0]
        return require("./read-all").handler(event, context)
      } else {
        return {
          statusCode: 500,
          body:
            "too many segments in GET request, must be either /.netlify/functions/fauna-crud or /.netlify/functions/fauna-crud/123456",
        }
      }
    case "POST":
      // e.g. POST /.netlify/functions/fauna-crud with a body of key value pair objects, NOT strings
      return require("./create").handler(event, context)
  }
  return {
    statusCode: 500,
    body: "unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE",
  }
}
