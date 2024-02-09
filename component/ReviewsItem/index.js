import './index.css'

const ReviewsItem = props => {
  const {reviewData} = props
  const {name,company, imageUrl, reviews} = reviewData

  return (
    <li className="review-item">
      <p className="reviews-content">{reviews}</p>
      <div className="person-details">
          <img
            src={imageUrl}
            alt="personImg"
            className="img"
          />
          <div clasName="person-name-companyname">
           <h2 className="person-name">{name}</h2>
           <p className='person-companyname'>{company}</p>
          </div>
        </div>
    </li>
  )
}
export default ReviewsItem
