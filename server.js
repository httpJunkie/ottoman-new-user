require('dotenv').config()
const { cbUser, cbPass } = process.env

var ottoman = require('ottoman')
var couchbase = require('couchbase')

var cluster = new couchbase.Cluster('couchbase://localhost')

cluster.authenticate(cbUser, cbPass)
ottoman.bucket = cluster.openBucket('task-management')

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
  name: 'walk the dog',
  complete: false,
  priority: 2,
  created: Date.now()
});
var todo_03 = new Todo({
  name: 'walk the cat',
  complete: false,
  priority: 2,
  created: Date.now()
});

todo_01.save((err) => err
  ? console.error(err)
  : console.info("success: Todo added!")
);

todo_02.save((err) => err
  ? console.error(err)
  : console.info("success: Todo added!")
);

todo_03.save((err) => err
  ? console.error(err)
  : console.info("success: Todo added!")
);

const p_ensureIndices = () => {
  return new Promise((resolve, reject) => {
    ottoman.ensureIndices(error => {
      error
        ? reject(`Rejected: ${error}`)
        : resolve(`Resolved: Indicies persisted and usable!`)
    });
  })
}

const onIndiciesFulfilled = (result) => {
  console.log(result)
  Todo.findByName('take out trash', (err, todo) => {
    if (err) return console.error(err)
    console.log(todo)
  })
  Todo.findByName('walk the cat', (err, todo) => {
    if (err) return console.error(err)
    console.log(todo)
  })
}

const onIndiciesRejected = (error) => {
  console.info(error)
}

p_ensureIndices()
  .then(onIndiciesFulfilled)
  .catch(onIndiciesRejected)