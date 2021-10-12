const uriApiLog = "https://fenestra-api.herokuapp.com/api/Log";

export const getLogs = async () => {
  try {
    const response = await fetch(uriApiLog);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getLog = async (id) => {
  try {
    const response = await fetch(
      `${uriApiLog}/${id}`
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const addLog = async (date, description) => {
  let status = 200;
  let data = {
    dateRegistro: date,
    description: description
  };
  try {
    const response = await fetch(uriApiLog, {
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
  throw new Error(`Erro ao cadastrar o Log.\n(Código: ${status})`);
};

export const updateLog = async (name) => {
  let data = {
    dateRegistro: date,
    description: description
  };
  try {
    const response = await fetch(`${uriApiLog}/${id}`, {
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

export const deleteLog = async (id) => {
  try {
    const response = await fetch(`${uriApiLog}/${id}`, {
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
