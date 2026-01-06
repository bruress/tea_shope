import React from 'react'

import Hero from '../components/Hero'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import CatalogTea from '../components/CatalogTea'
import Subscription from '../components/Subscription'


const Home = () => {
    return (
        <>
            <Header/>
            <Hero/>
            <AboutUs/>
            <CatalogTea/>
            <Subscription/>
            <Footer/>
        </>
    ) 
}
export default Home;