import { defineEventHandler } from 'h3'
import { LoopsClient } from 'loops'
import { useRuntimeConfig } from '#imports'

let loops: LoopsClient | null = null

export default defineEventHandler((event) => {
  if (!loops) {
    const config = useRuntimeConfig()
    if (!config.loops.apiKey) {
      throw new Error('Invalid or missing Loops API key.')
    }
    loops = new LoopsClient(config.loops.apiKey)
  }

  event.context.loops = loops
})
