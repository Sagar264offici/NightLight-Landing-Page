/**
 * SERVER ENTRY
 * ------------
 * Renders a route to HTML at build time so every page ships real markup,
 * a correct <head> and page content that a crawler can read without
 * executing JavaScript. The client then hydrates the same markup.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Atmosphere from './components/Atmosphere'
import { AppRoutes } from './App'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Atmosphere />
      <AppRoutes />
    </StaticRouter>,
  )
}
