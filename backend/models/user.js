"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const BCRYPT_WORK_FACTOR = 1; //TODO: check if need to move to config.js file

class User {

  static async create(username, password) {
    const isDuplicate = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [username],
    );

    if (isDuplicate.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
       (username,
        password)
       VALUES ($1, $2)
       RETURNING username`,
      [username,
        hashedPassword
      ]
    );

    const user = result.rows[0];

    return user;
  }

  static async authenticate(username, password) {
    const result = db.query(
      `SELECT username,
              password
       FROM users
       WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return user.username;
      }
    }

    throw new UnauthorizedError('Invalid username/password.');
  }
}

// TODO: add more columns to user table

module.exports = User;