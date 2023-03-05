export const getUser = async (email) => {
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

export const createUser = async (newUser) => {
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

export const updateUser = async (updatedUser) => {
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

export const sendRequest = async (request) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/sendRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const storedRequest = await response.json();
    return storedRequest;
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

export const sendReview = async (request) => {
  try {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/sendReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error('Error sending review:', error);
  }
};

export const imageToDB = async (image, username) => {
  try {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/updateImages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, username }),
    });
  } catch (error) {
    console.error('Error sending image:', error);
  }
};
