var ottoman = require('ottoman');
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('couchbase://localhost')
cluster.authenticate('Administrator', 'password')
ottoman.bucket = cluster.openBucket('task-management');

// Let's create our model to store Todo, this
var Todo = ottoman.model('todo', {
  name: 'string',
  complete: 'boolean',
  priority: 'integer',
  created: 'Date'
}, {
  index: {
    findByName: {
      by: 'name',
      type: 'refdoc'
    },
    // findByPriority: {
    //   by: 'priority',
    //   type: 'n1ql'
    // }
  }
});

var todo_01 = new Todo({ 
  name: 'take out trash', 
  complete: false, 
  priority: 1,
  created: Date.now()
});
var todo_02 = new Todo({ 
  name: 'take dog on walk', 
  complete: false, 
  priority: 2,
  created: Date.now()
});
var todo_03 = new Todo({ 
  name: 'take cat on walk', 
  complete: false, 
  priority: 2,
  created: Date.now()
});

todo_01.save((err) => {
  if (err) return console.error(err);
});

todo_02.save((err) => {
  if (err) return console.error(err);
});

todo_03.save((err) => {
  if (err) return console.error(err);
});

ottoman.ensureIndices( (err) => {
  if (err) return console.log('indices create failed', err);
  console.log('indices ready to use!');
});

Todo.findByName('take out trash', (err, todo) => {
  if (err) return console.error(err);
  console.log(todo);
})

// let statement = "SELECT todo.* FROM `task-management` AS todo WHERE todo.priority = 2;"
// Todo.findByPriority(statement, (err, todos) => {
//   if (err) return console.error(err);
//   console.log(todos);
// })