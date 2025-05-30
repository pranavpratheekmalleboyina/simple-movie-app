import mongodb from "mongodb"
import {ObjectId} from "mongodb"

let reviews

export default class ReviewsDao{
    static async injectDB(conn) {
        if (reviews) {
            console.log("Db collection handles Successful!")
            return
        }
        try{
            reviews = await conn.db("movies").collection("reviews")
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
}

    static async addReview(movieId, user, review) {
        try{
            const reviewDoc = {
            movieId: movieId,
            user: user,
            review: review
            }
            console.log("adding")
            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async getReview(id) {
        try{
            return await reviews.findOne({ _id: new ObjectId(String(id)) })
        }catch(e){
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review) {
        try{
            const updateResponse = await reviews.updateOne(
           { _id: new ObjectId(String(reviewId)) },
           { $set: { user: user, review: review } }
      )
        return updateResponse
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne({
            _id: new ObjectId(String(reviewId)),
      })
        return deleteResponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

    static async getReviewsByMovieId(movieId){
        try{
            const cursor = await reviews.find({ movieId: parseInt(movieId) })
            return cursor.toArray()
        }catch(e){
            console.error(`Unable to get the review: ${e}`)
            return { error: e }
        }
    }
}