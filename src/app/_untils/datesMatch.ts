


export function twoDatesEqual(dateOne: Date, dateTwo: Date) {
  return dateOne.getFullYear() === dateTwo.getFullYear()
          && dateOne.getMonth() === dateTwo.getMonth()
          && dateOne.getDate() === dateTwo.getDate()
}
