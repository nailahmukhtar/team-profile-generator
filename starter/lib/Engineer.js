// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(github) {
        this.github = github;
    
        super(name, id, email);

    }

    getGithub() {

    }

    getRole() {
        return 'Engineer';
    }
}