var todo = {};

var Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = data.done ? m.prop(data.done) : m.prop(false);
};

var Pouch = function() {
  this.db = new PouchDB({ name: 'mithril-todo', auto_compaction: true });

  this.load = function() {
    return this.db.get('todos')
      .then(function(retrieved) {
        if (retrieved)
          return JSON.parse(retrieved.todos).map(function(parsed) { return new Todo(parsed); });
        else
          return [];
      })
      .catch(function(error) {
        console.error('error loading!', error);
        return [];
      });
  };

  this.store = function(todos) {
    this.db.upsert('todos', function() {
      return { todos: JSON.stringify(todos) };
    }).catch(function(error) {
      console.error('store failed!', error);
    });
  };
};

var TodoList = function() {
  var db = new Pouch();
  var todos = m.prop(db.load());
  todos.then(todos);

  this.push = function(todo) {
    todos().push(todo);
    db.store(todos());
  };

  this.splice = function(todo) {
    var dos = todos();
    dos.splice(dos.indexOf(todo), 1);
    db.store(todos());
  };

  this.update = function(todo) {
    var dos = todos();
    dos[dos.indexOf(todo)] = todo;
    todos(dos);
    db.store(todos);
  };

  this.map = function(func) {
    var dos = todos();
    if (dos)
      return dos.map(func);
    else
      todos.then(m.redraw);
  };
};

todo.vm = {
  init: function() {
          todo.vm.list = new TodoList();

          todo.vm.description = m.prop('');

          function addTodo() {
            if (todo.vm.description()) {
              todo.vm.list.push(new Todo({ description: todo.vm.description() }));
              todo.vm.description('');
            }
          }

          todo.vm.keyup = function(e) {
            todo.vm.description(e.target.value);
            e.preventDefault();
            if (e.which === 13)
              addTodo();
          };

          todo.vm.toggle = function() {
            this.done(!this.done());
            todo.vm.list.update(this);
          };

          todo.vm.remove = function() {
            todo.vm.list.splice(this);
          };
        }
};

todo.controller = function() {
  todo.vm.init();
};

todo.view = function() {
  return <div>
            {
              todo.vm.list.map(function(task, index) {
                return <div class="task">
                          <i class={ task.done() ? "icon-cancel-done" : "icon-angle-right" }></i>
                          <span class="align-text"
                            style={ task.done() ? "color: grey;" : "color: inherit;" }>
                            { task.description() }
                          </span>
                          <i class="icon-emo-thumbsup"
                            onclick={ todo.vm.toggle.bind(task) }>
                          </i>
                          <i class="icon-cancel"
                            onclick={ todo.vm.remove.bind(task) }>
                          </i>
                       </div>
              })
            }
            <input type="text" autofocus placeholder="What do you need done?"
              value={ todo.vm.description() }
              onkeyup={ todo.vm.keyup }
            />
      </div>
};

m.mount(document.getElementById('todoApp'), todo);