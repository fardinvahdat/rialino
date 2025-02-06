export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const menu=ref([
    {
      label:"مشاهده و بروز رسانی پروفایل",
      path:'/profile',
      icon:'user'
    },
    {
      label:"سفارشات",
      path:'',
      icon:'orders'
    },
    {
      label:"ثبت درخواست خرید",
      path:'/purchase',
      icon:'purchase'
    },
  ])
  return { user,menu }
})