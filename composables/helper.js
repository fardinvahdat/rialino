
import { useUserStore } from '@/stores/user'

export const formatTableState = (columns,state) => {
            let rows = [];
            let cells = []
            state.map((item) => {
                cells = []
                cells.push({
                    label: columns[0],
                    value: item.first_name
                })

                cells.push({
                    label: columns[1],
                    value: item.last_name
                })

                cells.push({
                    label: columns[2],
                    value: item.status
                })

                cells.push({
                    label: columns[3],
                    value: item.email
                })

                rows.push({
                    cells
                })
            })
    return rows
}

export const getUserData=async(token)=>{
const store = useUserStore()
const { user } = storeToRefs(store)
    const config = useRuntimeConfig()
        try {
            const data = await $fetch(`${config.public.baseURL}users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            user.value=data.data
        } catch (error) {
            console.log(error);
            return error
        }
}