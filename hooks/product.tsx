import useSWR from 'swr'
import axios from "axios"
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const ProductHooks = ({middleware, redirectIfAuthenticated, id} = {})=>{
    const router = useRouter()
    const params = useParams()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    // const { data: user, error, mutate } = useSWR('/api/user', () =>
    //     axios
    //         .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`)
    //         .then(res => res.data)
    //         .catch(error => {
    //             if (error.response.status !== 409) throw error

    //             // router.push('/verify-email')
    //         }),
    // )

    const deleteProduct = async ({ setErrors, setStatus }) => {
        await csrf()

        setErrors([])
        setStatus(null)
        axios
            .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`)
            .then(() => console.log('del pass'))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user)
    //         router.push(redirectIfAuthenticated)
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         user?.email_verified_at
    //     )
    //         router.push(redirectIfAuthenticated)
    //     if (middleware === 'auth' && error) logout()
    // }, [user, error])

    return {
        // user,
        csrf,
        deleteProduct,
    }
}