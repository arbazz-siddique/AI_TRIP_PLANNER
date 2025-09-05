import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    UserTable:defineTable({
        name: v.string(),
        imageUrl: v.string(),
        email: v.string(),
        subscription: v.optional(v.string()),
    }),

    TripDetailTable:defineTable({
        tripId: v.string(),
        tripDetail: v.any(),
        uid: v.id('UserTable')
    })
    ,
    ContactMessages:defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),     // make phone optional
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),    
    })
})