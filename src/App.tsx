import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CountdownContextProvider } from './contexts/CountdownContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CountdownContextProvider>
          <Router />
        </CountdownContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
