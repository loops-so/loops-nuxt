# Loops Nuxt Module

[![](https://img.shields.io/npm/dw/nuxt-loops?style=social&label=Downloads)](https://www.npmjs.com/package/nuxt-loops)

This Nuxt module makes it easy to add the Loops [JavaScript SDK](https://loops.so/docs/sdks/javascript) to your Nuxt project.

This module tracks [`loops` ^7.3.0](https://www.npmjs.com/package/loops/v/7.3.0). Method signatures in these docs match that SDK version.

## Installation

You can install the package [from npm](https://www.npmjs.com/package/nuxt-loops):

```bash
npm install nuxt-loops
```

Minimum Node version required: 18.0.0.

You will need a Loops API key to use the module.

In your Loops account, go to the [API Settings page](https://app.loops.so/settings?page=api) and click **Generate key**.

Copy this key and save it in your application code (for example as `LOOPS_API_KEY` in an `.env` file).

Then add `nuxt-loops` to your modules list and add a reference to your API key:

```js nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-loops'],
  loops: {
    apiKey: process.env.LOOPS_API_KEY
  }
});
```

## Usage

The Loops API and SDK should only be used on the server side to protect your API key.

To use the module, import `loops` from the request context.

Then call one of the SDK methods. Read through the [JS SDK docs](https://www.npmjs.com/package/loops/v/7.3.0) for more details.

```javascript
import { APIError } from "loops";

export default defineEventHandler(async (event) => {
  const { loops } = event.context;

  try {
    const response = await loops.updateContact({
      email: "hello@gmail.com",
      properties: {
        firstName: "Bri",
        lastName: "Chambers",
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.json);
      console.log(error.statusCode);
    }
  }
});
```

See the API documentation to learn more about [rate limiting](https://loops.so/docs/api-reference#rate-limiting) and [error handling](https://loops.so/docs/api-reference#debugging).
