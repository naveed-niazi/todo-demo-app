const serverUrl = "https://todo-api-job-demo.herokuapp.com";
var jwt={token:"", user:{}};
if (typeof window == "undefined" || !localStorage.getItem("jwt"))
  jwt.token = "";
else jwt = JSON.parse(localStorage.getItem("jwt"));

export const createTask = async (data) => {
  return await fetch(`${serverUrl}/task`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTasks = async () => {
  return await fetch(`${serverUrl}/tasks`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTask = async (taskId) => {
  return await fetch(
    `${serverUrl}/task?` + new URLSearchParams({ taskId: taskId }),
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTask = async (data, taskId) => {
  return await fetch(
    `${serverUrl}/task?` + new URLSearchParams({ taskId: taskId }),
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
