import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const views = {
  initialView: 'INITIAL',
  loadingView: 'LOADING',
  failureView: 'FAILURE',
  successView: 'SUCCESS',
}

class CowinDashboard extends Component {
  state = {currentView: views.initialView, cowinData: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({currentView: views.loadingView})
    try {
      const response = await fetch(
        'https://apis.ccbp.in/covid-vaccination-data',
      )
      if (response.ok) {
        const data = await response.json()
        const lastSevenDaysVaccinationData = data.last_7_days_vaccination
        const vaccinationByGenderData = data.vaccination_by_gender
        const vaccinationByAgeData = data.vaccination_by_age
        this.setState({
          currentView: views.successView,
          cowinData: {
            lastSevenDaysVaccinationData,
            vaccinationByGenderData,
            vaccinationByAgeData,
          },
        })
      } else {
        this.setState({currentView: views.failureView})
      }
    } catch (e) {
      this.setState({currentView: views.failureView})
    }
  }

  loaderScenerio = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failureScenerio = () => (
    <div className="failed-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failed-view-image"
      />
      <h1 className="failed-view-heading">Something went wrong</h1>
    </div>
  )

  successScenerio = () => {
    const {cowinData} = this.state
    const {
      lastSevenDaysVaccinationData,
      vaccinationByGenderData,
      vaccinationByAgeData,
    } = cowinData

    return (
      <>
        <div className="visualisers-container">
          <VaccinationCoverage
            lastSevenDaysVaccinationData={lastSevenDaysVaccinationData}
          />
        </div>
        <div className="visualisers-container">
          <VaccinationByGender
            vaccinationByGenderData={vaccinationByGenderData}
          />
        </div>
        <div className="visualisers-container">
          <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
        </div>
      </>
    )
  }

  render() {
    const {currentView} = this.state

    return (
      <div className="cowin-dashboard-bgContainer">
        <div className="logo-title-container">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="logo"
          />
          <h1 style={{color: '#2cc6c6'}} className="heading-style">
            Co-WIN
          </h1>
        </div>
        <h1 className="heading-style">CoWIN Vaccination in India</h1>
        <div className="scenerio-container">
          {currentView === views.loadingView && this.loaderScenerio()}
          {currentView === views.failureView && this.failureScenerio()}
          {currentView === views.successView && this.successScenerio()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
