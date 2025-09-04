import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetail= mutation({
    args: {
        tripId: v.string(),
        uid:v.id('UserTable'),
        tripDetail: v.any()
    },
    handler: async(ctx, args)=>{
        const result = await ctx.db.insert('TripDetailTable', {
            tripDetail:args.tripDetail,
            tripId: args.tripId,
            uid:args.uid
        })
    }
})

export const GetUserTrip = query({
    args:{
        uid:v.id('UserTable')
    },
    handler: async(ctx, args)=>{
        const result = await ctx.db.query('TripDetailTable')
        .filter(q=>q.eq(q.field('uid'), args.uid))
        .order('desc')
        .collect();
        return result;
    }
})

export const GetTripById = query({
    args:{
        uid:v.id('UserTable'),
        tripid: v.string()
    },
    handler: async(ctx, args)=>{
        const result = await ctx.db.query('TripDetailTable')
        .filter(q=> q.and(q.eq(q.field('uid'), args.uid),
        q.eq(q.field('tripId'), args?.tripid)
    ))
        .collect();
        return result[0];
    }
})

