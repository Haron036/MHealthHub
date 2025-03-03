import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopCounselors from '../components/TopCounselors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Header/>
        <SpecialityMenu/>
        <TopCounselors/>
        <Banner/>

    </div>
  )
}

export default Home