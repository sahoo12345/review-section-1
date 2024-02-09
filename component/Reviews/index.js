import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReviewsItem from '../ReviewsItem'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
  
  class AllReview extends Component {
    state = {
      reviewList: [],
      apiStatus: apiStatusConstants.initial,
    }
  
    componentDidMount() {
      this.getReview()
    }
    getReview = async () => {
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        
        const apiUrl = `https://admin.tomedes.com/api/v1/get-reviews`
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const fetchedData = await response.json()
          const updatedData = fetchedData.comments.map(comment => ({
            name: comment.name,
            company: comment.company,
            reviews: comment.reviews,
            imageUrl: comment.image_url,
            id: comment.id,
          }))
          this.setState({
            reviewList: updatedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          this.setState({
            apiStatus: apiStatusConstants.failure,
          })
        }
      }
      
  renderLoadingView = () => (
    <div className="review-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="review-error-view-container">
      <h1 className="review-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="review-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )
  renderReviewListView = () => {
    const {reviewList} = this.state

    return (
      <div className="all-review-container">
        <div className='inside-container'>
        <h1 className="review-heading">What Our Customers Say</h1>
         <ul className="review-list">
          {reviewList.map(eachreview => (
            <ReviewsItem reviewData={eachreview} key={eachreview.id} />
          ))}
        </ul>
      </div>
      </div>
    )

   render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReviewListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default AllReview
