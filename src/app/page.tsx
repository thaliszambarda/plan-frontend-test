'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

import { X } from 'lucide-react'
import Image from 'next/image'

import { Modal } from '@/components/Modal'
import { useHome } from '@/hooks'
import { increment } from '@/store/modules/count/slice'

import style from './Home.module.scss'
export default function Home() {
  const { count, dispatch, user, showModal, setShowModal, handleGetUser } =
    useHome()
  const { register, handleSubmit } = useForm<{ search: string }>()
  return (
    <main className={style.content}>
      <Image className="mb-5" src="/img/logo.png" alt="Logo da Plan Marketing" width={200} height={200} />
      <h1 className={style.title}>Template para desenvolvimento Plan</h1>
      <p className={style.text}>{count}</p>
      <button className={style.button} onClick={() => dispatch(increment())}>
        count
      </button>
      <form className="flex m-3 gap-2" onSubmit={handleSubmit(handleGetUser)}>
        <input
          {...register('search', { required: true })}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Informe um github user"
          type="text"
          name="search"
        />
        <button type="submit" className={style.button}>
          Procurar
        </button>
      </form>
      {showModal && (
        <Modal.Root>
          <Modal.Header title="Usuário">
            <X
              onClick={() => setShowModal(false)}
              color="white"
              className="ml-auto cursor-pointer"
            />
          </Modal.Header>
          <Modal.Content>
            {user?.login && (
              <div className="flex flex-col justify-center content-center p-5">
                <img
                  className="m-auto rounded-full w-32"
                  src={user.avatarUrl}
                  alt={user.name}
                />
                <h3 className="m-auto text-xl text-blue_intermediate font-semibold">
                  {user.name}
                </h3>
                <a
                  target="_blank"
                  href={user.htmlUrl}
                  className="m-auto hover:text-blue_light"
                  rel="noreferrer">
                  {user.login}
                </a>
                <p className="m-auto">Criado em: {user.createdAt}</p>
              </div>
            )}
            {!user?.login && (
              <div className="flex grow flex-col justify-center content-center p-5">
                <h3 className="m-auto text-xl text-blue_intermediate font-semibold">
                  Usuário não encontrado
                </h3>
              </div>
            )}
          </Modal.Content>
        </Modal.Root>
      )}
    </main>
  )
}
