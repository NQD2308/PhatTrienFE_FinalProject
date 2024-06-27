// const express = require("express");
// const cors = require("cors");
// var corsOptions = {
//   origin: "http://localhost:4200",
//   //domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép),
//   //giả sử node server là http://localhost:8000
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// const app = express();
// app.use(cors(corsOptions));
// app.listen(8000, () => {
//   console.log("Server started!");
// });

// let items = [
//   { name: "lilly", id: "id1" },
//   { name: "Oscar", id: "id2" },
// ];

// // app.route("/api/items").get((req, res) => {
// //   console.log("items");
// //   res.send([
// //     { name: "lilly", id: "id1" },
// //     { name: "Oscar", id: "id2" },
// //   ]);
// // });

// // app.route('/api/item').get((req, res) => {
		 
// //   console.log('insert item');
// //   console.log('item info:'+req.body);
// //   //res.send(201, req.body);
// //   res.status(200).send(req.body);
// //   });

// // app.route('/api/insert').post((req, res) => {
		 
// //   console.log('insert item');
// //   console.log('item info:'+req.body);
// //   //res.send(201, req.body);
// //   res.status(201).send(req.body);
// //   });

// // app.route('/api/member/insert').post((req, res) => {
		 
// //   console.log('insert member');
// //   console.log('item info:'+req.body);
// //   //res.send(201, req.body);
// //   res.status(201).send(req.body);
// //   });


// // Route để lấy danh sách các items
// app.get("/api/items", (req, res) => {
//   console.log("GET /api/items");
//   res.json(items);
// });

// // Route để thêm một item mới
// app.post("/api/items", (req, res) => {
//   const newItem = req.body;
//   console.log("POST /api/items", newItem);
//   items.push(newItem);
//   res.status(201).json(newItem);
// });

// // Route để cập nhật một item đã tồn tại
// app.put("/api/items/:id", (req, res) => {
//   const itemId = req.params.id;
//   const updatedItem = req.body;
//   console.log("PUT /api/items/", itemId, updatedItem);
//   const index = items.findIndex((item) => item.id === itemId);
//   if (index !== -1) {
//     items[index] = updatedItem;
//     res.json(updatedItem);
//   } else {
//     res.status(404).json({ error: "Item not found" });
//   }
// });

// // Route để xóa một item
// app.delete("/api/items/:id", (req, res) => {
//   const itemId = req.params.id;
//   console.log("DELETE /api/items/", itemId);
//   const index = items.findIndex((item) => item.id === itemId);
//   if (index !== -1) {
//     items.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).json({ error: "Item not found" });
//   }
// });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(express.json()); // Middleware để parse JSON body
app.use(cors()); // CORS middleware để cho phép cross-origin requests

let items = [
  { name: "lilly", id: "id1" },
  { name: "Oscar", id: "id2" },
];

// Route để lấy danh sách các items
app.get("/api/items", (req, res) => {
  console.log("GET /api/items");
  res.json(items);
});

// Route để thêm một item mới
app.post("/api/items", (req, res) => {
  const newItem = req.body;
  console.log("POST /api/items", newItem);
  items.push(newItem);
  res.status(201).json(newItem);
});

// Route để cập nhật một item đã tồn tại
app.put("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  console.log("PUT /api/items/", itemId, updatedItem);
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Route để xóa một item
app.delete("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  console.log("DELETE /api/items/", itemId);
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

