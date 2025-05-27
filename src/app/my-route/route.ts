import { Categories } from './../../collections/Categories';
import { Collection } from 'payload';
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
  })

  return Response.json(data)
}
