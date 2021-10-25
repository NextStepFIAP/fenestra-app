const uriApiComponent = "https://fenestra-api.herokuapp.com/api/componente";

export const getComponents = async () => {
  try {
    const response = await fetch(uriApiComponent);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getComponent = async (id) => {
  try {
    const response = await fetch(
      `${uriApiComponent}/${id}`
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const addComponent = async (name, idUser) => {
  let status = 200;
  let data = {
    name: name,
    user:{
      id: idUser
    }
  };
  try {
    const response = await fetch(uriApiComponent, {
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
  throw new Error(`Erro ao cadastrar o componente.\n(Código: ${status})`);
};

export const updateComponent = async (id,name) => {
  let data = {
    name: name,
  };
  try {
    const response = await fetch(`${uriApiComponent}/${id}`, {
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

export const deleteComponent = async (id) => {
  try {
    const response = await fetch(`${uriApiComponent}/${id}`, {
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
