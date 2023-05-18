import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { schema } from './schema'

const yoga = createYoga({
  schema,
  context: {},
})

const server = createServer(yoga)

server.listen(3000)
