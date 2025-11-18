import { mutation, query } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const add = mutation({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    if (!identity?.orgId) {
      throw new Error("Missing organization");
    }

    const userId = await ctx.db.insert("users", { name: "John" });

    return userId;
  },
});
