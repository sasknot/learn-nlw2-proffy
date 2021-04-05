import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.set('port', process.env.API_PORT || 3333)
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(app.get('port'), () => {
  console.info(`[SERVER] http listening on ${app.get('port')}`)
})
