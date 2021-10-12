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

export const getUser = async (id) => {
  try {
    const response = await fetch(
      `https://fenestra-api.herokuapp.com/api/user/${id}`
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (id, username, password) => {
  let status = 200;
  let data = {
    id: id,
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

export const updateUser = async (id, username, password) => {
  let data = {
    id: id,
    name: username,
    password: password,
  };
  try {
    const response = await fetch(`${uriApiUser}/${id}`, {
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
        'Content-Type': "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
