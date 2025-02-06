import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "custom" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.15.2_@parcel+watcher@2.5.0_@types+node@22.10.7_db0@0.2.1_eslint@9.18.0_jiti@2.4.2__ior_dslk2bryzpuqhdmz524kq45dim/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}