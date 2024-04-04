const dt = document.getElementById("dt");
const btn = document.getElementById("calc");

const date_time = new Date();
const date = date_time.getDate();
const month = date_time.getMonth() + 1;
const year = date_time.getFullYear();

btn.addEventListener("click", function () {
  let days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const birth = new Date(dt.value);
  const birth_month = birth.getMonth() + 1;
  const birth_year = birth.getFullYear();
  const birth_date = birth.getDate();
  if (dt.value === "") {
    document.getElementById("ag").innerText = "Enter your birthday date.";
  } else {
    let ans_year, ans_month, ans_day;

    if (birth_month < month) {
      //FOR MONTHS
      ans_year = year - birth_year;
      //
      //FOR MONTHS
      let sum = 0;
      for (let i = birth_month; i <= month; i++) {
        if (i === birth_month) {
          sum = sum + (days[birth_month] - birth_date);
        } else if (i === month) {
          sum = sum + date;
        } else {
          sum = sum + days[i];
        }
      }
      ans_month = Math.floor((sum * 12) / 366);

      //For days
      let days_array = [];
      if (birth_month === ans_month + 1) {
        days_array = days.slice(birth_month, ans_month + 2);
      } else {
        days_array = days.slice(birth_month, ans_month + 1);
      }
      let sum_days = 0;
      for (let i = 0; i < days_array.length; i++) {
        sum_days = sum_days + days_array[i];
      }
      ans_day = sum - sum_days;
    }
    //
    else if (birth_month === month) {
      ans_year = year - birth_year;
      ans_month = month - birth_month;
      ans_day = birth_date - date;
    } else {
      //YEAR//
      ans_year = year - birth_year - 1;
      //MONTH
      let sum = 0;
      let days_array = [];
      for (let i = birth_month; i <= month + 12; i++) {
        if (i === birth_month) {
          days_array.push(days[month - 1] - birth_date);
          sum = sum + (days[birth_month] - birth_date);
        } else if (i - 12 === month) {
          days_array.push(date);
          sum = sum + date;
        } else {
          if (i - 12 <= 0) {
            days_array.push(days[i]);
            sum = sum + days[i];
          } else {
            days_array.push(days[i - 12]);
            sum = sum + days[i - 12];
          }
        }
      }
      ans_month = Math.floor((sum * 12) / 366);
      //
      // DAYS
      let s = 0;
      for (let i = 0; i < days_array.length; i++) {
        s = s + days_array[i];
      }
      console.log(days_array);
      if (days[month] <= days_array[0] + days_array[days_array.length - 1]) {
        ans_day =
          days_array[0] + days_array[days_array.length - 1] - days[month - 1];
      } else {
        ans_day = days_array[0] + days_array[days_array.length - 1];
      }
    }
    let a = `Current age:
     You are ${ans_year} years ${ans_month} months ${ans_day} days old`;
    document.getElementById("ag").innerText = a;
  }
});
