import './index.css'

const SlidesTab = props => {
  const {slideItem, isActive, updateActiveTab, slideNum} = props
  const {heading, description, id} = slideItem
  const activeBtn = isActive ? 'active-btn' : ''

  const onClickUpdateActiveTab = () => {
    updateActiveTab(id)
  }

  return (
    <li className={`list-item ${activeBtn}`} testid={`slideTab${slideNum}`}>
      <p className="slide-index">{slideNum}</p>
      <button
        type="button"
        onClick={onClickUpdateActiveTab}
        className="btn-item"
      >
        <h1 className="slide-heading">{heading}</h1>
        <p className="slide-description">{description}</p>
      </button>
    </li>
  )
}

export default SlidesTab
