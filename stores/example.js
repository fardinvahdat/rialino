export const useExampleStore = defineStore('example', () => {
  const count = ref(0)

  return { count }
})