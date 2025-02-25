/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import { Navigate, Route, Router } from '@solidjs/router'
import MainScreenPart from './pages/mainScreenPart.tsx'
import CustomersPage from './pages/customersPage.tsx'
const root = document.getElementById('root')

render(() => 
    <Router root={App}>
        <Route path="/" component={() => <Navigate href="/home" />} />
        <Route path="/home" component={MainScreenPart} />
        <Route path="/customers" component={CustomersPage} />
    </Router>,
    root!)
