import './index.css'

const SlidesTab = props => {
  const {slideItem, isActive, updateActiveTab, slideNum} = props
  const {heading, description, id} = slideItem
  const activeBtn = isActive ? 'active-btn' : ''

  const onClickUpdateActiveTab = () => {
    updateActiveTab(id)
  }

  return (
    <li className={`list-item ${activeBtn}`} onClick={onClickUpdateActiveTab} testid={`slideTab${slideNum}`}>
      <p className="slide-index">{slideNum}</p>
      <div
        className="btn-item"
      >
        <h1 className="slide-heading">{heading}</h1>
        <p className="slide-description">{description}</p>
      </div>
    </li>
  )
}

export default SlidesTab
