import {Component} from 'react'
import SlidesTab from './components/SlidesTab'

import './App.css'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

const indices = 0

// Replace your code here
class App extends Component {
  state = {
    initialIndex: indices,
    activeTab: initialSlidesList[0].id,
    activeHeading: false,
    activeDescription: false,
    slidesList: initialSlidesList,
  }

  onClickChangeHeading = () => {
    this.setState(prevState => ({
      activeHeading: !prevState.activeHeading,
      activeDescription: false,
    }))
  }

  onClickChangeDescription = () => {
    this.setState(prevState => ({
      activeDescription: !prevState.activeDescription,
      activeHeading: false,
    }))
  }

  onLostDescriptionFocus = () => {
    this.setState({activeDescription: false})
  }

  onLostHeadingFocus = () => {
    this.setState({activeHeading: false})
  }

  onChangeHeading = event => {
    const {slidesList, activeTab} = this.state
    const updatedList = slidesList.map(eachItem => {
      if (eachItem.id === activeTab) {
        return {...eachItem, heading: event.target.value}
      }
      return eachItem
    })
    this.setState({slidesList: updatedList})
  }

  updateActiveTab = id => {
    const {slidesList} = this.state
    const value = slidesList.findIndex(eachItem => eachItem.id === id)
    console.log(value)
    this.setState({
      initialIndex: value,
      activeTab: id,
      activeDescription: false,
      activeHeading: false,
    })
  }

  onChangeDescription = event => {
    const {slidesList, activeTab} = this.state
    const updatedList = slidesList.map(eachItem => {
      if (eachItem.id === activeTab) {
        return {...eachItem, description: event.target.value}
      }
      return eachItem
    })
    this.setState({slidesList: updatedList})
  }

  onClickChangeTab = () => {
    const {initialIndex, slidesList} = this.state
    const newIndex = initialIndex + 1

    if (newIndex >= slidesList.length) {
      this.setState({
        initialIndex: 0,
        activeTab: slidesList[0].id,
        activeHeading: false,
        activeDescription: false,
      })
    } else {
      this.setState({
        initialIndex: newIndex,
        activeTab: slidesList[newIndex].id,
        activeHeading: false,
        activeDescription: false,
      })
    }
  }

  getFromActiveTab = () => {
    const {slidesList, activeTab} = this.state
    const activeTabDetails = slidesList.find(
      eachItem => eachItem.id === activeTab,
    )
    return activeTabDetails
  }

  render() {
    const {activeTab, activeHeading, activeDescription, slidesList} = this.state

    const {heading, description} = this.getFromActiveTab()
    return (
      <div className="app-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
            alt="nxt slides logo"
            className="logo"
          />
          <h1 className="nxt-slides-heading">Nxt Slides</h1>
        </div>
        <div>
          <button
            type="button"
            className="new-btn"
            onClick={this.onClickChangeTab}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus-icon"
            />
            <span>New</span>
          </button>
        </div>
        <div className="sub-container">
          <ol className="slides-tab-list">
            {slidesList.map((eachSlide, index) => (
              <SlidesTab
                key={eachSlide.id}
                slideItem={eachSlide}
                slideNum={index + 1}
                isActive={activeTab === eachSlide.id}
                updateActiveTab={this.updateActiveTab}
              />
            ))}
          </ol>
          <div className="active-tab">
            {activeHeading ? (
              <input
                className="active-heading"
                type="text"
                value={heading}
                onChange={this.onChangeHeading}
                onBlur={this.onLostHeadingFocus}
              />
            ) : (
              <h1
                onClick={this.onClickChangeHeading}
                className="active-heading"
              >
                {heading}
              </h1>
            )}
            {activeDescription ? (
              <input
                className="active-para"
                type="text"
                value={description}
                onChange={this.onChangeDescription}
                onBlur={this.onLostDescriptionFocus}
              />
            ) : (
              <p
                onClick={this.onClickChangeDescription}
                className="active-para"
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
