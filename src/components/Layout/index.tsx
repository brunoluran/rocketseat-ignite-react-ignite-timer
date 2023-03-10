import { LayoutContainer } from './styled'

import { Header } from '../Header'

import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
