import axios from "axios";
import { BASE_API_URL } from "../constants/api";

let refreshTokenPromise: null | Promise < any > ;

export const axiosInstance = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Или из store (Vuex/Redux)
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// axiosInstance.interceptors.response.use(r => {
//   const {
//     data
//   } = r;
//   if (data.errors && data.errors[0].message === "AUTH_EXPIRED") {
//     if (!refreshTokenPromise) {
//       refreshTokenPromise = fetchRefreshToken().then(data => {
//         refreshTokenPromise = null;
//         return data;
//       });
//     }

//     return refreshTokenPromise.then(token => {
//       if (r.config.headers) r.config.headers["Authorization"] = token;
//       return axiosInstance.request(r.config);
//     });
//   }
//   return r;
// });

// let isRefreshing = false;
// let failedQueue: ({resolve: (e: null | string) => void, reject: (e: string) => void})[] = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Если ошибка 401 и это не запрос на обновление токена
//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       // Если уже обновляем токен — добавляем запрос в очередь
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => axiosInstance(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true; // Помечаем запрос как повторный
//       isRefreshing = true;

//       try {
//         // Запрос на обновление токена
//         const { data } = await axios.post('/auth/refresh', {
//           refreshToken: localStorage.getItem('refreshToken')
//         });

//         // Сохраняем новые токены
//         localStorage.setItem('authToken', data.accessToken);
//         localStorage.setItem('refreshToken', data.refreshToken);
        
//         // Обновляем заголовок авторизации
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        
//         // Повторяем оригинальный запрос
//         processQueue(null, data.accessToken);
//         return instance(originalRequest);

//       } catch (refreshError) {
//         // Если обновление не удалось — очищаем токены и редиректим
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//         processQueue(refreshError, null);
//         return Promise.reject(refreshError);
        
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );