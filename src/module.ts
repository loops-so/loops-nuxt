import { defineNuxtModule, addServerHandler, addTypeTemplate, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiKey: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-loops',
    configKey: 'loops',
  },
  defaults: {
    apiKey: '',
  },
  setup(_options, _nuxt) {
    const { apiKey } = _options

    const resolver = createResolver(import.meta.url)

    // Add server-side plugin
    addServerHandler({
      handler: resolver.resolve('./runtime/loops'),
      middleware: true,
    })

    addTypeTemplate({
      filename: 'types/nuxt-loops.d.ts',
      getContents: () => `import type { LoopsClient } from 'loops'

declare module 'h3' {
  interface H3EventContext {
    loops: LoopsClient
  }
}

export {}
`,
    })

    // Merge user config with default config
    _nuxt.options.runtimeConfig.loops = defu(
      _nuxt.options.runtimeConfig.loops,
      {
        apiKey,
      },
    )
  },
})

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    loops: ModuleOptions
  }
}
