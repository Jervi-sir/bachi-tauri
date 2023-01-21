export function calculateAge(birthday) {
  let date = birthday.replaceAll("-", "/");
  let currentDate = new Date();
  let birthDate = new Date(date);
  let difference = currentDate - birthDate;
  let age = Math.floor(difference/31557600000);
  return age
}


export function filterNumbers ($event) {
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
      $event.preventDefault();
  }
}