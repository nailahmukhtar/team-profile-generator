// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        
        super(name, id, email);

        this.officeNumber = officeNumber;


    }

    getRole() {
        return "Manager";
    }

    // setofficeNumber(value) {
    //     this.officeNumber = value;
    // }
}

module.exports = Manager

// const manager = new Manager("James", 3, "test@test.com", 145);
// console.log(manager.getRole());

// manager.setofficeNumber(136);
// console.log(manager.officeNumber);