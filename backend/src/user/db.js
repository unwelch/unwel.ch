import { squel, queryOne, query } from "./../db";
import { keysToUnderscore } from "./../db/helpers";

export default {
  insert: async user => {
    let newUser = {
      ...user,
      createdAt: new Date()
    };

    return queryOne(
      squel
        .insert()
        .into("users")
        .setFields(keysToUnderscore(newUser))
        .returning("*")
        .toParam()
    );
  },

  update: async user => {
    let newUser = {
      ...user,
      updatedAt: new Date()
    };

    return queryOne(
      squel
        .update()
        .table("users")
        .setFields(keysToUnderscore(newUser))
        .where(`'${user.id}' = users.id`)
        .returning("*")
        .toParam()
    );
  },

  get: async id => {
    return queryOne(
      squel
        .select()
        .from("users")
        .where("id = ?", id)
        .toParam()
    );
  },

  getAll: async () => {
    return query(
      squel
        .select()
        .from("users")
        .toParam()
    );
  },

  getBy: {
    googleId: async id => {
      return queryOne(
        squel
          .select()
          .from("users")
          .where("google_id = ?", id)
          .toParam()
      );
    }
  }
};
