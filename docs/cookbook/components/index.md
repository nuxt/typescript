# Components

In [**Single File Components (SFC)**](https://vuejs.org/v2/guide/single-file-components.html), `script` tags must specify the `ts` language:
```html
<script lang="ts">
  // use TypeScript here
</script>
```

## Template

<<< @/cookbook/components/template.html

## Script

:::: tabs :options="{ useUrlFragment: false }"

::: tab "Object API"
<<< @/cookbook/components/script.object-api.ts
:::

::: tab "Class API"
Using [vue-class-component](https://github.com/vuejs/vue-class-component) through [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

<<< @/cookbook/components/script.class-api.ts
:::


::: tab "Function API"
Using [vue-function-api](https://github.com/vuejs/vue-function-api)

<<< @/cookbook/components/script.function-api.ts
:::

