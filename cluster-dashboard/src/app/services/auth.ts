export interface AuthResponse {
  userId: string;
  name: string;
  email: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Note: Faking login api call
export const loginApi = (email:string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    resolve({
      userId: '5bce40c4-c67a-4e27-9453-9d8ff81bb49b',
        name: 'Hardik Sahu',
        email: 'sahuhardic@gmail.com',
        tokens: {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken'
        }
    })
  })
}
