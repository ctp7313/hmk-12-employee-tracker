const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //CREATE
    createOrg(newOrg) {
        return this.connection.query(
            "INSERT INTO organization SET ?", newOrg);
    }
    
    createTitle(newTitle) {
        return this.connection.query(
            "INSERT INTO role SET ?", newTitle);
    }

    createEmployee(newEmp) {
        return this.connection.query(
            "INSERT INTO employee SET ?", newEmp);
    }

    //READ
    readTitles() {
        return this.connection.query(
            `
            SELECT
                role.id,
                role.title AS Title,
                role.salary AS Salary,
                organization.org_name AS Organization
            FROM
                ds9_db.role
            LEFT JOIN
                ds9_db.organization ON role.org_id = organization.id
            ORDER BY
                role.salary DESC;
            `
        );
    }

    readEmployees() {
        return this.connection.query(
            `SELECT
                CONCAT_WS(' ', Subordinate.first_name, Subordinate.last_name) AS 'Employee',
                role.title AS 'Title',
                role.salary AS 'Salary',
                organization.org_name AS 'Organization',
                CONCAT_WS(' ', Superior.first_name, Superior.last_name) AS 'Manager'
            FROM 
                ds9_db.employee as Subordinate
            LEFT OUTER JOIN 
                ds9_db.employee as Superior
                ON Subordinate.manager_id = Superior.id
            JOIN
                ds9_db.role 
                ON role.id = Subordinate.role_id
            JOIN
                ds9_db.organization 
                ON role.org_id = organization.id
            
            ORDER BY
                role.salary DESC;`
        );
    }

    readEmpEdit() {
        return this.connection.query(
            `SELECT
                Subordinate.id AS 'Employee ID',
                CONCAT_WS(' ', Subordinate.first_name, Subordinate.last_name) AS 'Employee',
                role.title AS 'Title',
                role.salary AS 'Salary',
                organization.org_name AS 'Organization',
                CONCAT_WS(' ', Superior.first_name, Superior.last_name) AS 'Manager'
            FROM 
                ds9_db.employee as Subordinate
            LEFT OUTER JOIN 
                ds9_db.employee as Superior
                ON Subordinate.manager_id = Superior.id
            JOIN
                ds9_db.role 
                ON role.id = Subordinate.role_id
            JOIN
                ds9_db.organization 
                ON role.org_id = organization.id
            
            ORDER BY
                Subordinate.id ASC;`
        );
    }

    readManagers() {
        return this.connection.query(
            `SELECT
                CONCAT_WS(' ', Subordinate.first_name, Subordinate.last_name) AS 'Employee',
                role.title AS 'Title',
                role.id AS 'Manager ID',
                organization.org_name AS 'Organization',
                CONCAT_WS(' ', Superior.first_name, Superior.last_name) AS 'Manager'
            FROM 
                ds9_db.employee as Subordinate
            LEFT OUTER JOIN 
                ds9_db.employee as Superior
                ON Subordinate.manager_id = Superior.id
            JOIN
                ds9_db.role 
                ON role.id = Subordinate.role_id
            JOIN
                ds9_db.organization 
                ON role.org_id = organization.id
            
            ORDER BY
                role.id ASC;`
        );
    }

    readOrg() {
        return this.connection.query(
            "SELECT organization.id AS 'ID', organization.org_name AS 'Organization' FROM ds9_db.organization ORDER BY organization.id;"
        );
    }

    //UPDATE
    updateTitle(employee_id, newRole_id) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [newRole_id, employee_id]
          );
    }
}

module.exports = new DB(connection); 