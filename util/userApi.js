const uriApiUser = "https://fenestra-api.herokuapp.com/api/user";

export const getUsers = async () => {
  try {
    const response = await fetch(uriApiUser);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (email) => {
  try {
    const response = await fetch(`${uriApiUser}/email/${email}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (email, username, password) => {
  let status = 200;
  let data = {
    email: email,
    name: username,
    password: password,
  };
  try {
    const response = await fetch(uriApiUser, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200 || response.status === 201) {
      const json = await response.json();
      console.log(json);
      return json;
    } else {
      status = response.status;
    }
  } catch (error) {
    console.log(error);
  }
  throw new Error(`Erro ao cadastrar o usuário.\n(Código: ${status})`);
};

export const updateUser = async (
  email,
  username,
  password
) => {
  let data = {
    name: username,
    email: email,
    password: password,
  };
  try {
    const response = await fetch(`${uriApiUser}/email/${email}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${uriApiUser}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
