import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'

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
    this.setState({
      activeHeading: true,
      activeDescription: false,
    })
  }

  onClickChangeDescription = () => {
    this.setState({
      activeDescription: true,
      activeHeading: false,
    })
  }

  onLostDescriptionFocus = event => {
    const {slidesList, activeTab} = this.state
    const updatedList = slidesList.map(eachItem => {
      if (eachItem.id === activeTab) {
        if (eachItem.description === '') {
          return {...eachItem, description: 'Description'}
        }
        return {...eachItem, description: event.target.value}
      }
      return eachItem
    })
    this.setState({activeDescription: false, slidesList: updatedList})
  }

  onLostHeadingFocus = event => {
    const {slidesList, activeTab} = this.state
    const updatedList = slidesList.map(eachItem => {
      if (eachItem.id === activeTab) {
        if (eachItem.heading === '') {
          return {...eachItem, heading: 'Heading'}
        }
        return {...eachItem, heading: event.target.value}
      }
      return eachItem
    })

    this.setState({activeHeading: false, slidesList: updatedList})
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
      activeTab: id,
      activeDescription: false,
      activeHeading: false,
      initialIndex: value,
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

    const newSlide = {
      id: uuidV4(),
      heading: 'Heading',
      description: 'Description',
    }

    const updatedSlidesList = [
      ...slidesList.slice(0, initialIndex + 1),
      newSlide,
      ...slidesList.slice(initialIndex + 1),
    ]

    this.setState({
      slidesList: updatedSlidesList,
      activeTab: newSlide.id,
      activeDescription: false,
      activeHeading: false,
    })
  }

  getFromActiveTab = () => {
    const {slidesList, activeTab} = this.state
    return slidesList.find(eachItem => eachItem.id === activeTab)
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
