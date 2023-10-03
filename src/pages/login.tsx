import { useRouter } from "next/router"
import Link from "next/link"
import { useAuth } from "../components/Auth/AuthProvider"
import { useForm } from "react-hook-form"

export default function Login() {
  const { session, login } = useAuth()
  const { register,handleSubmit,formState: { errors } } = useForm()
  const router = useRouter()
  if (session) {
    router.push("/dashboard")
  }
  const onSubmit = async (val) => {
    await login({ email: val.email, password: val.password }).then(()=>
      router.push('/dashboard')
    )
  }

  return (
    <div className="min-h-screen  grid place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-1/4 shadow-md rounded px-8 py-6"
      >
        <h1 className="my-2 text-xl">LOGIN</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
          {errors.email && errors.email.message}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">パスワード</label>
          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
          />
          {errors.password && errors.password.message}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            戻る
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            送信
          </button>
        </div>
        <div className="flex justify-end mt-4 text-blue-700">
          <Link href="/signup">Signup</Link>
        </div>
      </form>
    </div>
  )
}
