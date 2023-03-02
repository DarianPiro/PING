// interface User {
//   email: string;
//   name: string;
// }

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

export const getUser = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/getUser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

export const createUser = async (newUser: any) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/createUser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( newUser ),
      }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
  }
};