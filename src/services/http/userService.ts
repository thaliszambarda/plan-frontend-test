import moment from 'moment';

import { UserProps } from '@/@types';
import { api } from '@/services/api';

const getUser = async function (userId: string) {
  try {
    const response = await api.get(`https://api.github.com/users/${userId}`);
    const data = response.data;
    const userData: UserProps = {
      name: data.name,
      login: data.login,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url,
      createdAt: moment(data.created_at).format('DD/MM/YYYY'),
    };
    return userData;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw new Error('Usuário não encontrado');
  }
};

export { getUser };
