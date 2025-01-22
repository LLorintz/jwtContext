import  {jwtDecode, JwtPayload } from "jwt-decode";


const BASE_URL = "https://your-api.com/api"; // Cseréld ki a saját API-ra

const getToken = (): string | null => {
  const token = localStorage.getItem("jwtToken");
  if (token && isTokenExpired(token)) {
    localStorage.removeItem("jwtToken");
    return null;
  }
  return token;
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const fetchWithAuth= async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem('token'); // JWT token elérése a localStorage-ból

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`http://localhost:3000${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
