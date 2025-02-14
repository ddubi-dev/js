const Person = require("./Person"); //불러오기

class Employee extends Person {
  constructor(name, age, gender, jobTitle, salary) {
    super(name, age, gender); // 상속 받은 부모의 변수로
    this.jobTitle = jobTitle;
    this.salary = salary;
  }

  displayInfo() {
    console.log(
      `직원 ${this.name}의 직위는 ${this.jobTitle}이며, 급여는 ${this.salary}원 입니다.`
    );
  }

  work() {
    console.log(`${this.name}이(가) 업무 중입니다.`);
  }
}

module.exports = Employee; //내보내기
