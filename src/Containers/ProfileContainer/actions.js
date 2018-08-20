

export function changeName (nick_name: string) {
  let name = nick_name.slice(0,1).toUpperCase() + nick_name.slice(1, nick_name.length)
  return {
    type: "CHANGE_NAME",
    payload: name
  }
}

export function changeBirthDate (birthDate: Date) {
  let date = formatDate(birthDate)
  return {
    type: "CHANGE_BIRTH_DATE",
    payload: date.toString(),
  }
}
export function changeWeight (weight: number) {
  return {
    type: "CHANGE_WEIGHT",
    payload: weight.toString(),
  }
}

export function changeHeight (height: number) {
  return {
    type: "CHANGE_HEIGHT",
    payload: height.toString(),
  }
}

export function changeEmail (email: string) {
  return {
    type: "CHANGE_EMAIL",
    payload: email,
  }
}

export function putPassword (value: string, field: string,) {
  return{
    type: "PUT_PASSWORD",
    payload: value,
    field,
  }
}

export function changePassword (password: string) {
  return {
    type: "CHANGE_PASSWORD",
    payload: password,
  }
}

export function showPassError (passError: string) {
  return {
    type: "SHOW_PASS_ERROR",
    payload: passError,
  }
}

// function to change the format of Date to YYYY-MM-DD
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}