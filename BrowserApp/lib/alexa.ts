import axios from 'axios';

export async function getAccessToken(refresh_token) {
  return axios
    .post(
      'https://api.amazon.com/auth/o2/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: process.env.AMAZON_CLIENT_ID,
        client_secret: process.env.AMAZON_CLIENT_SECRET,
      },
      {}
    )
    .then((res) => res.data.access_token);
}
