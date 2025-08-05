import axios from 'axios';

export type ItemResponseType = {
    id: number
    name: string
    status: string
    uniqueUrlName: string
    followed: boolean
    photos: {
        small: string
        large: string
    }
}

export type UsersResponseType = {
    items: ItemDomainType[]
    totalCount: number
    error: string
}

export type DataType = {
    id: number
    login: string
    email: string
}

export type ResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: []
    resultCode: number
}

export type ProfileInfoResponseType = {
    userId: number
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    photos: PhotosType
}

export type PhotosType = {
    large: string
    small: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

// Преобразование типов тк добавил каждому item Preloader при изменении follow
export type ItemDomainType = ItemResponseType & { isFetchingUser: boolean }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {'API-KEY': 'ba78a938-e205-4bcc-aaba-1c48b8953822'}
});

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<{ url: string }>('/security/get-captcha-url')
            .then(response => response.data);
    }
};

export const authAPI = {
    getAuth() {
        return instance.get<ResponseType<DataType>>('/auth/me')
            .then(response => response.data);
    },
    login(loginParams: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number, token: string }>>('/auth/login', loginParams)
            .then(response => response.data);
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
            .then(response => response.data);
    }
};
export const profileAPI = {
    getProfile(id: number) {
        return instance.get<ProfileInfoResponseType>(`/profile/${id}`)
            .then(response => response.data);
    },
    getStatus(id: number) {
        return instance.get<string>(`/profile/status/${id}`)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`/profile/status`, {status})
            .then(response => response.data);
    },
    updatePhoto(file: FormData) {
        return instance.put<ResponseType<{ photos: PhotosType }>>(`/profile/photo`, file, {
            headers: {
                'Content-Type': 'multipart/form-data' // необязательно передавать заголовок с типом контента
            }
        })
            .then(response => response.data);
    }
};
export const usersAPI = {
    getUsers(page: number, count: number) {
        return instance.get<UsersResponseType>(`/users?page=${page}&count=${count}`)
            .then(response => response.data);
    }
};
export const followAPI = {
    followUser(userId: number) {
        return instance.post<ResponseType>(`/follow/${userId}`, {})
            .then(response => response.data);
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType>(`/follow/${userId}`)
            .then(response => response.data);
    },
};
