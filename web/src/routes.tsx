import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/landing'
import TearcherList from './pages/tearcher-list'
import TearcherForm from './pages/tearcher-form'

function Routes () {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TearcherList} />
      <Route path="/give-classes" component={TearcherForm} />
    </BrowserRouter>
  )
}

export default Routes
