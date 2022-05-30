/**
 * 登录
 */

export async function login({ username, password }) {
  try {
    const data = await http.post(`/api/login`, { username, password });
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
