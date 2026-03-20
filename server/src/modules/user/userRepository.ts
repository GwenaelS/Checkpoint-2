import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(item: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (username, email, password) values (?, ?, ?)",
      [item.username, item.email, item.password],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readEmail(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  async update(id: number, item: Omit<User, "id">) {
    // Execute the SQL UPDATE query to modify an existing user by its ID
    const [result] = await databaseClient.query<Result>(
      "update user set username = ?, email = ?, password = ? where id = ?",
      [item.username, item.email, item.password, id],
    );

    // If no rows were affected, return null to indicate that the user was not found
    if (result.affectedRows === 0) {
      return null;
    }
  }

  // The D of CRUD - Delete operation

  async delete(id: number) {
    // Execute the SQL DELETE query to remove an user by its ID
    const [rows] = await databaseClient.query("delete from user where id = ?", [
      id,
    ]);
  }
}

export default new UserRepository();
