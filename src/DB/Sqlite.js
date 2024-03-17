import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'todo.db',
        location: 'default',
    },
    () => console.log('Database opened successfully'),
    error => console.error('Error opening database', error)
);


const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date TEXT,
        completed INTEGER
      )`,
            [],
            () => console.log('Table created successfully'),
            (_, error) => console.error('Error creating table', error)
        );
    });
};


const addTodo = (title, date, completed) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO todos (title, date, completed) VALUES (?, ?, ?)',
            [title, date, completed ? 1 : 0],
            (_, results) => {
                console.log('Todo item inserted successfully');
            },
            (_, error) => {
                console.error('Error inserting todo item', error);
            }
        );
    });
};


const updateTodo = (id, title, date, completed) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE todos SET title = ?, date = ?, completed = ? WHERE id = ?',
            [title, date, completed ? 1 : 0, id],
            (_, results) => {
                console.log('Todo item updated successfully');
            },
            (_, error) => {
                console.error('Error updating todo item', error);
            }
        );
    });
};


const deleteTodo = id => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM todos WHERE id = ?',
            [id],
            (_, results) => {
                console.log('Todo item deleted successfully');
            },
            (_, error) => {
                console.error('Error deleting todo item', error);
            }
        );
    });
};

const getAllTodos = callback => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM todos',
            [],
            (_, results) => {
                const { rows } = results;
                const len = rows.length;
                const todos = [];
                for (let i = 0; i < len; i++) {
                    const { id, title, date, completed } = rows.item(i);
                    todos.push({ id, title, date, completed: completed === 1 });
                }
                callback(todos);
            },
            (_, error) => {
                console.error('Error retrieving todo items', error);
                callback([]);
            }
        );
    });
};


initDatabase();

export { addTodo, updateTodo, deleteTodo, getAllTodos };
