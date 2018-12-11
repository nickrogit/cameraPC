import {ax} from '@/config/axios'

export const get = params => ax.get('/', {params: params})
export const post = params => ax.post('/', params)
