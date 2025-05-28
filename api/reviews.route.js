import express from "express"

const router = express.Router()

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviewsById)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router