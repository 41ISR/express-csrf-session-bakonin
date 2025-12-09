import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../src/store/useAuthStore"
import { useEffect } from "react"

const AuthProvider = () => {
    const { user, checkAuth } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        const init = async () => {
            await checkAuth()
        }
        init()

    }, [checkAuth])

    useEffect(() => {
        // if (user === undefined) return <></>

        // if (!user) {
        //     navigate("/signin")
        // }
    }, [user, navigate])

    return <Outlet />
}

export default AuthProvider