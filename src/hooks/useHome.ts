import { useState } from 'react'
import { toast } from 'react-toastify'

import { UserProps } from '@/@types'
import { getUser } from '@/services'
import { useAppDispatch, useAppSelector } from '@/store'

const useHome = function () {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.test.count)

  const [user, setUser] = useState<UserProps>()
  const [showModal, setShowModal] = useState(false)

  async function handleGetUser(formData: { search: string }) {
    try {
      const user = await getUser(formData.search)

      setUser(user)
      setShowModal(true)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return {
    count,
    dispatch,
    user,
    showModal,
    setShowModal,
    handleGetUser,
  }
}

export { useHome }
