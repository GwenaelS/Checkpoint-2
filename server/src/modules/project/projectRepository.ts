import { P } from "@faker-js/faker/dist/airline-CBNP41sR";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Project = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  created_by: number;
};

class ProjectRepository {
  // The C of CRUD - Create operation

  async create(project: Omit<Project, "id">) {
    // Execute the SQL INSERT query to add a new project to the "project" table
    const [result] = await databaseClient.query<Result>(
      "insert into project (title, description, status, created_by) values (?, ?, ?, ?)",
      [project.title, project.description, project.status, project.created_by],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from project where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Project;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from project");

    // Return the array of items
    return rows as Project[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ProjectRepository();
