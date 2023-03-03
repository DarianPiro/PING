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

export const getUser = async (email: any) => {
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
        body: JSON.stringify(newUser),
      }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

export const updateUser = async (updatedUser: any) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/updateUser`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteUser = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/deleteUser`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const sendRequest = async (request: any) => {
  try {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/sendRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error('Error sending request:', error);
  }
};


export const imageToDB = async (image:any, username:any) => {
  console.log(image, username)
  try {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/updateImages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({image, username}),
    });
  } catch (error) {
    console.error('Error sending image:', error);
  }
}