import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    email: text('email').notNull().unique(),
    username: text('username').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

export const blogs = pgTable('blogs', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    authorId: uuid('author_id').references(() => users.id)
})