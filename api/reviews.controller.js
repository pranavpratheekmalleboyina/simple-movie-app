import ReviewsDAO from "../dao/reviewsDao.js"

export default class ReviewsController{
    //used to create a new review to the db
    static async apiPostReview(req, res, next){
        try{
            const movieId = parseInt(req.body.movieId)
            const review = req.body.review
            const user = req.body.user
            console.log('The movie id is ', movieId)
            const reviewResponse = await ReviewsDAO.addReview(movieId,user,review)
            res.json({ status: "success" })
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    //to fetch a review from the DB 
    static async apiGetReview(req, res, next){
        try{
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review) {
                return res.status(404).json({ error: "Not found" })
            }
            return res.json(review)
        }catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({ error: e.message })
        }
    }
    
    //to update a review to the db
    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(
               reviewId,
               user,
               review
            )
            var { error } = reviewResponse
            if (error) {
                return res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                "unable to update review",
            )
           }
            return res.json({ status: "success" })

        }catch(e){
             console.log(`api, ${e}`)
             res.status(500).json({ error: e.message })
        }
    }

    //to delete a review 
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            return res.json({ status: "success" })
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetReviewsByMovieId(req, res, next) {
        try{
            let id = req.params.id || {}
            let reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if(!reviews){
                return res.status(404).json({ error: "Not found" })
            }
            return res.status(200).json(reviews)
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }
}