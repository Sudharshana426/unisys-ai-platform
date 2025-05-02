import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  async googleLogin(tokenId: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, { tokenId });
      return response.data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  async verifyToken(token: string) {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  }
}; 