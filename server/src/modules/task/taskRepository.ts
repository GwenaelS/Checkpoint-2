import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  user_id: number;
  project_id: number;
};

class TaskRepository {
  // The C of CRUD - Create operation

  async create(task: Omit<Task, "id">) {
    // Execute the SQL INSERT query to add a new task to the "task" table
    const [result] = await databaseClient.query<Result>(
      "insert into task (title, description, status, user_id, project_id) values (?, ?, ?, ?, ?)",
      [
        task.title,
        task.description,
        task.status,
        task.user_id,
        task.project_id,
      ],
    );

    // Return the ID of the newly inserted task
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific task by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from task where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the task
    return rows[0] as Task;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tasks from the "task" table
    const [rows] = await databaseClient.query<Rows>("select * from task");

    // Return the array of tasks
    return rows as Task[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing task

  // async update(task: Task) {
  //   ...
  // }

  // The D of CRUD - Delete operation

  async delete(id: number) {
    // Execute the SQL DELETE query to remove a specific task by its ID
    await databaseClient.query("delete from task where id = ?", [id]);
  }
}

export default new TaskRepository();
