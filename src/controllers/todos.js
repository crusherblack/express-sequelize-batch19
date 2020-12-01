//dummy data todos
let todos = [
  {
    id: 1,
    title: "Belajar Express.js",
    isDone: false,
  },
  {
    id: 2,
    title: "Belajar Node.js",
    isDone: true,
  },
];

// create route for todos endpoint to show todos data
exports.getTodos = (req, res) => {
  res.send({
    status: "Response Success",
    data: todos,
  });
};

// get spesefic data from todo by id paramater
exports.getTodo = (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);

  //logic pengecekan jika data yang dicari gak ada
  if (!todo) {
    return res.send({
      status: "Data Not Found",
      data: null,
    });
  }

  //kalau dataada kirim
  res.send({
    status: "Response Success",
    data: todo,
  });
};

// add new resource to todos
exports.addTodo = (req, res) => {
  const todo = req.body;
  // menambahkan todo menggunakan array spread operator
  todos = [...todos, todo];
  res.send({
    status: "Response Success",
    data: todo,
  });
};

// update spesific todo from todos by id params
exports.updateTodo = (req, res) => {
  const { id } = req.params; // const id = req.params.id;

  // update todo sesuai dengan id yang dikirim menggunakan map
  todos = todos.map((todo) => (todo.id == id ? req.body : todo));

  res.send({
    status: "Response Success",
    data: req.body,
  });
};

// delete spesific resource by id params
exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  // modifikasi todos sesuai dengan filter
  // sehingga yang tampil hanya data yang tidak kita delete
  todos = todos.filter((todo) => todo.id != id);

  res.send({
    status: "Deleted Success",
    data: id,
  });
};
