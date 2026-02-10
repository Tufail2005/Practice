import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// The "Remote" procedure
function add(a, b) {
  return a + b;
}

// Handle JSON-RPC request
app.post("/rpc", (req, res) => {
  const { jsonrpc, method, params, id } = req.body;

  // Basic Validation
  if (jsonrpc !== "2.0" || !method || !Array.isArray(params)) {
    return res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32600, message: "Invalid Request" },
      id: id || null,
    });
  }

  //Execute the method
  let result;
  switch (method) {
    case "add":
      result = add(params[0], params[1]);
      break;
    default:
      return res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32601, message: "Method not found" },
        id,
      });
  }

  // Send back the successful response
  // Fixed: Ensure the object keys are correctly mapped
  res.json({
    jsonrpc: "2.0",
    result: result,
    id: id,
  });
});

app.listen(port, () => {
  console.log(`RPC Server running at http://localhost:${port}`);
});
