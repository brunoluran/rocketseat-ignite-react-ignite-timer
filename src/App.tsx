import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './Router'
import { theme } from './theme'
import { GlobalStyle } from './theme/global'
import { CyclesProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
